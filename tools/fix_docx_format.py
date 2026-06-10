#!/usr/bin/env python3
"""
Fuerza el formato exigido por el enunciado en el .docx generado por pandoc:
**Calibri 12 + interlineado 1,5** (el enunciado lo pide literal).

Pandoc usa por defecto el tema de Office (fuente Aptos, interlineado sencillo),
así que parcheamos word/styles.xml y word/theme/theme1.xml in-place.

Uso: python tools/fix_docx_format.py [ruta/al/reporte.docx]
     (sin argumento usa entregables/reporte/reporte.docx)
"""
from __future__ import annotations

import re
import shutil
import sys
import zipfile
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
DEFAULT_DOCX = REPO / "entregables" / "reporte" / "reporte.docx"

LINE_15 = "360"  # 360 twentieths = 1.5 líneas (240 = sencillo)


def patch_styles(xml: str) -> str:
    # 1) Fuente del cuerpo: de tema (minorHAnsi=Aptos) a Calibri explícito
    xml = re.sub(
        r'<w:rFonts w:asciiTheme="minorHAnsi"[^/]*/>',
        '<w:rFonts w:ascii="Calibri" w:cs="Calibri" w:eastAsia="Calibri" w:hAnsi="Calibri" />',
        xml,
        count=1,
    )
    # 2) Interlineado por defecto (pPrDefault): añadir 1.5 al spacing
    xml = xml.replace(
        '<w:spacing w:after="200" />',
        f'<w:spacing w:after="200" w:line="{LINE_15}" w:lineRule="auto" />',
    )
    # 3) Normalizar cualquier interlineado explícito de estilo a 1.5
    xml = re.sub(r'w:line="(240|259)"', f'w:line="{LINE_15}"', xml)
    return xml


def patch_theme(xml: str) -> str:
    # Cambiar las fuentes del tema (Aptos / Aptos Display) a Calibri
    xml = xml.replace('typeface="Aptos Display"', 'typeface="Calibri"')
    xml = xml.replace('typeface="Aptos"', 'typeface="Calibri"')
    return xml


def main() -> None:
    docx = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_DOCX
    if not docx.exists():
        print(f"[ERR] no existe {docx}", file=sys.stderr)
        sys.exit(1)

    tmp = docx.with_suffix(".docx.tmp")
    with zipfile.ZipFile(docx) as zin, zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED) as zout:
        for item in zin.infolist():
            data = zin.read(item.filename)
            if item.filename == "word/styles.xml":
                data = patch_styles(data.decode("utf-8")).encode("utf-8")
            elif item.filename == "word/theme/theme1.xml":
                data = patch_theme(data.decode("utf-8")).encode("utf-8")
            zout.writestr(item, data)
    shutil.move(str(tmp), str(docx))
    print(f"OK: {docx.name} -> Calibri 12 + interlineado 1.5")


if __name__ == "__main__":
    main()
