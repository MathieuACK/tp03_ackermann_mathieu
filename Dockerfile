## Multi-stage Dockerfile for building a TypeScript + Express API
## - builder stage installs dev deps and builds the TypeScript into /app/dist
## - runner stage installs only production deps and runs the compiled JS

FROM node:22 AS builder
WORKDIR /app

# Copy package manifests and install full deps (including dev) for build
COPY ./api/package*.json ./
RUN npm ci

# Copy source and build
COPY ./api ./
RUN npm run build

FROM node:22-slim AS runner
WORKDIR /app

# Use production environment
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Copy only production dependencies and the built artifacts
COPY ./api/package*.json ./
RUN npm ci --only=production

# Copy compiled output from builder
COPY --from=builder /app/dist ./dist

# If you need other runtime files (config, locales...), copy them explicitly
# COPY --from=builder /app/config ./config

# Expose default port (can be overridden with -e PORT=... when running)
EXPOSE 3000

# Prefer the non-root user provided by the node image
USER node

CMD ["node", "dist/index.js"]