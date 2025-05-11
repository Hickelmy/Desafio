# Use imagem menor e mais segura
FROM node:18-alpine as build

# Diretório de trabalho
WORKDIR /app

# Copia apenas os arquivos necessários para instalar as dependências
COPY package*.json ./

# Instala dependências de desenvolvimento e produção
RUN npm install

# Copia o restante dos arquivos da aplicação
COPY . .

# Compila o projeto (assumindo que `npm run build` gera `dist/`)
RUN npm run build

# ----------------------------------------------------------
# Fase de produção: apenas arquivos necessários são mantidos
FROM node:18-alpine as production

WORKDIR /app

# Copia apenas o que é necessário para rodar a aplicação
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# Define o comando para rodar a aplicação
CMD ["node", "dist/main"]
