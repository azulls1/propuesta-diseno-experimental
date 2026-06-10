# Deployment — Propuesta de Diseño Experimental

Stack desplegado con **Docker Swarm + Traefik + Let's Encrypt** en un VPS Linux.

## 🔧 Archivos

| Archivo | Descripción |
|---|---|
| `stack.yml` | Definición del stack de Swarm (servicio frontend + labels de Traefik) |
| `deploy.sh` | Script de despliegue (build + stack deploy) — se ejecuta EN el VPS |

## 🚀 Despliegue inicial

```bash
# Conectarse al VPS
ssh -p <PUERTO-SSH> <usuario>@<VPS-IP-REDACTED>

# Clonar el repo (primera vez)
cd <ruta-de-despliegue>
git clone https://github.com/azulls1/propuesta-diseno-experimental.git
cd propuesta-diseno-experimental

# Verificar que la red iagenteknet existe
docker network ls | grep iagenteknet

# Ejecutar deploy
chmod +x deployment/deploy.sh
./deployment/deploy.sh
```

## 🔄 Re-despliegue (actualizaciones)

```bash
cd <ruta-de-despliegue>/propuesta-diseno-experimental
./deployment/deploy.sh --pull
```

El flag `--pull` ejecuta `git pull` antes del build.

## 🩺 Diagnóstico

```bash
# Estado del stack
docker stack services propuesta-diseno-experimental

# Logs del frontend
docker service logs propuesta-diseno-experimental_frontend --tail 50

# Inspeccionar labels (verificar que Traefik los lee)
docker service inspect propuesta-diseno-experimental_frontend --format '{{json .Spec.Labels}}' | python3 -m json.tool

# Traefik dashboard (si está expuesto)
# https://traefik.iagentek.com.mx
```

## 🌐 DNS

El subdominio `propuesta-diseno-experimental.iagentek.com.mx` requiere un registro A apuntando a `<VPS-IP-REDACTED>` en Hostinger.

```
Type:   A
Name:   propuesta-diseno-experimental
Value:  <VPS-IP-REDACTED>
TTL:    14400 (o el mínimo permitido)
```

## 🔐 SSL

Let's Encrypt emite el certificado automáticamente vía HTTP-01 challenge la primera vez que Traefik recibe tráfico al dominio. No requiere acción manual.

Si el certificado no se emite:
1. Verificar que el DNS resuelva correctamente: `dig +short propuesta-diseno-experimental.iagentek.com.mx`
2. Logs de Traefik: `docker service logs traefik_traefik --tail 100 | grep -i acme`

## 🗑️ Tirar el stack

```bash
docker stack rm propuesta-diseno-experimental
```

Esto NO borra la imagen `propuesta-diseno-experimental-frontend:latest`. Para borrarla:

```bash
docker image rm propuesta-diseno-experimental-frontend:latest
```
