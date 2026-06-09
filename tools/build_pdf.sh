#!/usr/bin/env bash
# Regenera entregables/reporte/reporte.pdf desde reporte.md con pandoc/xelatex.
# Uso: bash tools/build_pdf.sh
set -euo pipefail

REPO="$(cd "$(dirname "$0")/.." && pwd)"
RD="$REPO/entregables/reporte"
SRC="$RD/reporte.md"
TMP="$RD/.reporte-pdf-source.md"
PDF="$RD/reporte.pdf"
HEADER="$RD/_header.tex"

if [ ! -f "$SRC" ]; then
  echo "[ERR] reporte.md no encontrado en $SRC" >&2; exit 1
fi
if [ ! -f "$HEADER" ]; then
  echo "[ERR] _header.tex no encontrado en $HEADER" >&2; exit 1
fi

# Sustituye caracteres unicode no cubiertos por Latin Modern
sed \
  -e 's/↔/<->/g' \
  -e 's/≈/~/g' \
  -e 's/α/alpha/g' \
  -e 's/κ/kappa/g' \
  -e 's/≥/>=/g' \
  -e 's/≤/<=/g' \
  -e 's/⁻¹/^(-1)/g' \
  -e 's/⁻⁵/^(-5)/g' \
  -e 's/2×10⁻⁵/2e-5/g' \
  -e 's/×/x/g' \
  "$SRC" > "$TMP"

echo "[1/2] Pandoc → xelatex"
docker run --rm \
  -v "$RD:/data" -w /data \
  pandoc/extra:latest \
  --from markdown --to pdf --pdf-engine=xelatex \
  -V geometry:margin=2cm \
  -V fontsize=11pt \
  -V linestretch=1.4 \
  -V documentclass=article \
  -V colorlinks=true \
  -V papersize=letter \
  --syntax-highlighting=tango \
  -H "_header.tex" \
  -o "reporte.pdf" \
  ".reporte-pdf-source.md"

rm -f "$TMP"

if [ ! -f "$PDF" ]; then echo "[ERR] No se generó el PDF" >&2; exit 1; fi

PAGES="$(docker run --rm -v "$RD:/d" minidocks/poppler:latest pdfinfo /d/reporte.pdf 2>/dev/null | awk '/^Pages:/ {print $2}' || echo "?")"
SIZE="$(du -h "$PDF" | cut -f1)"
SHA="$(sha256sum "$PDF" | awk '{print $1}')"
echo "[2/2] OK: $PDF · $SIZE · $PAGES páginas"
echo "       SHA-256: $SHA"
