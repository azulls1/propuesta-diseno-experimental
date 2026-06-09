# Propuesta de Diseño Experimental

Proyecto de la **Actividad 1** de la asignatura *Investigación en Inteligencia Artificial* — Maestría en IA.

> El entregable académico consiste en una propuesta de diseño experimental (máx. 5 páginas, sección *Methods* de un paper). Este repositorio aloja tanto el documento como el sitio web que lo publica.

## 🌐 Despliegue

- **URL**: https://propuesta-diseno-experimental.iagentek.com.mx
- **VPS**: `iaGentek` (Ubuntu, <VPS-IP-REDACTED>:22000)
- **Stack**: Docker Swarm + Traefik + Let's Encrypt
- **Imagen**: `propuesta-diseno-experimental-frontend:latest`

Ver [`deployment/README.md`](deployment/README.md) para instrucciones detalladas.

## 📂 Estructura

```
.
├── docs/
│   ├── enunciado/                 # Documento original del maestro (.docx)
│   └── wiki/                      # Desglose del enunciado (método LLM-wiki Karpathy)
├── web/                           # Frontend Angular 19 + Tailwind 3
│   ├── src/app/pages/             # Landing, Motivación, Hipótesis, Metodología, Comparación
│   ├── src/app/shared/            # Header, Footer, SectionLayout (reutilizables)
│   ├── Dockerfile                 # Multi-stage: build → nginx
│   ├── nginx.conf                 # SPA fallback, gzip, cache, security headers
│   └── tailwind.config.js         # Paleta brand (cyan) + ink (slate)
├── deployment/
│   ├── stack.yml                  # Docker Swarm stack con labels de Traefik
│   ├── deploy.sh                  # Script de build + deploy (corre en el VPS)
│   └── README.md                  # Guía de despliegue
└── README.md
```

## 🚀 Desarrollo local

```bash
cd web
npm install
npm start
# → http://localhost:4200
```

## 🐳 Build de la imagen Docker (local opcional)

```bash
cd web
docker build -t propuesta-diseno-experimental-frontend:latest .
docker run --rm -p 8080:80 propuesta-diseno-experimental-frontend:latest
# → http://localhost:8080
```

## 📝 Sobre la actividad

**Objetivo**: familiarizarse con la metodología de diseño experimental científico, planificando un experimento de IA reproducible y verificable, sin necesidad de ejecutarlo.

**Rúbrica** (10 pts total):
- C1 — Motivación argumentada: **20%**
- C2 — Hipótesis y experimentos refutables: **20%**
- **C3 — Rigor, muestreo, sesgos, suficiencia: 40%**
- C4 — Redacción y presentación: **20%**

**Formato del documento**: Calibri 12, interlineado 1.5, máximo 5 páginas.

## 🧭 Cómo navegar el desglose

El análisis completo del enunciado vive en [`docs/wiki/`](docs/wiki/). Empieza por [`docs/wiki/README.md`](docs/wiki/README.md).

## ⚙️ Stack del sitio

- **Frontend**: Angular 19 (standalone components, lazy routing) + Tailwind CSS 3
- **Reverse proxy**: Traefik con Let's Encrypt (HTTP-01)
- **Orquestación**: Docker Swarm (1 nodo)
- **Backend** *(pendiente)*: FastAPI · Supabase (PostgreSQL) · Redis · Celery

## 📅 Estado

- [x] Wiki de análisis del enunciado (13 archivos, método Karpathy)
- [x] Repositorio inicializado en GitHub
- [x] Frontend Angular con landing + 4 páginas de sección
- [x] Dockerfile + nginx.conf + stack de Swarm
- [ ] DNS del subdominio configurado en Hostinger
- [ ] Desplegado en VPS
- [ ] Tema del experimento finalizado *(placeholder: detección de hate speech dialectal MX)*
- [ ] Documento académico (.docx) redactado
- [ ] Backend FastAPI + integración Supabase
