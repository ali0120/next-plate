FROM node:20 as base

# Use an official Node.js runtime as the base image
FROM base as development

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package.json .

# Install dependencies
RUN npm install

# Copy the entire application code to the container
COPY . .

# Expose the desired port (Next.js default is 3000)
EXPOSE 3000

# Set the command to start the application
CMD ["npm","run","dev"]


# Use an official Node.js runtime as the base image
FROM base as production

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package.json* .

# Install dependencies
RUN npm install --force

# Copy the entire application code to the container
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the desired port (Next.js default is 3000)
EXPOSE 3000

# Set the command to start the application
CMD ["npm","run","start"]
