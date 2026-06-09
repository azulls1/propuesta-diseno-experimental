# 03 — Requisito 1: Hipótesis con motivación

## Lo que dice el enunciado

> "Una hipótesis que debe refutarse o no con la experimentación. Es decir, qué buscamos resolver con el experimento y qué pretendemos demostrar. La hipótesis debe estar basada en un problema real y debe motivarse que ese problema existe y no está suficientemente resuelto, es decir, que aunque esté resuelto parcialmente, los resultados aún no son satisfactorios y podrían ser mejorados."

## Desglose en piezas

Hay **tres piezas** que tienes que entregar aquí:

### Pieza A — El problema real

Una afirmación del tipo: *"Existe un problema X que afecta a Y."*

**Criterios para que esté bien**:
- Problema **real**, no inventado (apoyado en literatura o estadísticas).
- Específico, no genérico ("la IA es muy útil" ❌).
- Acotado a un dominio: visión, NLP, recomendación, robótica, ética, etc.

**Ejemplo bueno**: "Los modelos de detección de discurso de odio en español tienen una precisión 15 puntos inferior cuando se aplican a variantes dialectales mexicanas frente al español peninsular sobre el cual fueron entrenados."

**Ejemplo malo**: "La IA puede ayudar a la sociedad."

### Pieza B — Por qué no está suficientemente resuelto

Una afirmación del tipo: *"Aunque existen soluciones (A, B, C), siguen presentando limitaciones (D, E)."*

**Criterios**:
- Cita al menos 2-3 trabajos previos (papers, papers de revisión, encuestas).
- Identifica **qué métrica concreta** falla o qué limitación hay.
- Justifica que la mejora vale la pena (impacto).

### Pieza C — La hipótesis

Una afirmación del tipo: *"Si aplicamos X, entonces obtendremos una mejora cuantificable en Y respecto a Z."*

**Criterios — la hipótesis debe ser**:
- **Falsable**: tiene que ser posible que el experimento la refute. Si tu hipótesis no se puede refutar, no es científica (ver [[08-glosario]] → falsabilidad).
- **Específica**: con variables claras.
- **Cuantificable**: dice qué métrica vas a medir.

**Plantilla útil**:
> "*H1: El uso de [técnica X] mejorará [métrica M] en al menos [umbral] en [tarea T] sobre [dataset/población] frente al baseline [B].*"

**Ejemplo**:
> "*H1: Hacer fine-tuning de BERT-base con un corpus de 50k tuits dialectales mexicanos mejorará el F1-score de detección de discurso de odio en al menos 8 puntos frente al modelo base entrenado solo con corpus peninsular.*"

**Hipótesis nula** (opcional pero recomendado para rigor):
> "*H0: No hay diferencia significativa (p > 0.05) entre el modelo afinado y el baseline.*"

## Errores comunes que se cometen

1. **Hipótesis no falsable**: "La IA puede mejorar X." → No se puede refutar (siempre se puede decir "no la usaste bien").
2. **Hipótesis sin métrica**: "El modelo será mejor." → Mejor ¿en qué? ¿Cuánto?
3. **Motivación con literatura inventada**: si vas a citar, cita papers reales o no cites.
4. **Confundir hipótesis con objetivo**: el objetivo es "estudiar X"; la hipótesis es una afirmación verificable.
5. **Demasiadas hipótesis**: 1-2 hipótesis bien planteadas > 5 hipótesis mal definidas. Recuerda: solo 5 páginas en total.

## Cómo va a calificarte el maestro este punto

Esta pieza alimenta **dos criterios** de la rúbrica:

- **Criterio 1 — Motivación argumentada (20%)** → piezas A y B.
- **Criterio 2 — Planteamiento de hipótesis (20%)** → pieza C.

Ver [[07-rubrica-explicada]].

## Conceptos relacionados

- [[08-glosario]] → falsabilidad, hipótesis nula, métrica.
- [[06-req-4-comparacion]] → la comparación con otras técnicas conecta con la "Pieza B".

---

**Anterior:** [[02-descripcion-detallada]] · **Siguiente:** [[04-req-2-metodologia]]
