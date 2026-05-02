# Deployment Notes

## Frontend

The current frontend runs locally with Create React App.

```bash
cd frontend
npm install
npm start
```

Target deployment:

- Build React assets with `npm run build`.
- Upload build output to S3.
- Serve the S3 origin through CloudFront.
- Use HTTPS with an ACM certificate.

## Infrastructure

The current Terraform files live in `infrastructure/`.

```bash
cd infrastructure
terraform init
terraform plan
terraform apply
```

Before publishing this project, avoid committing local Terraform state files. They are ignored by the root `.gitignore`.

## Next Deployment Milestone

Add Terraform resources for:

- S3 frontend bucket.
- CloudFront distribution.
- API Gateway.
- Lambda execution role.
- DynamoDB dashboard table.
