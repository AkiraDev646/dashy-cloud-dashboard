output "vpc_id" {
  description = "ID of the Dashy VPC."
  value       = aws_vpc.main.id
}

output "public_subnet_id" {
  description = "ID of the public subnet."
  value       = aws_subnet.public.id
}

output "private_subnet_id" {
  description = "ID of the private subnet."
  value       = aws_subnet.private.id
}

output "quote_api_url" {
  description = "URL for the Dashy quote API endpoint."
  value       = "${aws_apigatewayv2_api.dashy.api_endpoint}/quote"
}
