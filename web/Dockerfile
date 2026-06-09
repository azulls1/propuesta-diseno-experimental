# =====================================================================
# Multi-stage build: node alpine para compilar Angular, nginx para servir
# =====================================================================

# ---------- Stage 1: build ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Cache de dependencias
COPY package*.json ./
RUN npm ci --no-audit --no-fund

# Copiar el resto del código y compilar
COPY . .
RUN npm run build -- --configuration=production

# ---------- Stage 2: nginx ----------
FROM nginx:1.27-alpine

# Limpiar default
RUN rm -rf /usr/share/nginx/html/*

# Copiar build de Angular (Angular 17+ deja todo en dist/<project>/browser/)
COPY --from=builder /app/dist/web/browser /usr/share/nginx/html

# Configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Healthcheck dentro del contenedor
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://127.0.0.1/ || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
