# Propuesta de Diseño Experimental

Proyecto de la **Actividad 1** de la asignatura *Investigación en Inteligencia Artificial* — Maestría en IA.

> El entregable académico consiste en una propuesta de diseño experimental (max. 5 páginas, sección *Methods* de un paper). Este repositorio aloja tanto el documento como el sitio web que lo publica.

## 🌐 Despliegue

- **Dominio**: https://propuesta-diseno-experimental.iagentek.com.mx
- **VPS**: `iaGentek` (Ubuntu, <VPS-IP-REDACTED>:22000)

## 📂 Estructura

```
.
├── docs/
│   ├── enunciado/             # Documento original del maestro
│   └── wiki/                  # Desglose del enunciado (método LLM-wiki Karpathy)
├── src/                       # Frontend del sitio (por definir stack)
├── deployment/                # Scripts y configuración de despliegue al VPS
├── .gitignore
└── README.md
```

## 📝 Sobre la actividad

**Objetivo**: familiarizarse con la metodología de diseño experimental científico, planificando un experimento de IA reproducible y verificable, sin necesidad de ejecutarlo.

**Rúbrica** (10 pts total):
- C1 — Motivación argumentada: 20%
- C2 — Hipótesis y experimentos refutables: 20%
- **C3 — Rigor, muestreo, sesgos, suficiencia: 40%**
- C4 — Redacción y presentación: 20%

**Formato del documento**: Calibri 12, interlineado 1.5, máximo 5 páginas.

## 🧭 Cómo navegar el desglose

El análisis completo del enunciado vive en `docs/wiki/`. Empieza por `docs/wiki/README.md`.

## ⚙️ Stack (a definir)

Pendiente de elegir entre:
- Astro (recomendado para sitios con contenido markdown)
- Next.js
- HTML estático

## 📅 Estado

- [x] Wiki de análisis del enunciado
- [x] Repositorio inicializado
- [ ] Tema del experimento definido
- [ ] Documento académico redactado
- [ ] Sitio web implementado
- [ ] Desplegado en VPS
