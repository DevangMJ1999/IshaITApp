variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Name of the project"
  type        = string
  default     = "replit-version-test-app"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"
}

variable "public_key" {
  description = "Public key for SSH access"
  type        = string
  # You'll need to provide this value
}

variable "ssh_cidr_blocks" {
  description = "CIDR blocks for SSH access"
  type        = list(string)
  default     = ["0.0.0.0/0"]  # Restrict this in production
}

variable "app_port" {
  description = "Port where the Node.js app runs"
  type        = number
  default     = 5000
}

variable "domain_name" {
  description = "Domain name for the application (optional)"
  type        = string
  default     = ""
}