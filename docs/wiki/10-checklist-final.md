# 10 — Checklist final antes de entregar

> Pasa por esta lista **antes** de subir el documento. Cada ítem está alineado con la rúbrica.

## Formato (obligatorio)

- [ ] Documento en formato Word o PDF (lo que pida el aula).
- [ ] Fuente **Calibri 12**.
- [ ] Interlineado **1,5**.
- [ ] **Máximo 5 páginas** (excluyendo portada y referencias si la institución lo permite — verifica).
- [ ] Numeración de páginas activada.
- [ ] Márgenes razonables (no manipulados artificialmente para meter más texto).

## Estructura

- [ ] Título claro y específico (no genérico).
- [ ] Autoría, asignatura, fecha.
- [ ] Secciones numeradas (1. Introducción, 2. Hipótesis, etc.).
- [ ] Cada sección referenciada al menos una vez en el flujo del documento (no quedan secciones colgadas).

## Criterio 1 — Motivación (20%)

- [ ] El problema está descrito con datos o referencias concretas (no genérico).
- [ ] Se demuestra que el problema es real (citas, estadísticas).
- [ ] Se argumenta que las soluciones actuales son insuficientes.
- [ ] La motivación enlaza claramente con la hipótesis.

## Criterio 2 — Hipótesis (20%)

- [ ] La hipótesis está enunciada explícitamente en una frase.
- [ ] Es **falsable** (puede ser refutada con evidencia).
- [ ] Especifica variables y métricas.
- [ ] Se indica qué resultado refutaría la hipótesis.
- [ ] El experimento descrito permite efectivamente refutarla.

## Criterio 3 — Rigor (40%) ← cuida especialmente esto

### Diseño

- [ ] Tipo de estudio identificado (experimental / cuasi / observacional).
- [ ] Variables independientes, dependientes y de control nombradas.

### Datos / Participantes

- [ ] Si humanos: tamaño muestral justificado, distribución demográfica, criterios I/E, ética.
- [ ] Si dataset: nombre, tamaño, idioma/dominio, balance, año, licencia.

### Train/Val/Test (si ML)

- [ ] Estrategia de split especificada.
- [ ] Proporciones justificadas.
- [ ] Semilla aleatoria mencionada.
- [ ] Representatividad discutida.

### Procedimiento

- [ ] Pasos concretos del experimento, en orden.
- [ ] Hardware/software/frameworks con versiones.
- [ ] Hiperparámetros relevantes especificados.

### Métricas y estadística

- [ ] Métricas seleccionadas + justificación.
- [ ] Prueba estadística planeada (t-test, McNemar, Wilcoxon, etc.).
- [ ] Nivel α (típicamente 0.05).
- [ ] Corrección por múltiples comparaciones si aplica.

### Sesgos

- [ ] Sección dedicada a sesgos esperables.
- [ ] Estrategia de mitigación para cada sesgo.
- [ ] Limitaciones reconocidas honestamente.

## Criterio 4 — Redacción (20%)

- [ ] Sin faltas de ortografía (corrector activado).
- [ ] Tiempos verbales consistentes.
- [ ] Voz consistente (impersonal o plural).
- [ ] Cada afirmación no trivial está citada.
- [ ] Tablas/figuras numeradas con descripción.
- [ ] Referencias en formato consistente (APA o IEEE).
- [ ] Sin párrafos de una sola línea ni párrafos kilométricos.
- [ ] Transiciones lógicas entre secciones.

## Comparación con otras técnicas

- [ ] Al menos una tabla con baselines o estudios comparados.
- [ ] Condiciones de la comparación justificadas (mismo dataset/métricas).
- [ ] Si comparas con SOTA: identificado el paper y la métrica.

## Verificación final de coherencia

- [ ] La hipótesis se puede testear con la metodología propuesta.
- [ ] El tamaño muestral es coherente con las pruebas estadísticas elegidas.
- [ ] Las métricas elegidas miden lo que dice la hipótesis.
- [ ] El experimento resulta **reproducible** desde el documento solamente (¿podría replicarlo un compañero sin pedirte aclaraciones?).

---

## Test del "espejo"

Antes de entregar, hazte estas tres preguntas. Si la respuesta no es "sí" a las tres, vuelve a revisar:

1. **Si alguien quisiera demostrar que mi hipótesis es falsa, ¿mi diseño se lo permitiría?**
2. **Si otro investigador, con solo este documento, intentara replicar mi experimento, ¿podría hacerlo sin pedirme nada?**
3. **¿Cada decisión tomada está justificada con un porqué, no solo con un qué?**

---

**Anterior:** [[09-plan-redaccion]] · **Siguiente:** [[11-decisiones-pendientes]]
