#!/bin/bash

# Update system
yum update -y

# Install Node.js 20
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
yum install -y nodejs

# Install Git
yum install -y git

# Install PM2 for process management
npm install -g pm2

# Create app directory
mkdir -p /opt/replit-app
cd /opt/replit-app

# Clone the application (replace with your actual repository)
# For now, we'll create the app structure manually
# In production, you would clone from your Git repository
# git clone https://github.com/yourusername/your-repo.git .

# Create a simple deployment script
cat > deploy.sh << 'EOF'
#!/bin/bash

# This script should be run to deploy your application
# Replace the content below with actual deployment steps

echo "Starting deployment..."

# If you have a Git repository, uncomment and modify:
# git pull origin main

# Install dependencies
npm install

# Build the application
npm run build

# Start/restart the application with PM2
pm2 delete replit-app 2>/dev/null || true
pm2 start npm --name "replit-app" -- run dev

# Save PM2 configuration
pm2 save
pm2 startup

echo "Deployment completed!"
EOF

chmod +x deploy.sh

# Create a basic package.json if it doesn't exist
cat > package.json << 'EOF'
{
  "name": "replit-version-test-app",
  "version": "1.3.1",
  "description": "Version control testing application",
  "main": "server/index.js",
  "scripts": {
    "dev": "NODE_ENV=production PORT=${app_port} HOST=0.0.0.0 tsx server/index.ts",
    "build": "echo 'Build completed'",
    "start": "npm run dev"
  },
  "dependencies": {
    "express": "^4.18.0",
    "tsx": "^4.0.0"
  }
}
EOF

# Create basic server structure (this would normally come from your Git repo)
mkdir -p server client/src

# Create a basic Express server
cat > server/index.ts << 'EOF'
import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

// Serve static files from client directory
app.use(express.static(path.join(__dirname, '../client')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Catch all handler for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
EOF

# Install dependencies
npm install

# Set correct permissions
chown -R ec2-user:ec2-user /opt/replit-app

# Create systemd service for auto-start
cat > /etc/systemd/system/replit-app.service << EOF
[Unit]
Description=Replit Version Test App
After=network.target

[Service]
Type=simple
User=ec2-user
WorkingDirectory=/opt/replit-app
ExecStart=/usr/bin/npm run start
Restart=always
RestartSec=10
Environment=NODE_ENV=production
Environment=PORT=${app_port}
Environment=HOST=0.0.0.0

[Install]
WantedBy=multi-user.target
EOF

# Enable and start the service
systemctl enable replit-app
systemctl start replit-app

# Install and configure nginx as reverse proxy
yum install -y nginx

cat > /etc/nginx/conf.d/replit-app.conf << EOF
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://localhost:${app_port};
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Start nginx
systemctl enable nginx
systemctl start nginx

# Log deployment completion
echo "$(date): Replit app deployment completed" >> /var/log/deployment.log