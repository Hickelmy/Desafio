FROM node:20-alpine AS builder
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

WORKDIR /app
COPY package*.json angular.json ./
RUN npm config set strict-ssl false && npm install --force

# Detecta o outputPath com Node puro, sem depender de apk ou jq
RUN node -p "Object.values(require('./angular.json').projects)[0].architect.build.options.outputPath" > /tmp/build_dir.txt

COPY . .
RUN npm run build --prod

FROM node:20-alpine
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

WORKDIR /usr/src/app
RUN npm config set strict-ssl false && npm install -g serve

COPY --from=builder /tmp/build_dir.txt ./build_dir.txt
COPY --from=builder /app /app

RUN BUILD_DIR=$(cat build_dir.txt) && \
    mv /app/$BUILD_DIR ./dist && \
    rm -rf /app build_dir.txt

EXPOSE 4200
CMD ["serve", "-s", "dist/browser", "-l", "4200"]
