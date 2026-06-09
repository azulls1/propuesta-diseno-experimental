# 00 — TL;DR (resumen ejecutivo)

## ¿Qué hay que entregar?

Un documento de **máximo 5 páginas** (Calibri 12, interlineado 1,5) que describa el **diseño** de un experimento científico relacionado con IA. **No ejecutas el experimento**, solo lo planificas — como la sección *Methods* de un paper.

## ¿Qué tiene que contener el documento?

Cuatro bloques obligatorios (ver detalles en cada página enlazada):

1. **Hipótesis con motivación** → [[03-req-1-hipotesis]]
   - Problema real, parcialmente resuelto, que se podría mejorar.
2. **Metodología y datos** → [[04-req-2-metodologia]]
   - Encuestas / pruebas de usuario / datasets — cómo, con quién, de dónde.
3. **Train / validation split** (si usas ML) → [[05-req-3-train-val]]
   - ¿Cómo seleccionaste ambos conjuntos? ¿Son representativos?
4. **Comparación con otras técnicas o estudios** → [[06-req-4-comparacion]]
   - Baselines, estado del arte.

## ¿Cómo te van a calificar?

| Criterio | Peso |
|---|---|
| Motivación argumentada | 20% |
| Hipótesis + experimentos que la refuten | 20% |
| **Rigor: muestreo, sesgos, suficiencia de pruebas** | **40%** ← el más importante |
| Redacción y presentación | 20% |

Detalle en [[07-rubrica-explicada]].

## ¿Cuál es la trampa mental que evitar?

El error típico es escribir un ensayo divulgativo sobre IA. **No es eso**. Lo que se evalúa es si sabes **planificar un experimento reproducible y verificable** — es decir, que cualquier otro investigador podría leer tu documento y replicar el experimento sin pedirte aclaraciones.

## ¿Por dónde empezar?

1. Decide **qué problema de IA** te interesa (ver [[11-decisiones-pendientes]]).
2. Formula una **hipótesis falsable** (ver [[08-glosario]] entrada "hipótesis").
3. Sigue el [[09-plan-redaccion]].

---

**Siguiente:** [[01-objetivo]]
