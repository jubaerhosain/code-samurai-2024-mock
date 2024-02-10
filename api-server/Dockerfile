FROM node:21-alpine

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Expose port (if needed)
EXPOSE 5000

# Start the app
CMD ["npm", "start"]