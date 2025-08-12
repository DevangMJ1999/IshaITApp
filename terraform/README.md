# Terraform AWS Deployment for Replit Version Test App

This Terraform configuration deploys your Replit Version Test App to an AWS EC2 instance with all necessary infrastructure.

## What This Creates

- **VPC** with public subnet and internet gateway
- **EC2 instance** (t3.micro by default - free tier eligible)
- **Security groups** with appropriate firewall rules
- **Elastic IP** for consistent public IP address
- **Nginx reverse proxy** for production-ready setup
- **Systemd service** for automatic app startup

## Prerequisites

1. **AWS Account** with appropriate permissions
2. **AWS CLI** configured with your credentials
3. **Terraform** installed (version >= 1.0)
4. **SSH key pair** for server access

## Quick Start

### 1. Configure AWS Credentials

```bash
aws configure
```

### 2. Generate SSH Key Pair

```bash
ssh-keygen -t rsa -b 4096 -f ~/.ssh/replit-app-key
```

### 3. Configure Variables

```bash
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your values
```

### 4. Deploy Infrastructure

```bash
# Initialize Terraform
terraform init

# Review the plan
terraform plan

# Apply the configuration
terraform apply
```

### 5. Access Your Application

After deployment completes, you'll see outputs including:
- **Application URL**: http://YOUR-IP:5000
- **SSH Command**: To connect to your server
- **Public IP**: Your server's IP address

## Configuration Options

### Instance Types

- `t3.micro` - Free tier, 1 vCPU, 1GB RAM
- `t3.small` - 2 vCPUs, 2GB RAM  
- `t3.medium` - 2 vCPUs, 4GB RAM

### Security

- Default SSH access: Open to all (0.0.0.0/0)
- **Recommended**: Restrict to your IP in `terraform.tfvars`
- Web traffic: Open on ports 80, 443, and 5000

## Deployment Process

The EC2 instance automatically:

1. **Installs Node.js 20** and required dependencies
2. **Sets up application directory** at `/opt/replit-app`
3. **Configures PM2** for process management
4. **Installs Nginx** as reverse proxy
5. **Creates systemd service** for auto-startup
6. **Starts the application** on boot

## Updating Your Application

### Option 1: Manual Deployment

```bash
# SSH into your server
ssh -i ~/.ssh/replit-app-key ec2-user@YOUR-IP

# Navigate to app directory
cd /opt/replit-app

# Pull latest changes (if using Git)
git pull origin main

# Restart application
pm2 restart replit-app
```

### Option 2: Automated with Git

Set up a Git repository and modify the `user_data.sh` script to clone your repo:

```bash
git clone https://github.com/yourusername/your-repo.git .
```

## Monitoring

### Check Application Status

```bash
# PM2 status
pm2 status

# Application logs
pm2 logs replit-app

# System service status
systemctl status replit-app
```

### Check Nginx Status

```bash
systemctl status nginx
tail -f /var/log/nginx/access.log
```

## Cost Estimation

With default settings (t3.micro + Elastic IP):
- **EC2 Instance**: ~$8-10/month
- **Elastic IP**: $0 (when attached)
- **Data Transfer**: Varies by usage

Free tier eligible for first 12 months with new AWS accounts.

## Cleanup

To destroy all resources:

```bash
terraform destroy
```

## Troubleshooting

### Application Not Starting

```bash
# Check service status
systemctl status replit-app

# Check logs
journalctl -u replit-app -f

# Manual start
cd /opt/replit-app && npm run start
```

### Can't Access Application

1. Check security group rules
2. Verify application is running on correct port
3. Check Nginx configuration
4. Ensure Elastic IP is attached

### SSH Connection Issues

1. Verify key pair permissions: `chmod 600 ~/.ssh/replit-app-key`
2. Check security group SSH rules
3. Confirm public key matches private key

## Security Best Practices

1. **Restrict SSH access** to your IP only
2. **Use IAM roles** instead of access keys when possible
3. **Enable CloudTrail** for audit logging
4. **Set up SSL/TLS** for production use
5. **Regular security updates** on the EC2 instance

## Next Steps

- Set up SSL certificate with Let's Encrypt
- Configure CloudWatch monitoring
- Set up automated backups
- Implement CI/CD pipeline
- Add load balancer for high availability