# 07 — Rúbrica explicada criterio por criterio

## La tabla original del enunciado

| Criterio | Descripción | Puntos | Peso |
|---|---|---|---|
| Criterio 1 | Motivación suficientemente argumentada | 2 | **20%** |
| Criterio 2 | Planteamiento de la hipótesis y experimentos que puedan refutarla | 2 | **20%** |
| Criterio 3 | Formalidad y rigor del experimento planteado, equilibrio en la población seleccionada, calidad del muestreo, evitación de sesgos, ¿las pruebas son suficientes para validar o no la hipótesis?, etc. | 4 | **40%** |
| Criterio 4 | Redacción y presentación del trabajo | 2 | **20%** |
| **Total** | | **10** | **100%** |

## Lectura estratégica

- El **Criterio 3 vale 40%** — el doble que cualquiera de los otros tres. Es donde más fácil pierdes o ganas puntos.
- Los cuatro criterios están correlacionados: si tu hipótesis (C2) no es falsable, automáticamente cae el rigor (C3). Si tu motivación (C1) no cita problemas reales, tu hipótesis no se sostiene.
- La **redacción (C4) no es accesoria**: 20% es mucho para un descuento por estilo, faltas, estructura. No la dejes para el último día.

---

## Criterio 1 — Motivación suficientemente argumentada (20%)

### Qué evalúa

Que demuestres que:
1. El problema existe (no lo inventaste).
2. Es importante (impacto real).
3. No está bien resuelto (hueco de investigación).
4. Mejorar la solución es valioso.

### Cómo maximizar puntos

- **Cita 2-3 trabajos previos reales** (no inventes referencias). Usa Google Scholar, Semantic Scholar, ACL Anthology, arXiv.
- **Cuantifica el problema**: porcentajes, números, casos.
- **Identifica el hueco específico**: "X funciona bien para A pero falla en B".
- **Conecta con tu hipótesis** explícitamente — la motivación debe llevar de la mano al lector hacia tu hipótesis.

### Cómo se pierden puntos

- Texto genérico ("la IA está cambiando el mundo").
- Sin referencias.
- Problema demasiado amplio o demasiado trivial.
- Desconexión entre la motivación y la hipótesis.

### Página relacionada

[[03-req-1-hipotesis]] — pieza A y B.

---

## Criterio 2 — Planteamiento de la hipótesis (20%)

### Qué evalúa

1. Que la hipótesis sea **falsable** (puede ser refutada).
2. Que los **experimentos propuestos** permitan refutarla.
3. Coherencia entre hipótesis y diseño experimental.

### Cómo maximizar puntos

- Formula la hipótesis en **una frase clara**, con variables y métricas.
- Considera incluir **hipótesis nula (H0)** y **alternativa (H1)** explícitas — demuestra madurez estadística.
- Indica **qué resultado refutaría la hipótesis** ("si no observamos mejora ≥X con p<0.05, la hipótesis queda refutada").
- Justifica por qué el experimento que propones efectivamente puede refutar la hipótesis (no es trivial, no es circular).

### Cómo se pierden puntos

- Hipótesis vagas ("el modelo será bueno").
- Hipótesis no falsables ("X es útil").
- Experimentos que no permiten testear la hipótesis.

### Página relacionada

[[03-req-1-hipotesis]] — pieza C.

---

## Criterio 3 — Rigor del experimento (40%) ← EL MÁS IMPORTANTE

### Qué evalúa (cuatro sub-aspectos, todos mencionados en el enunciado)

1. **Formalidad y rigor del experimento planteado**.
2. **Equilibrio en la población seleccionada**.
3. **Calidad del muestreo**.
4. **Evitación de sesgos**.
5. **¿Las pruebas son suficientes para validar o no la hipótesis?**

### Cómo maximizar puntos

- **Sé exhaustivo en la metodología**: cada decisión, justificada. Cada parámetro, especificado.
- **Demuestra que pensaste en los sesgos**: dedica una subsección a "Amenazas a la validez" (interna, externa, de constructo, estadística — ver [[08-glosario]]).
- **Justifica el tamaño muestral**: si humanos, con potencia estadística; si datos, con razonamiento.
- **Especifica las pruebas estadísticas** que vas a aplicar (test, nivel α, corrección por múltiples comparaciones).
- **Plantea ablations** y comparaciones suficientes (ver [[06-req-4-comparacion]]).
- **Discute limitaciones** abiertamente — no es debilidad, es rigor.

### Cómo se pierden puntos (muchos, ten cuidado)

- Detalles ausentes (versiones, semillas, hiperparámetros, hardware).
- Muestreo no justificado o claramente sesgado.
- Sin mención de sesgos.
- Sin análisis estadístico.
- "Comparemos con el estado del arte" sin decir cuál es.
- Pruebas insuficientes para soportar la conclusión que querría sacar la hipótesis.

### Páginas relacionadas

- [[04-req-2-metodologia]]
- [[05-req-3-train-val]]
- [[06-req-4-comparacion]]

---

## Criterio 4 — Redacción y presentación (20%)

### Qué evalúa

1. Claridad y precisión del texto.
2. Estructura (secciones, transiciones, lógica narrativa).
3. Formato (Calibri 12, interlineado 1.5, ≤5 páginas).
4. Calidad de tablas, figuras y referencias.
5. Ausencia de errores gramaticales/ortográficos.

### Cómo maximizar puntos

- **Sigue una estructura tipo paper**: ver [[09-plan-redaccion]].
- **Numera las secciones** y usa títulos claros.
- **Tablas para comparaciones**, no párrafos enredados.
- **Referencias bien formateadas** (APA o IEEE — elige una y mantenla).
- **Cita en el texto** ("Smith et al. 2022 mostró que...").
- **Revisa ortografía** (Word lo hace, no hay excusa).
- **Tono científico**: tercera persona o plural mayestático ("se utilizará", "utilizamos"); evita coloquial.
- **Respeta las 5 páginas máximo**.

### Cómo se pierden puntos

- Exceder 5 páginas.
- Faltas de ortografía o gramática.
- Sin tabla de referencias.
- Texto plano sin estructura.
- Formato distinto al pedido (Times en lugar de Calibri).

### Página relacionada

[[09-plan-redaccion]].

---

## Resumen: dónde invertir tu tiempo

Si tienes 10 horas para esta actividad, distribúyelas (sugerencia):

| Tarea | Tiempo | Peso en rúbrica |
|---|---|---|
| Elegir tema y leer 3-5 papers | 3h | Soporta C1, C2 |
| Diseñar metodología y muestreo | 3h | C3 (40%) |
| Redactar primer borrador | 2h | C4 |
| Revisar, pulir, validar formato | 2h | C4 + integridad |

---

**Anterior:** [[06-req-4-comparacion]] · **Siguiente:** [[08-glosario]]
