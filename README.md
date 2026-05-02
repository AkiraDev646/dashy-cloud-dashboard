# Dashy

Dashy is an AWS cloud engineering portfolio dashboard. The goal is to turn hands-on AWS practice into a complete project that demonstrates application hosting, authentication, networking, infrastructure as code, observability, and security.

## Current Status

- React dashboard protected by AWS Amplify Auth and Amazon Cognito.
- Terraform VPC foundation with public and private subnets.
- Project structure organized for a future GitHub portfolio repo.
- Dashboard screens now describe the AWS services and engineering decisions the project will showcase.

## Project Structure

```text
dashy/
  frontend/                 React dashboard app
  infrastructure/           Terraform infrastructure
  docs/                     Architecture and deployment notes
  amplify-backend-original/ Original Amplify backend copy
  amplify-config-original/  Original generated Amplify config copy
```

## AWS Services Demonstrated

- Amazon Cognito for authentication.
- AWS Amplify for frontend auth integration.
- Amazon VPC with public and private subnets.
- Terraform for infrastructure as code.
- Planned: S3, CloudFront, API Gateway, Lambda, DynamoDB, CloudWatch, GuardDuty, KMS, and Secrets Manager.

## Local Development

```bash
cd frontend
npm install
npm start
```

The React app runs at `http://localhost:3000`.

## Portfolio Roadmap

1. Finish the dashboard UI with AWS-specific views.
2. Add API Gateway and Lambda backend endpoints.
3. Store dashboard data in DynamoDB.
4. Host the frontend on S3 and CloudFront.
5. Add VPC Flow Logs, CloudWatch metrics, and GuardDuty findings.
6. Add deployment docs, screenshots, and an architecture diagram.

## Interview Summary

Dashy shows that I can build and explain a cloud application end to end: authenticated frontend, infrastructure as code, secure network design, serverless APIs, monitored workloads, and documented deployment decisions.
