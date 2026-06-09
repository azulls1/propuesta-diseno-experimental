#!/usr/bin/env python3
"""
Genera el ZIP final del entregable de la Actividad 1.

Estructura del ZIP:
    entregable-actividad-1-samuel-hernandez.zip
    ├── LEEME.md                       (mapeo a rúbrica + cómo navegar)
    ├── 01-reporte/
    │   ├── reporte.md                 (fuente Markdown)
    │   ├── reporte.pdf                (entregable principal — Criterios 1-4)
    │   └── _header.tex
    ├── 02-wiki-analisis/              (desglose del enunciado, método Karpathy)
    │   └── *.md
    └── 03-sitio-web/                  (referencia al sitio)
        └── README-sitio.md

Uso: python tools/build_entregable_zip.py
"""
from __future__ import annotations

import hashlib
import json
import sys
import zipfile
from datetime import datetime, timezone
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
OUT_DIR = REPO / "entregables"
ZIP_NAME = "entregable-actividad-1-samuel-hernandez.zip"
ZIP_PATH = OUT_DIR / ZIP_NAME

LEEME = """# Entregable — Actividad 1: Propuesta de Diseño Experimental

**Autor:** Samuel Hernández (azulls1) · azull.samael@gmail.com
**Asignatura:** Investigación en Inteligencia Artificial
**Programa:** Maestría en IA · 1er semestre
**Fecha:** {date}

## Mapeo a la rúbrica

| Criterio                                      | Peso | Ubicación en este entregable                     |
|-----------------------------------------------|-----:|--------------------------------------------------|
| C1 — Motivación argumentada                   | 20%  | `01-reporte/reporte.docx` § 1                    |
| C2 — Hipótesis + experimentos refutables      | 20%  | `01-reporte/reporte.docx` § 2                    |
| **C3 — Rigor, muestreo, sesgos, suficiencia** | **40%** | `01-reporte/reporte.docx` § 3 + § 4           |
| C4 — Redacción y presentación                 | 20%  | `01-reporte/reporte.docx` (todo el documento)    |

**Formato del entregable principal**: `reporte.docx` se abre con Calibri 12 e interlineado 1.5 en Word (cumple el enunciado). El `reporte.pdf` está incluido como alternativa para visualización rápida.

## Contenido

- **`01-reporte/`** — La propuesta académica en PDF y su fuente Markdown.
- **`02-wiki-analisis/`** — Desglose del enunciado del maestro siguiendo el método LLM-wiki de Karpathy. Material de apoyo, no parte del entregable evaluado.
- **`03-sitio-web/`** — Información del sitio web público que complementa el proyecto.

## Recursos en línea

- **Sitio web público**: https://propuesta-diseno-experimental.iagentek.com.mx
- **Repositorio GitHub**: https://github.com/azulls1/propuesta-diseno-experimental

El sitio incluye un laboratorio ejecutable: clasificador en vivo con HuggingFace,
calculadora Wilcoxon, validador de hipótesis y comentarios persistidos en Supabase.

## Verificación

| Archivo               | SHA-256 |
|-----------------------|---------|
{hashes}

Generado el {date} con `tools/build_entregable_zip.py`.
"""

README_SITIO = """# Sitio web del proyecto

El sitio público acompañante de esta propuesta está disponible en:

**https://propuesta-diseno-experimental.iagentek.com.mx**

## 12 módulos

- `/` Inicio (rúbrica + módulos)
- `/motivacion` (C1)
- `/hipotesis` (C2)
- `/metodologia` (C3 — 40%)
- `/comparacion`
- `/redaccion` (C4)
- `/datasets`
- `/baselines`
- `/entregables` (este catálogo)
- `/como-funciona`
- `/autor`
- `/laboratorio` (clasificador en vivo, Wilcoxon, validador, comentarios)

## Stack

Angular 19 · Tailwind 4 · Forest DS · Docker Swarm · Traefik · Let's Encrypt.

Backend del laboratorio: HuggingFace Inference API + Supabase
(stack supabase-maestria del VPS iagentek).
"""

def sha256_of(path: Path) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()

def add_file(zf: zipfile.ZipFile, src: Path, arcname: str, hashes: list):
    zf.write(src, arcname)
    hashes.append((arcname, sha256_of(src)))
    print(f"  + {arcname}  ({src.stat().st_size:,} bytes)")

def main():
    OUT_DIR.mkdir(exist_ok=True)
    print(f"Repo: {REPO}")
    print(f"ZIP:  {ZIP_PATH}")

    hashes: list[tuple[str, str]] = []
    sitio_readme = OUT_DIR / "README-sitio.md"
    sitio_readme.write_text(README_SITIO, encoding="utf-8")

    with zipfile.ZipFile(ZIP_PATH, "w", zipfile.ZIP_DEFLATED, compresslevel=6) as zf:
        # 01-reporte
        rd = REPO / "entregables" / "reporte"
        for fname in ("reporte.md", "reporte.pdf", "reporte.docx", "_header.tex"):
            src = rd / fname
            if src.exists():
                add_file(zf, src, f"01-reporte/{fname}", hashes)

        # 02-wiki (vive en docs/wiki/ dentro del repo)
        wiki = REPO / "docs" / "wiki"
        if not wiki.exists():
            wiki = REPO.parent / "wiki-actividad-1"  # fallback local dev
        if wiki.exists():
            for md in sorted(wiki.glob("*.md")):
                add_file(zf, md, f"02-wiki-analisis/{md.name}", hashes)

        # Original .docx del enunciado (si está disponible)
        enunciado = REPO / "docs" / "enunciado" / "mexmiart07_act2.docx"
        if enunciado.exists():
            add_file(zf, enunciado, "00-enunciado-original/mexmiart07_act2.docx", hashes)

        # 03-sitio
        add_file(zf, sitio_readme, "03-sitio-web/README-sitio.md", hashes)

        # LEEME with hashes computed in-zip
        hashes_md = "\n".join(f"| `{n}` | `{h}` |" for n, h in hashes)
        leeme = LEEME.format(
            date=datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC"),
            hashes=hashes_md,
        )
        zf.writestr("LEEME.md", leeme.encode("utf-8"))
        print(f"  + LEEME.md  ({len(leeme):,} bytes)")

    size = ZIP_PATH.stat().st_size
    zip_sha = sha256_of(ZIP_PATH)
    print()
    print(f"DONE: {ZIP_PATH} · {size:,} bytes")
    print(f"      SHA-256: {zip_sha}")

    # Manifest JSON
    manifest = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "zip": {
            "name": ZIP_PATH.name,
            "size": size,
            "sha256": zip_sha,
        },
        "contents": [{"path": n, "sha256": h} for n, h in hashes],
    }
    (OUT_DIR / "manifest.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    print(f"      manifest: {OUT_DIR / 'manifest.json'}")

if __name__ == "__main__":
    main()
