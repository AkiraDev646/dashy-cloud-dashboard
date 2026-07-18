data "archive_file" "get_quote_lambda" {
  type        = "zip"
  source_file = "${path.module}/../backend/functions/get_quote/app.py"
  output_path = "${path.module}/build/get-quote.zip"
}

resource "aws_iam_role" "get_quote_lambda" {
  name = "${var.app_name}-get-quote-lambda-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })

  tags = {
    Project = var.app_name
  }
}

resource "aws_iam_role_policy" "get_quote_lambda_logs" {
  name = "${var.app_name}-get-quote-lambda-logs"
  role = aws_iam_role.get_quote_lambda.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "arn:aws:logs:*:*:*"
      }
    ]
  })
}

resource "aws_iam_role_policy" "get_quote_lambda_dynamodb" {
  name = "${var.app_name}-get-quote-lambda-dynamodb"
  role = aws_iam_role.get_quote_lambda.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "dynamodb:Scan"
        ]
        Resource = aws_dynamodb_table.quotes.arn
      }
    ]
  })
}

resource "aws_lambda_function" "get_quote" {
  function_name    = "${var.app_name}-get-quote"
  role             = aws_iam_role.get_quote_lambda.arn
  handler          = "app.lambda_handler"
  runtime          = "python3.12"
  filename         = data.archive_file.get_quote_lambda.output_path
  source_code_hash = data.archive_file.get_quote_lambda.output_base64sha256

  environment {
    variables = {
      QUOTES_TABLE_NAME = aws_dynamodb_table.quotes.name
    }
  }

  tags = {
    Project = var.app_name
  }
}

resource "aws_apigatewayv2_api" "dashy" {
  name          = "${var.app_name}-api"
  protocol_type = "HTTP"

  cors_configuration {
    allow_headers = ["content-type"]
    allow_methods = ["GET", "OPTIONS"]
    allow_origins = ["http://localhost:3000"]
  }

  tags = {
    Project = var.app_name
  }
}

resource "aws_apigatewayv2_integration" "get_quote" {
  api_id                 = aws_apigatewayv2_api.dashy.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.get_quote.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "get_quote" {
  api_id    = aws_apigatewayv2_api.dashy.id
  route_key = "GET /quote"
  target    = "integrations/${aws_apigatewayv2_integration.get_quote.id}"
}

resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.dashy.id
  name        = "$default"
  auto_deploy = true

  tags = {
    Project = var.app_name
  }
}

resource "aws_lambda_permission" "allow_api_gateway_get_quote" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.get_quote.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.dashy.execution_arn}/*/*"
}

resource "aws_dynamodb_table" "quotes" {
  name         = "${var.app_name}-quotes"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "quote_id"

  attribute {
    name = "quote_id"
    type = "S"
  }

  tags = {
    Project = var.app_name
  }
}
