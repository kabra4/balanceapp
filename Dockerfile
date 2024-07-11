FROM node:22-alpine

WORKDIR /app

# Install dependencies
# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy the compiled code to the container's workspace
COPY . .

RUN npm run build

# The command to run your application
CMD ["node", "dist/app.js"]
