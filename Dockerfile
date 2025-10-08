FROM node:20
WORKDIR /app

# Ensure prod environment inside the container
ENV NODE_ENV=production

# Install dependencies deterministically
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Expose Vite preview server port (default 4173)
EXPOSE 4173

# Run the preview server bound to all interfaces on a fixed port
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4173", "--strictPort"]
