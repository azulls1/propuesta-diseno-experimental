#!/usr/bin/env bash
# Genera entregables/reporte/reporte.docx desde reporte.md vía pandoc.
# El docx queda con estilo Normal por defecto, que Word renderiza como
# Calibri 12 + interlineado 1.5 al abrirlo (o ajustable en Style > Normal).
set -euo pipefail

REPO="$(cd "$(dirname "$0")/.." && pwd)"
RD="$REPO/entregables/reporte"
SRC="$RD/reporte.md"
DOCX="$RD/reporte.docx"

if [ ! -f "$SRC" ]; then echo "[ERR] $SRC no existe" >&2; exit 1; fi

echo "[1/1] Pandoc → docx"
docker run --rm \
  -v "$RD:/data" -w /data \
  pandoc/extra:latest \
  --from markdown --to docx \
  -V lang=es \
  -o "reporte.docx" \
  "reporte.md"

if [ ! -f "$DOCX" ]; then echo "[ERR] No se generó el DOCX" >&2; exit 1; fi

SIZE="$(du -h "$DOCX" | cut -f1)"
SHA="$(sha256sum "$DOCX" | awk '{print $1}')"
echo "OK: $DOCX · $SIZE"
echo "    SHA-256: $SHA"
