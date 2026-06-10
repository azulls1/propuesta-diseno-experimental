#!/usr/bin/env python3
"""
Simulacion ILUSTRATIVA de interceptacion de un asteroide con recalculo de
trayectoria en tiempo real, comparando guiado clasico (navegacion proporcional,
APN) vs guiado adaptativo (IA / RL) bajo una perturbacion no modelada
(p. ej. presion de radiacion solar que curva la trayectoria del objetivo).

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
from matplotlib.animation import FuncAnimation, PillowWriter

# ---- Paleta Forest DS (coherente con el sitio) ----
BG      = "#061A14"   # espacio profundo (forest)
GRID    = "#13352B"
ASTER   = "#9EADA3"   # moss
APN_C   = "#D97706"   # amber  (clasico)
RL_C    = "#34D399"   # verde  (IA / RL)
TXT     = "#E8F0EC"
MUTED   = "#7E948B"

DT = 0.04
STEPS = 165
N_PN = 3.0            # ganancia de navegacion proporcional
A_MAX = 9.0           # aceleracion maxima del interceptor

OUT = Path(__file__).resolve().parent.parent / "web" / "public" / "sim" / "interceptacion.gif"


def simulate():
    """Propaga objetivo + dos interceptores; devuelve trayectorias y miss distance."""
    rng = np.random.default_rng(42)

    # Objetivo (asteroide): entra por arriba-derecha con una perturbacion lateral
    # constante (curva su trayectoria) -> el guiado clasico la subestima.
    ast_p = np.array([9.0, 7.5])
    ast_v = np.array([-1.45, -1.25])
    a_pert = np.array([0.42, -0.18])          # perturbacion "no modelada" (SRP)

    # Dos interceptores desde el origen, mismo estado inicial
    p_apn = np.array([0.0, 0.0]); v_apn = np.array([2.4, 3.0])
    p_rl  = np.array([0.0, 0.0]); v_rl  = np.array([2.4, 3.0])

    A, R, AST = [p_apn.copy()], [p_rl.copy()], [ast_p.copy()]
    miss_apn = miss_rl = 1e9

    def pn_accel(p, v, augmented):
        """Navegacion proporcional; si augmented, compensa la perturbacion (RL)."""
        r = ast_p - p
        rv = ast_v - v
        rng_ = np.linalg.norm(r) + 1e-9
        los = r / rng_
        Vc = -np.dot(rv, los)                  # velocidad de cierre
        omega = (r[0] * rv[1] - r[1] * rv[0]) / (rng_ ** 2)   # tasa de LOS
        perp = np.array([-los[1], los[0]])
        a = N_PN * Vc * omega * perp
        if augmented:
            # El controlador IA estima y compensa la perturbacion del objetivo
            a = a + 0.85 * a_pert + 0.6 * N_PN * np.dot(a_pert, perp) * perp
        # limite de aceleracion
        n = np.linalg.norm(a)
        if n > A_MAX:
            a = a * (A_MAX / n)
        return a

    for _ in range(STEPS):
        # objetivo con perturbacion + ruido pequeno
        ast_v = ast_v + (a_pert + rng.normal(0, 0.05, 2)) * DT
        ast_p = ast_p + ast_v * DT

        a1 = pn_accel(p_apn, v_apn, augmented=False)
        v_apn = v_apn + a1 * DT; p_apn = p_apn + v_apn * DT

        a2 = pn_accel(p_rl, v_rl, augmented=True)
        v_rl = v_rl + a2 * DT; p_rl = p_rl + v_rl * DT

        miss_apn = min(miss_apn, np.linalg.norm(ast_p - p_apn))
        miss_rl  = min(miss_rl,  np.linalg.norm(ast_p - p_rl))

        A.append(p_apn.copy()); R.append(p_rl.copy()); AST.append(ast_p.copy())

    # escala a "metros" ilustrativos
    k = 60.0
    return (np.array(A), np.array(R), np.array(AST), miss_apn * k, miss_rl * k)


def main():
    A, R, AST, miss_apn, miss_rl = simulate()
    OUT.parent.mkdir(parents=True, exist_ok=True)

    fig, ax = plt.subplots(figsize=(7.0, 4.4), dpi=100)
    fig.patch.set_facecolor(BG); ax.set_facecolor(BG)
    ax.set_xlim(-1.5, 10.5); ax.set_ylim(-1.0, 8.5)
    ax.set_aspect("equal"); ax.axis("off")

    # estrellas de fondo (fijas, seed)
    srng = np.random.default_rng(7)
    sx = srng.uniform(-1.5, 10.5, 90); sy = srng.uniform(-1.0, 8.5, 90)
    ax.scatter(sx, sy, s=srng.uniform(1, 7, 90), c="#bfd8cd", alpha=0.35, marker=".")

    ax.set_title("Intercepción de asteroide — recálculo de trayectoria en tiempo real",
                 color=TXT, fontsize=11, fontweight="bold", pad=10)

    (apn_trail,) = ax.plot([], [], color=APN_C, lw=1.8, alpha=0.9)
    (rl_trail,)  = ax.plot([], [], color=RL_C,  lw=1.8, alpha=0.9)
    (ast_trail,) = ax.plot([], [], color=ASTER, lw=1.0, ls=":", alpha=0.7)
    (apn_dot,)   = ax.plot([], [], "o", color=APN_C, ms=7)
    (rl_dot,)    = ax.plot([], [], "o", color=RL_C,  ms=7)
    (ast_dot,)   = ax.plot([], [], "o", color=ASTER, ms=13, mec="#cdd9d2")
    ax.plot(0, 0, "^", color=TXT, ms=9)  # plataforma de lanzamiento

    hud = ax.text(0.015, 0.06, "", transform=ax.transAxes, color=TXT,
                  fontsize=9, family="monospace", va="bottom",
                  bbox=dict(boxstyle="round,pad=0.4", fc="#0b2a22", ec=GRID))
    ax.legend([apn_dot, rl_dot, ast_dot], ["Clásico (APN)", "IA (RL)", "Asteroide"],
              loc="upper left", facecolor="#0b2a22", edgecolor=GRID,
              labelcolor=TXT, fontsize=8, framealpha=0.9)

    n = len(AST)
    HOLD = 28  # frames finales congelados mostrando el resultado

    def frame(i):
        j = min(i, n - 1)
        apn_trail.set_data(A[:j + 1, 0], A[:j + 1, 1])
        rl_trail.set_data(R[:j + 1, 0], R[:j + 1, 1])
        ast_trail.set_data(AST[:j + 1, 0], AST[:j + 1, 1])
        apn_dot.set_data([A[j, 0]], [A[j, 1]])
        rl_dot.set_data([R[j, 0]], [R[j, 1]])
        ast_dot.set_data([AST[j, 0]], [AST[j, 1]])
        if i >= n - 1:
            red = 100 * (miss_apn - miss_rl) / miss_apn
            hud.set_text(f"DISTANCIA DE FALLO\n Clásico (APN): {miss_apn:5.1f} m\n"
                         f" IA (RL):       {miss_rl:5.1f} m\n IA reduce el fallo {red:4.1f} %")
        else:
            da = np.linalg.norm(AST[j] - A[j]) * 60.0
            dr = np.linalg.norm(AST[j] - R[j]) * 60.0
            hud.set_text(f"DISTANCIA ACTUAL\n Clásico (APN): {da:5.1f} m\n IA (RL):       {dr:5.1f} m")
        return apn_trail, rl_trail, ast_trail, apn_dot, rl_dot, ast_dot, hud

    anim = FuncAnimation(fig, frame, frames=n + HOLD, interval=50, blit=False)
    anim.save(str(OUT), writer=PillowWriter(fps=20))
    plt.close(fig)
    size_kb = OUT.stat().st_size / 1024
    print(f"OK: {OUT}  ({size_kb:.0f} KB)")
    print(f"    miss APN={miss_apn:.1f} m  miss RL={miss_rl:.1f} m  "
          f"reduccion={100*(miss_apn-miss_rl)/miss_apn:.1f}%")


if __name__ == "__main__":
    main()
