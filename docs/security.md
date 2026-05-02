# Security Notes

## Current Controls

- Amazon Cognito authentication through AWS Amplify.
- Custom VPC foundation with public and private subnet separation.
- Terraform-managed infrastructure.

## Planned Controls

- Least-privilege IAM roles for Lambda and deployment users.
- KMS encryption for sensitive data.
- Secrets Manager for application secrets and configuration.
- GuardDuty for threat detection.
- CloudWatch logs and metrics for operational monitoring.
- VPC Flow Logs for network visibility.

## Portfolio Talking Points

- Explain why the private subnet does not have a direct internet route.
- Explain the difference between authentication with Cognito and authorization with IAM.
- Explain why Terraform state should not be committed to a public repo.
- Explain how CloudWatch, GuardDuty, and Flow Logs support incident response.
