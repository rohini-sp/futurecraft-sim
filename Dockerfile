FROM node:20
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# Expose Vite preview server port
EXPOSE 3000

# Run the preview server with --host so it's accessible outside the container
CMD ["npm", "run", "preview", "--", "--host"]
