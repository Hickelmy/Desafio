# Etapa 1 - Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copia apenas arquivos de dependência para aproveitar cache
COPY package*.json ./
RUN npm install

# Copia o restante do código e builda a aplicação
COPY . .
RUN npm run build

# Etapa 2 - Produção mínima
FROM node:20-alpine AS production

WORKDIR /app

# Copia apenas o necessário da build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Define variável de ambiente
ENV NODE_ENV=production

# Comando padrão
CMD ["node", "dist/main"]
