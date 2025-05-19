# Etapa 1 - Build Angular
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json angular.json ./
RUN npm install --force

# Detecta o nome da pasta de build a partir do angular.json
RUN apk add --no-cache jq && \
    export BUILD_DIR=$(jq -r '.projects | to_entries[0].value.architect.build.options.outputPath' angular.json) && \
    echo "export BUILD_DIR=$BUILD_DIR" > /tmp/env_build_path

COPY . .
RUN . /tmp/env_build_path && npm run build --prod

# Etapa 2 - Servidor
FROM node:20-alpine

WORKDIR /usr/src/app
RUN npm install -g serve

# Copia a pasta de build
COPY --from=builder /tmp/env_build_path .env_build
COPY --from=builder /app /app

# Extração do path e cópia da build
RUN apk add --no-cache jq && \
    BUILD_PATH=$(jq -r '.projects | to_entries[0].value.architect.build.options.outputPath' /app/angular.json) && \
    cp -r /app/$BUILD_PATH ./dist

EXPOSE 4200
CMD ["serve", "-s", "dist", "-l", "4200"]
