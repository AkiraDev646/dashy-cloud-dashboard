# Dashy Product Plan

## Product Summary

Dashy is a personal daily dashboard application powered by AWS. It gives a signed-in user a simple daily view with useful information such as current weather, an inspirational quote, and a daily focus item.

The goal of Dashy is to demonstrate full-stack cloud engineering skills by building a real user-facing application with AWS services behind it.

## Target User

Dashy is for someone who wants a quick daily starting point when they open their browser.

The user should be able to see:

- Today's weather
- An inspirational quote
- A daily focus item or reminder
- Their saved dashboard preferences

## MVP Features

The first version of Dashy should include:

- User authentication
- Weather widget
- Daily quote widget
- Daily focus widget
- Responsive dashboard layout
- Basic user settings

## AWS Architecture

Dashy will use AWS as the cloud platform behind the application.

Frontend:

- React dashboard application
- Hosted on Amazon S3
- Delivered through Amazon CloudFront

Authentication:

- Amazon Cognito
- AWS Amplify frontend integration

Backend:

- Amazon API Gateway for HTTP routes
- AWS Lambda for backend logic
- DynamoDB for user preferences and saved dashboard data

Security:

- IAM least-privilege roles
- AWS Secrets Manager for private API keys
- AWS KMS for encryption where needed

Monitoring:

- Amazon CloudWatch logs and metrics
- GuardDuty as a future security monitoring enhancement

Infrastructure:

- Terraform for infrastructure as code

## Planned API Routes

Future backend routes may include:

- GET /weather
- GET /quote
- GET /daily-focus
- GET /preferences
- PUT /preferences

## Portfolio Goal

Dashy should show employers that I can:

- Build a real frontend application
- Secure user access with Cognito
- Design serverless APIs with API Gateway and Lambda
- Store user data in DynamoDB
- Protect secrets and credentials properly
- Use Terraform to define cloud infrastructure
- Document architecture and deployment decisions
- Explain the tradeoffs behind AWS service choices

## Future Enhancements

Possible future features:

- User-selected city for weather
- Saved dashboard widget preferences
- Daily task checklist
- News headline widget
- CloudWatch dashboard for backend health
- CI/CD deployment with GitHub Actions
- S3 and CloudFront production hosting
