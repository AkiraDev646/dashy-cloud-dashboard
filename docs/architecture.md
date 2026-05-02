# Dashy Architecture

## Overview

Dashy is designed as a cloud-native dashboard that presents AWS infrastructure, security, and monitoring signals in one authenticated interface.

## Current Architecture

```text
User
  -> Amazon Cognito authentication
  -> React dashboard
  -> AWS-backed dashboard views
```

The current codebase includes a React frontend with Amplify Auth and a Terraform VPC foundation.

## Target Architecture

```text
User
  -> CloudFront
  -> S3 static website assets
  -> React dashboard
  -> API Gateway
  -> Lambda
  -> DynamoDB
  -> CloudWatch, GuardDuty, VPC Flow Logs
```

## Network Design

- One custom VPC.
- Public subnet for internet-facing resources where needed.
- Private subnet for internal workloads.
- Internet gateway attached to the VPC.
- Public route table with internet route.
- Private route table without direct internet route.

## Security Design

- Cognito protects dashboard access.
- IAM roles should be scoped per workload.
- Secrets should live in Secrets Manager.
- Sensitive data should use KMS-backed encryption.
- GuardDuty and CloudWatch should provide security and operational signals.
