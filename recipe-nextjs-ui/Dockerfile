FROM node:20-alpine
WORKDIR /recipe-app
COPY package.json .
RUN npm install
COPY . .
ARG NODE_ENV=developement
ENV NODE_ENV=${NODE_ENV}
# ENV NODE_ENV=production
# Conditional build step
RUN if [ "$NODE_ENV" = "production" ]; then \
      npm run build; \
    fi

# Expose port
EXPOSE 3000

# Use shell form of CMD for environment variable substitution
CMD if [ "$NODE_ENV" = "production" ]; then \
      npm run start; \
    else \
      npm run dev; \
    fi

