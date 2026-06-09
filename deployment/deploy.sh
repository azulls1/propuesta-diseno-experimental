#!/usr/bin/env bash
# =====================================================================
# Deploy script — corre EN el VPS (no en local)
# Uso:
#   ./deployment/deploy.sh                  → build + deploy
#   ./deployment/deploy.sh --pull           → git pull + build + deploy
#   ./deployment/deploy.sh --no-build       → solo redeploy del stack actual
# =====================================================================
set -euo pipefail

STACK_NAME="propuesta-diseno-experimental"
IMAGE_NAME="propuesta-diseno-experimental-frontend:latest"
REPO_DIR="${REPO_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)}"
STACK_FILE="${REPO_DIR}/deployment/stack.yml"

color() { printf "\033[1;36m▸ %s\033[0m\n" "$*"; }
ok()    { printf "\033[1;32m✓ %s\033[0m\n" "$*"; }
warn()  { printf "\033[1;33m⚠ %s\033[0m\n" "$*"; }
err()   { printf "\033[1;31m✗ %s\033[0m\n" "$*" >&2; }

DO_PULL=0
DO_BUILD=1
for arg in "$@"; do
  case "$arg" in
    --pull)     DO_PULL=1 ;;
    --no-build) DO_BUILD=0 ;;
    -h|--help)
      grep '^#' "$0" | sed 's/^# \{0,1\}//' | head -10
      exit 0 ;;
  esac
done

cd "$REPO_DIR"

if [[ "$DO_PULL" -eq 1 ]]; then
  color "git pull"
  git pull --ff-only
fi

if [[ "$DO_BUILD" -eq 1 ]]; then
  color "Construyendo imagen $IMAGE_NAME"
  docker build -t "$IMAGE_NAME" ./web
  ok "Imagen construida"
fi

if ! docker network ls --format '{{.Name}}' | grep -q '^iagenteknet$'; then
  err "La red 'iagenteknet' no existe en este host."
  err "  Crear con: docker network create --driver=overlay --attachable iagenteknet"
  exit 1
fi

color "Desplegando stack '$STACK_NAME'"
docker stack deploy -c "$STACK_FILE" "$STACK_NAME" --resolve-image=never --detach=false

ok "Stack desplegado"
color "Servicios:"
docker stack services "$STACK_NAME"

color "Esperando a que el servicio esté corriendo (timeout 60s)..."
for i in {1..30}; do
  RUNNING=$(docker service ls --filter "name=${STACK_NAME}_frontend" --format '{{.Replicas}}' || echo "0/1")
  if [[ "$RUNNING" == "1/1" ]]; then
    ok "Frontend corriendo (1/1)"
    break
  fi
  printf "  · estado: %s\n" "$RUNNING"
  sleep 2
done

color "Logs recientes (últimas 20 líneas):"
docker service logs --tail 20 "${STACK_NAME}_frontend" 2>&1 || warn "Sin logs aún"

ok "Deploy completo. URL: https://propuesta-diseno-experimental.iagentek.com.mx"
