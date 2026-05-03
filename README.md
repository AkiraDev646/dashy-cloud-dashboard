# Dashy

Dashy is a personal daily dashboard application powered by AWS. It gives a signed-in user a simple daily view with useful information such as weather, an inspirational quote, and a daily focus item.

This project is also an AWS cloud engineering portfolio project. The goal is to demonstrate how a real user-facing application can be hosted, secured, connected to backend APIs, and managed with infrastructure as code.

## Current Status

- React dashboard frontend.
- User authentication with AWS Amplify and Amazon Cognito.
- Terraform VPC foundation with public and private subnets.
- Product plan for weather, quote, daily focus, and user preferences.
- Documentation for architecture, deployment, and security.

## Project Structure

```text
dashy/
  frontend/                 React dashboard app
  infrastructure/           Terraform infrastructure
  docs/                     Architecture and deployment notes
  amplify-backend-original/ Original Amplify backend copy
  amplify-config-original/  Original generated Amplify config copy
```

## Planned AWS Architecture

- React frontend hosted on Amazon S3 and delivered through CloudFront.
- Amazon Cognito for authentication.
- AWS Amplify for frontend auth integration.
- API Gateway for backend routes.
- AWS Lambda for weather, quote, and daily focus logic.
- DynamoDB for user preferences and saved dashboard data.
- AWS Secrets Manager for private API keys.
- CloudWatch for logs and metrics.
- Amazon VPC with public and private subnets.
- Terraform for infrastructure as code.

## Local Development

```bash
cd frontend
npm install
npm start
```

The React app runs at `http://localhost:3000`.

## Portfolio Roadmap

1. Update the dashboard UI for weather, quote, and daily focus widgets.
2. Add API Gateway and Lambda backend endpoints.
3. Store user preferences in DynamoDB.
4. Protect private API keys with Secrets Manager.
5. Host the frontend on S3 and CloudFront.
6. Add CloudWatch logs, deployment docs, screenshots, and an architecture diagram.

## Interview Summary

Dashy shows that I can build and explain a cloud application end to end: authenticated frontend, serverless APIs, user data storage, secure secrets handling, infrastructure as code, monitored workloads, and documented deployment decisions.
