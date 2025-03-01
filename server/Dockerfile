# Use official Node.js image
FROM node:21-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy all source code
COPY . .

# Expose backend port
EXPOSE 3000

# Use .env file for config
ENV NODE_ENV=production

# Start the server
CMD ["npm", "start"]
