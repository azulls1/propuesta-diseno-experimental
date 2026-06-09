# 04 — Requisito 2: Descripción de la metodología

## Lo que dice el enunciado

> "La descripción de la metodología que se va a utilizar. Por ejemplo, si se van a hacer encuestas o pruebas de usuario, la población que se ha tomado como muestra, su distribución geográfica, étnica, de edad, etc., siempre que sea relevante para la experimentación. Es necesario indicar cómo se han preparado los datos, si se utilizan datos de un *dataset*, cómo se han procesado y qué partes de estos datos se han utilizado y qué pruebas realizaremos con ellos."

## Qué hay que cubrir (checklist)

El maestro enumera (de forma narrativa) los elementos que tu sección de metodología debe incluir:

- [ ] **Paradigma metodológico**: ¿es un experimento controlado? ¿una evaluación sobre dataset? ¿un estudio con usuarios?
- [ ] **Población / muestra** (si hay humanos): distribución demográfica relevante.
- [ ] **Origen de los datos**: dataset público, datos propios, encuestas, scraping.
- [ ] **Preprocesamiento**: limpieza, tokenización, normalización, augmentation.
- [ ] **Selección de subconjuntos**: qué porciones del dataset se usan y por qué.
- [ ] **Pruebas / experimentos concretos**: qué se ejecutará exactamente.
- [ ] **Métricas**: cómo se medirá el resultado.

## Dos escenarios típicos

### Escenario A — Experimento con usuarios humanos

Aplica si tu hipótesis implica medir percepción, usabilidad, preferencia, comportamiento o tarea cognitiva. Ejemplos: evaluación de UX de un chatbot, detección humana de deepfakes, encuesta sobre confianza en sistemas de IA.

**Tienes que describir**:

- **Población objetivo**: ¿quién es el público para el que el experimento es válido?
- **Tamaño muestral**: número de participantes, con justificación estadística (potencia, intervalo de confianza).
- **Distribución demográfica**: edad, género, geografía, nivel educativo, experiencia previa con IA. **No incluyas variables que no sean relevantes** — el enunciado dice "siempre que sea relevante".
- **Criterios de inclusión/exclusión**: por ejemplo, edad ≥18, hablante nativo de español, no haber participado antes.
- **Muestreo**: aleatorio, estratificado, por conveniencia (justifica). Ver [[08-glosario]] → muestreo.
- **Procedimiento**: tareas que harán los participantes, en qué orden, cuánto tiempo, instrucciones.
- **Aspectos éticos**: consentimiento informado, anonimización, datos sensibles.

### Escenario B — Experimento sobre dataset (sin usuarios)

Aplica si tu hipótesis es sobre el desempeño de un algoritmo. Ejemplos: comparar arquitecturas de red, evaluar un nuevo método de regularización, benchmarking de LLMs.

**Tienes que describir**:

- **Dataset(s)**: nombre, autor, año, fuente, tamaño, licencia, idioma si aplica.
- **Características del dataset**: número de clases, balance, dimensión de features, posibles sesgos del dataset (geográficos, temporales, demográficos).
- **Preprocesamiento**: tokenización, normalización numérica, manejo de nulos, augmentation.
- **Partición**: train / val / test (ver [[05-req-3-train-val]]).
- **Procedimiento experimental**: qué modelos, qué hiperparámetros, semillas aleatorias, hardware, frameworks (PyTorch / TensorFlow / sklearn versión X).
- **Métricas**: accuracy, F1, BLEU, ROUGE, AUROC, perplexity, latencia — la que tenga sentido para tu tarea.
- **Análisis estadístico**: pruebas de significancia (t-test pareado, McNemar, bootstrap) para comparar con baseline.

## Plantilla de sección de metodología

```markdown
## 3. Metodología

### 3.1. Diseño experimental
Tipo de estudio: [experimental | cuasi-experimental | observacional].
Variable independiente: [X].
Variables dependientes: [Y₁, Y₂].
Variables de control: [Z₁, Z₂].

### 3.2. Datos / Participantes
[Origen, tamaño, características, preprocesamiento o demografía y muestreo.]

### 3.3. Procedimiento
[Pasos concretos del experimento, en orden, con suficiente detalle para replicación.]

### 3.4. Métricas y análisis
[Métricas seleccionadas y por qué; análisis estadístico planeado.]

### 3.5. Control de amenazas a la validez
[Sesgos esperables y mitigación.]
```

## Sesgos a anticipar (importante para Criterio 3 — 40%)

El enunciado menciona explícitamente "evitación de sesgos" en la rúbrica. Lista los **sesgos relevantes** y di cómo los vas a controlar:

| Sesgo | Cómo controlarlo |
|---|---|
| Selección | Muestreo aleatorio / estratificado |
| Confirmación | Pre-registrar la hipótesis y métricas antes de ver datos |
| Sobreajuste | Usar val/test separados; no tunear hiperparámetros sobre test |
| Dataset shift | Validar en datos fuera de distribución |
| Anotador | Múltiples anotadores + acuerdo (Cohen's kappa) |
| Publicación | Reportar resultados negativos también |

Ver [[08-glosario]] → sesgos.

## Errores comunes

1. **Decir solo "usaremos un dataset"** sin nombrarlo ni describirlo.
2. **Omitir el tamaño muestral** o no justificarlo.
3. **No mencionar el preprocesamiento** (cómo se limpiaron datos).
4. **Inventar números** ("encuestaremos a 1,000 personas") sin explicar de dónde salen.
5. **Mezclar metodología con resultados** — aquí solo describes el plan; no inventes resultados.

## Conceptos relacionados

- [[05-req-3-train-val]] — partición train/val/test (sub-tema dentro de metodología).
- [[08-glosario]] → población, muestra, muestreo, sesgo, validación cruzada.
- [[07-rubrica-explicada]] → Criterio 3 evalúa principalmente esta sección.

---

**Anterior:** [[03-req-1-hipotesis]] · **Siguiente:** [[05-req-3-train-val]]
