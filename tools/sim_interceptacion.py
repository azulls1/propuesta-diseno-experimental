#!/usr/bin/env python3
"""
Simulacion ILUSTRATIVA de interceptacion de un asteroide con recalculo de
trayectoria en tiempo real. Compara, en DOS paneles lado a lado y con el mismo
escenario y perturbacion:

    IZQUIERDA  - Guiado clasico (navegacion proporcional, APN): falla.
    DERECHA    - Guiado adaptativo (IA / RL): impacta (con efecto de explosion).

La perturbacion no modelada (p. ej. presion de radiacion solar) curva la
trayectoria del objetivo; el guiado clasico no la compensa y la IA si.

Genera un GIF animado para el Laboratorio del sitio.
NO es la politica RL entrenada: es una demostracion conceptual del experimento
descrito en el reporte (los numeros reales se computan al ejecutar el estudio).

Uso: python tools/sim_interceptacion.py
Salida: web/public/sim/interceptacion.gif
"""
from __future__ import annotations

from pathlib import Path

import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Circle
from PIL import Image

# ---- Paleta Forest DS (coherente con el sitio) ----
BG    = "#061A14"
GRID  = "#13352B"
ASTER = "#9EADA3"
APN_C = "#D97706"   # amber  (clasico)
RL_C  = "#34D399"   # verde  (IA / RL)
TXT   = "#E8F0EC"
MUTED = "#7E948B"

DT = 0.04
STEPS = 165
N_PN = 3.0
A_MAX = 9.0
K = 60.0            # escala a "metros" ilustrativos

OUT = Path(__file__).resolve().parent.parent / "web" / "public" / "sim" / "interceptacion.gif"


def simulate():
    """Propaga objetivo + dos interceptores (APN y RL). Devuelve trayectorias."""
    rng = np.random.default_rng(42)
    ast_p = np.array([9.0, 7.5]); ast_v = np.array([-1.45, -1.25])
    a_pert = np.array([0.62, -0.30])                       # perturbacion no modelada (SRP)

    p_apn = np.array([0.0, 0.0]); v_apn = np.array([2.4, 3.0])
    p_rl  = np.array([0.0, 0.0]); v_rl  = np.array([2.4, 3.0])
    A, R, AST = [p_apn.copy()], [p_rl.copy()], [ast_p.copy()]

    def pn_accel(p, v, augmented):
        r = ast_p - p; rv = ast_v - v
        rng_ = np.linalg.norm(r) + 1e-9
        los = r / rng_
        Vc = -np.dot(rv, los)
        omega = (r[0] * rv[1] - r[1] * rv[0]) / (rng_ ** 2)
        perp = np.array([-los[1], los[0]])
        a = N_PN * Vc * omega * perp
        if augmented:                                       # la IA compensa la perturbacion
            a = a + 0.92 * a_pert + 0.6 * N_PN * np.dot(a_pert, perp) * perp
        nrm = np.linalg.norm(a)
        if nrm > A_MAX:
            a = a * (A_MAX / nrm)
        return a

    for _ in range(STEPS):
        ast_v = ast_v + (a_pert + rng.normal(0, 0.05, 2)) * DT
        ast_p = ast_p + ast_v * DT
        a1 = pn_accel(p_apn, v_apn, False); v_apn = v_apn + a1 * DT; p_apn = p_apn + v_apn * DT
        a2 = pn_accel(p_rl, v_rl, True);    v_rl  = v_rl  + a2 * DT; p_rl  = p_rl  + v_rl  * DT
        A.append(p_apn.copy()); R.append(p_rl.copy()); AST.append(ast_p.copy())

    return np.array(A), np.array(R), np.array(AST)


def main():
    A, R, AST = simulate()
    # recortar al instante de impacto de la IA (climax al final)
    cut = int(np.argmin(np.linalg.norm(AST - R, axis=1))) + 1
    A, R, AST = A[:cut], R[:cut], AST[:cut]
    n = len(AST)

    miss_rl = float(np.linalg.norm(AST[-1] - R[-1]) * K)
    apn_close_idx = int(np.argmin(np.linalg.norm(AST - A, axis=1)))
    miss_apn = float(np.linalg.norm(AST[apn_close_idx] - A[apn_close_idx]) * K)
    apn_close_xy = A[apn_close_idx]; apn_close_ast = AST[apn_close_idx]
    impact_xy = (AST[-1] + R[-1]) / 2.0

    # vista compartida por ambos paneles (zoom a la accion)
    allx = np.concatenate([A[:, 0], R[:, 0], AST[:, 0]])
    ally = np.concatenate([A[:, 1], R[:, 1], AST[:, 1]])
    mx = 0.16 * (allx.max() - allx.min()) + 0.6
    my = 0.16 * (ally.max() - ally.min()) + 0.6
    x0, x1 = allx.min() - mx, allx.max() + mx
    y0, y1 = ally.min() - my, ally.max() + my
    span = max(x1 - x0, y1 - y0)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    fig, (axL, axR) = plt.subplots(1, 2, figsize=(10.6, 5.0), dpi=100)
    fig.patch.set_facecolor(BG)
    fig.suptitle("Intercepción de asteroide — recálculo de trayectoria en tiempo real",
                 color=TXT, fontsize=12.5, fontweight="bold", y=0.98)
    fig.text(0.5, 0.025, "Simulación ilustrativa · Python (numpy + matplotlib) · mismo escenario y perturbación en ambos paneles",
             ha="center", color=MUTED, fontsize=8)

    srng = np.random.default_rng(7)
    star_x = srng.uniform(x0, x1, 90); star_y = srng.uniform(y0, y1, 90); star_s = srng.uniform(1, 6, 90)

    def setup(ax, title, col):
        ax.set_facecolor(BG); ax.set_xlim(x0, x1); ax.set_ylim(y0, y1)
        ax.set_aspect("equal"); ax.axis("off")
        ax.set_title(title, color=col, fontsize=11, fontweight="bold", pad=6)
        ax.scatter(star_x, star_y, s=star_s, c="#bfd8cd", alpha=0.30, marker=".")
        ax.plot(0, 0, "^", color=TXT, ms=8)

    setup(axL, "Guiado clásico (APN)", APN_C)
    setup(axR, "Guiado IA (RL)", RL_C)

    def hud(ax):
        return ax.text(0.035, 0.04, "", transform=ax.transAxes, color=TXT, fontsize=9,
                       family="monospace", va="bottom",
                       bbox=dict(boxstyle="round,pad=0.4", fc="#0b2a22", ec=GRID))

    # --- panel IZQUIERDO (APN) ---
    (Lit,) = axL.plot([], [], color=APN_C, lw=2.0, alpha=0.9)
    (Last_t,) = axL.plot([], [], color=ASTER, lw=1.0, ls=":", alpha=0.7)
    (Lgap,) = axL.plot([], [], "--", color=APN_C, lw=1.0, alpha=0.0)
    (Lint,) = axL.plot([], [], "o", color=APN_C, ms=8)
    (Last,) = axL.plot([], [], "o", color=ASTER, ms=15, mec="#cdd9d2")
    Lhud = hud(axL)

    # --- panel DERECHO (RL) + explosion ---
    (Rit,) = axR.plot([], [], color=RL_C, lw=2.0, alpha=0.95)
    (Rast_t,) = axR.plot([], [], color=ASTER, lw=1.0, ls=":", alpha=0.7)
    (Rint,) = axR.plot([], [], "o", color=RL_C, ms=8)
    (Rast,) = axR.plot([], [], "o", color=ASTER, ms=15, mec="#cdd9d2")
    Rhud = hud(axR)
    glow  = Circle(tuple(impact_xy), 0.01, fc="#ff7a1a", ec="none", alpha=0.0)
    ring1 = Circle(tuple(impact_xy), 0.01, fill=False, ec="#ff8c42", lw=3.0, alpha=0.0)
    ring2 = Circle(tuple(impact_xy), 0.01, fill=False, ec="#ffe27a", lw=2.0, alpha=0.0)
    axR.add_patch(glow); axR.add_patch(ring1); axR.add_patch(ring2)
    (core,) = axR.plot([], [], "o", color="#fffbe6", ms=0, alpha=0.0)
    (debris,) = axR.plot([], [], "o", color="#ffd27f", ms=5, alpha=0.0)
    drng = np.random.default_rng(3)
    ang = np.linspace(0, 2 * np.pi, 22, endpoint=False)
    spd = drng.uniform(0.6, 1.5, ang.size)
    dcos, dsin = np.cos(ang), np.sin(ang)
    R_expl = 0.30 * span

    HOLD = 30
    impact_idx = n - 1
    expl_dur = 24

    def frame(i):
        j = min(i, n - 1)
        hit = i >= impact_idx

        # IZQUIERDA (APN): el asteroide sobrevive; el interceptor falla
        Lit.set_data(A[:j + 1, 0], A[:j + 1, 1])
        Last_t.set_data(AST[:j + 1, 0], AST[:j + 1, 1])
        Last.set_data([AST[j, 0]], [AST[j, 1]])
        if hit:
            Lint.set_data([apn_close_xy[0]], [apn_close_xy[1]])
            Lgap.set_data([apn_close_xy[0], apn_close_ast[0]], [apn_close_xy[1], apn_close_ast[1]])
            Lgap.set_alpha(0.65)
            Lhud.set_text(f"FALLO · {miss_apn:5.1f} m\namenaza no neutralizada")
        else:
            Lint.set_data([A[j, 0]], [A[j, 1]]); Lgap.set_alpha(0.0)
            Lhud.set_text(f"Distancia: {np.linalg.norm(AST[j]-A[j])*K:5.1f} m")

        # DERECHA (RL): impacto + explosion
        Rit.set_data(R[:j + 1, 0], R[:j + 1, 1])
        ast_end = impact_idx if hit else j
        Rast_t.set_data(AST[:ast_end + 1, 0], AST[:ast_end + 1, 1])
        if hit:
            p = min(1.0, (i - impact_idx) / max(1, expl_dur))
            Rint.set_data([], []); Rast.set_data([], [])
            ring1.set_radius(0.05 + p * R_expl); ring2.set_radius(0.05 + p * R_expl * 0.7)
            glow.set_radius(0.05 + (1 - (1 - p) ** 2) * R_expl * 0.55)
            core.set_data([impact_xy[0]], [impact_xy[1]])
            core.set_markersize((1.0 - min(1.0, p * 2.0)) * 48 + 8)
            rad = 0.1 + p * R_expl * 1.05
            debris.set_data(impact_xy[0] + dcos * spd * rad, impact_xy[1] + dsin * spd * rad)
            debris.set_markersize(max(2.0, 7.0 - p * 5.0))
            glow.set_alpha(max(0.0, (1 - p) * 0.5)); ring1.set_alpha(max(0.0, (1 - p) * 0.95))
            ring2.set_alpha(max(0.0, (1 - p) * 0.85)); core.set_alpha(max(0.0, 1 - p * 1.9))
            debris.set_alpha(max(0.0, 1 - p))
            Rhud.set_text(f"IMPACTO · fallo {miss_rl:4.1f} m\namenaza neutralizada")
        else:
            Rint.set_data([R[j, 0]], [R[j, 1]]); Rast.set_data([AST[j, 0]], [AST[j, 1]])
            for art in (glow, ring1, ring2, core, debris):
                art.set_alpha(0.0)
            Rhud.set_text(f"Distancia: {np.linalg.norm(AST[j]-R[j])*K:5.1f} m")

        return (Lit, Last_t, Lgap, Lint, Last, Lhud,
                Rit, Rast_t, Rint, Rast, glow, ring1, ring2, core, debris, Rhud)

    fig.subplots_adjust(left=0.02, right=0.98, top=0.88, bottom=0.07, wspace=0.06)

    # Render manual frame por frame via savefig (captura fiable de la explosion)
    import io
    rgb = []
    for i in range(n + HOLD):
        frame(i)
        buf = io.BytesIO()
        fig.savefig(buf, format="png", facecolor=BG, dpi=100)
        buf.seek(0)
        rgb.append(Image.open(buf).convert("RGB"))
    plt.close(fig)

    # Paleta POR FRAME (cada frame conserva sus propios colores; los frames del
    # estallido mantienen los naranjas/blancos en su tabla local).
    seq = [f.quantize(colors=256, method=Image.MEDIANCUT) for f in rgb]
    seq[0].save(str(OUT), save_all=True, append_images=seq[1:],
                duration=55, loop=0, disposal=2, optimize=False)
    kb = OUT.stat().st_size / 1024
    print(f"OK: {OUT}  ({kb:.0f} KB, {len(seq)} frames)")
    print(f"    miss APN={miss_apn:.1f} m  miss RL={miss_rl:.1f} m  "
          f"reduccion={100*(miss_apn-miss_rl)/miss_apn:.1f}%")


if __name__ == "__main__":
    main()
