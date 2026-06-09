# 08 — Glosario de conceptos clave

Los términos están agrupados por bloque temático y enlazados a la página donde más se usan.

---

## Bloque 1 — Filosofía de la ciencia y método científico

### Hipótesis

Una afirmación tentativa sobre la relación entre dos o más variables, formulada de modo que pueda ser **puesta a prueba** mediante experimentación. La hipótesis no es una creencia ni una opinión: es una predicción que se compromete a ser refutada si la evidencia es contraria.

→ Usado en [[03-req-1-hipotesis]].

### Falsabilidad

Propiedad de una hipótesis científica (definida por Karl Popper) según la cual debe ser posible **diseñar un experimento que la refute**. Si ninguna observación posible podría contradecir la hipótesis, entonces no es científica.

**Ejemplo falsable**: "Los modelos de visión convolucionales superan a los transformers para clasificación de imágenes médicas con datasets <10k ejemplos." (puede refutarse con experimentos).

**Ejemplo NO falsable**: "La IA va a transformar la medicina." (no es una hipótesis científica).

→ Usado en [[03-req-1-hipotesis]], [[07-rubrica-explicada]].

### Hipótesis nula (H0) e hipótesis alternativa (H1)

- **H0** (nula): afirma que NO hay efecto, NO hay diferencia. Es la que se rechaza o no se rechaza.
- **H1** (alternativa): la afirmación que tu experimento busca apoyar.

Notación típica:
> H0: μ_A = μ_B (no hay diferencia entre métodos A y B)
> H1: μ_A ≠ μ_B (hay diferencia)

→ Usado en [[03-req-1-hipotesis]], [[06-req-4-comparacion]].

### Reproducibilidad vs replicabilidad

Términos a menudo confundidos:

- **Reproducibilidad**: otro investigador, **con los mismos datos y código**, obtiene los mismos resultados.
- **Replicabilidad**: otro investigador, **con datos nuevos pero metodología idéntica**, obtiene resultados consistentes.

La crisis de replicabilidad en ML/IA es bien conocida. Tu documento debe favorecer ambas (compartir semillas, datasets, código).

→ Usado en [[02-descripcion-detallada]].

---

## Bloque 2 — Variables del experimento

### Variable independiente (VI)

Lo que **tú manipulas** en el experimento. En IA, típicamente: el algoritmo, hiperparámetros, técnica de preprocesamiento.

### Variable dependiente (VD)

Lo que **tú mides** como resultado. La métrica de evaluación (accuracy, F1, latencia, satisfacción del usuario).

### Variables de control

Las que **mantienes constantes** entre condiciones experimentales para que la única diferencia sea la VI. Ejemplo: misma seed aleatoria, mismo hardware, mismo dataset.

### Variables de confusión (confounders)

Variables que **no controlas** y que pueden afectar la VD haciendo creer que el efecto viene de la VI. Cazar confounders es parte central del diseño experimental.

→ Usado en [[04-req-2-metodologia]].

---

## Bloque 3 — Población y muestreo

### Población

El conjunto **total** sobre el que quieres concluir. Ejemplo: "todos los hablantes de español en Latinoamérica", "todas las imágenes radiográficas de tórax".

### Muestra

El subconjunto de la población que efectivamente observas. La validez de tus conclusiones depende de qué tan **representativa** es la muestra.

### Muestreo

El procedimiento para obtener la muestra. Tipos:

- **Aleatorio simple**: cada elemento con igual probabilidad.
- **Estratificado**: divides en estratos (grupos homogéneos) y muestreas dentro de cada uno.
- **Por conglomerados (clusters)**: muestreas grupos completos.
- **Sistemático**: cada k-ésimo elemento.
- **Por conveniencia**: el más accesible. Sesgado, evitar si se puede.

### Tamaño muestral

Número de observaciones. Determina la **potencia estadística** (capacidad de detectar un efecto real) y el **intervalo de confianza** de tus estimaciones. Cálculos disponibles vía test de potencia (G*Power, statsmodels).

→ Usado en [[04-req-2-metodologia]], [[05-req-3-train-val]].

---

## Bloque 4 — Sesgos

### Sesgo

Cualquier desviación sistemática (no aleatoria) que distorsiona la inferencia. Tipos relevantes en IA:

| Sesgo | Definición | Cómo mitigarlo |
|---|---|---|
| **Selección** | La muestra no representa la población | Muestreo aleatorio o estratificado |
| **Confirmación** | Buscas evidencia que confirma tu hipótesis | Pre-registrar hipótesis y métricas |
| **Anotador** | Etiquetas inconsistentes entre anotadores | Múltiples anotadores + kappa |
| **Sobreajuste (overfitting)** | Modelo memoriza el train | Validation set, regularización |
| **Dataset shift** | Distribución de test ≠ distribución de despliegue | Validar OOD |
| **Demográfico** | Subrepresentación de grupos | Estratificación por grupo |
| **Survivorship** | Solo ves los "supervivientes" del proceso | Considerar la población completa |
| **Publicación** | Solo se publica lo que funciona | Reportar negativos |

→ Usado en [[04-req-2-metodologia]], [[07-rubrica-explicada]].

### Validez interna

Grado en que el experimento mide realmente la relación que pretende medir, libre de confounders.

### Validez externa

Grado en que los resultados se generalizan a otras poblaciones, contextos o tiempos.

### Validez de constructo

Grado en que las variables medidas realmente capturan el concepto teórico que quieres estudiar (¿la métrica F1 captura realmente "calidad del modelo"?).

### Validez estadística

Si las pruebas estadísticas son apropiadas, con potencia suficiente, sin múltiples comparaciones no corregidas.

---

## Bloque 5 — Aprendizaje automático

### Dataset

Conjunto estructurado de ejemplos para entrenar/evaluar modelos. Atributos a documentar: tamaño, dominio, número de clases, balance, idioma, año, licencia.

### Train / Validation / Test

- **Train**: para ajustar parámetros del modelo.
- **Validation**: para tunear hiperparámetros y elegir modelo.
- **Test**: para reportar la métrica final, intocado durante desarrollo.

→ Usado en [[05-req-3-train-val]].

### Cross-validation (k-fold)

Técnica que divide el dataset en k partes; entrenas k veces, cada vez usando k-1 partes para train y 1 para val. Estima mejor la varianza de la métrica.

### Fuga de datos (data leakage)

Información del test/val que se filtra al train (directa o indirectamente). Inflar resultados sin saberlo. Evitar: normalizar con stats del train solo; split por sujeto si hay agrupación; sin tunear sobre test.

### Baseline

Método de referencia con el que comparas tu propuesta. Trivial (random/mayoría), clásico (logistic regression), o competitivo (BERT, ResNet).

→ Usado en [[06-req-4-comparacion]].

### Estado del arte (SOTA, State-of-the-art)

El mejor resultado publicado actualmente para una tarea/dataset dado. Tu propuesta debería compararse contra al menos un SOTA si pretendes contribución.

---

## Bloque 6 — Estadística

### Métrica

Función que cuantifica el desempeño. Ejemplos:
- **Clasificación**: accuracy, precision, recall, F1 (macro, micro, weighted), AUROC, AUC-PR.
- **Regresión**: MAE, MSE, RMSE, R².
- **Generación**: BLEU, ROUGE, BERTScore, perplexity.
- **Ranking**: MAP, MRR, NDCG.
- **Sistemas**: latencia, throughput, costo por inferencia.

### Significancia estadística

Probabilidad de que un resultado observado se deba al azar. Convencionalmente, p < 0.05 se considera "significativo" — pero esto es una convención, no una verdad.

### Pruebas estadísticas comunes

| Prueba | Cuándo usar |
|---|---|
| t-test pareado | Comparar dos métodos sobre los mismos ejemplos (asumiendo normalidad) |
| Wilcoxon signed-rank | Como t-test pareado pero sin asumir normalidad |
| McNemar | Comparar dos clasificadores binarios |
| Friedman / Nemenyi | Comparar múltiples métodos sobre múltiples datasets |
| Bootstrap | Intervalos de confianza no paramétricos |

### Corrección por múltiples comparaciones

Si haces N pruebas con α=0.05, la probabilidad de un falso positivo aumenta. Correcciones: Bonferroni (α/N), Holm, FDR.

→ Usado en [[06-req-4-comparacion]].

---

## Bloque 7 — Aspectos éticos (si involucras humanos)

### Consentimiento informado

Proceso por el cual los participantes son informados del propósito, riesgos, beneficios y derecho a retirarse, antes de participar.

### Anonimización

Eliminación o transformación de datos personales para que no sea posible identificar al individuo.

### Comité de ética / IRB

En investigación con humanos, suele requerirse aprobación previa de un comité institucional. Menciónalo si aplica.

---

**Anterior:** [[07-rubrica-explicada]] · **Siguiente:** [[09-plan-redaccion]]
