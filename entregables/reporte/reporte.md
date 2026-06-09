---
title: "Actividad 1 — Propuesta de Diseño Experimental"
subtitle: "Detección de discurso de odio en español dialectal mexicano: fine-tuning de RoBERTuito vs zero-shot XLM-RoBERTa"
author: "Samuel Hernández (azulls1)"
date: "Junio 2026"
lang: es
documentclass: article
---

\thispagestyle{empty}
\begin{center}
\vspace*{1cm}
{\Large\textbf{Maestría en Inteligencia Artificial}}\\[4pt]
{\large Asignatura: Investigación en Inteligencia Artificial · Primer semestre}\\[4pt]
{\normalsize Actividad 1 — Propuesta de diseño experimental}\\[1.6cm]

{\huge\textbf{Detección de discurso de odio}}\\[6pt]
{\huge\textbf{en español dialectal mexicano}}\\[10pt]
{\large Fine-tuning de RoBERTuito vs zero-shot XLM-RoBERTa}\\[2.5cm]

\textbf{Autor:} Samuel Hernández (azulls1)\\
\textbf{Correo:} azull.samael@gmail.com\\
\textbf{Fecha:} Junio 2026\\[6pt]
\textbf{Sitio del proyecto:} \href{https://propuesta-diseno-experimental.iagentek.com.mx}{propuesta-diseno-experimental.iagentek.com.mx}\\
\textbf{Repositorio:} \href{https://github.com/azulls1/propuesta-diseno-experimental}{github.com/azulls1/propuesta-diseno-experimental}
\end{center}
\vfill
\newpage

# 1. Introducción y motivación

Los modelos de detección de discurso de odio en español han alcanzado, en variantes peninsulares, F1-scores superiores a 0.85 sobre benchmarks como **HatEval 2019** [1]. Sin embargo, su desempeño cae sistemáticamente entre 12 y 18 puntos cuando se evalúan sobre variantes dialectales latinoamericanas, particularmente las mexicanas [2]. En México, la moderación de contenido en plataformas con mayor base de usuarios (X, TikTok, Facebook) se apoya en clasificadores entrenados predominantemente con corpus ibéricos, lo cual genera dos errores opuestos: falsos positivos al censurar expresiones culturales no agresivas (por ejemplo, el uso afectivo de "güey" o "cabrón") y falsos negativos al dejar pasar agresiones encubiertas en jerga regional.

Existen aproximaciones recientes para variantes latinoamericanas, como **RoBERTuito** [3], pero su validación se ha concentrado en el español rioplatense (Argentina, Uruguay) y no en variantes norteñas o centrales del español mexicano. Aunque parcialmente resuelto, el problema no cuenta con un *benchmark* dialectal mexicano público con anotación de hablantes nativos, ni con comparaciones estadísticamente rigurosas entre el estado del arte zero-shot y modelos afinados para esa variante. Esta propuesta busca cerrar ese hueco mediante un experimento controlado y reproducible.

# 2. Hipótesis

A partir del problema descrito, formulamos:

**H1 (alternativa):** El fine-tuning de RoBERTuito sobre un corpus anotado de 50 000 tuits en español mexicano incrementará el F1-score macro de detección de discurso de odio en al menos **8 puntos** respecto al baseline **XLM-RoBERTa-large zero-shot**, evaluado con prueba pareada (α = 0.05).

**H0 (nula):** No existe diferencia estadísticamente significativa (*p* > 0.05) entre el F1-score del modelo afinado y el del baseline zero-shot sobre el corpus dialectal mexicano.

**Variables:**

- *Variable independiente*: estrategia de entrenamiento (zero-shot vs fine-tuned).
- *Variable dependiente*: F1-score macro sobre el conjunto de test.
- *Variables de control*: semilla aleatoria, hardware (NVIDIA A100 40 GB), tasa de aprendizaje (2×10⁻⁵), tamaño de batch (32), número de épocas (3).

**Criterio explícito de refutación:** la hipótesis se considerará **refutada** si, tras ejecutar el experimento con cinco semillas aleatorias distintas, el incremento promedio en F1-score es menor a 8 puntos *o* si la prueba de Wilcoxon pareada arroja *p* ≥ 0.05; en ese caso aceptaríamos H0.

# 3. Metodología

## 3.1. Diseño experimental

Estudio **experimental controlado** de tipo cuantitativo. Se compara la variable dependiente (F1 macro) entre dos condiciones de entrenamiento aplicadas sobre la misma partición de test. La unidad de análisis es el tuit individual con etiqueta binaria (*hate* / *no-hate*).

## 3.2. Dataset y preprocesamiento

Construiremos un dataset original, *HateSpeech-MX*, a partir de la API académica de X con la consulta `lang:es place_country:MX` durante seis meses. El tamaño objetivo es de **50 000 tuits**, con un balance estimado de 30 % *hate* y 70 % *no-hate*, reflejando la prevalencia observada en muestras piloto. Cada tuit será anotado por **tres hablantes nativos** reclutados vía Prolific con filtros de nacionalidad y país de residencia. Se descartarán los tuits con acuerdo inter-anotador *κ* < 0.70 (coeficiente Cohen). El preprocesamiento sustituye URLs y menciones por *placeholders* (`[URL]`, `[USER]`) para anonimización y reducción de ruido lexical. Las anotaciones serán liberadas bajo licencia CC BY-SA 4.0; el contenido textual se distribuirá por `tweet_id` (rehidratable), conforme a los TOS de X.

## 3.3. Conjuntos de entrenamiento y validación

Se realiza un **split estratificado 70/15/15** (train/val/test) por clase y **por usuario** (no por tuit), de modo que un mismo autor jamás aparezca en dos particiones —evitando fuga por estilo idiosincrático—. La semilla aleatoria es `42`. Sobre el conjunto train + val ejecutamos **5-fold cross-validation** para estimar la varianza de la métrica. La representatividad se verifica mediante una prueba de Kolmogorov-Smirnov sobre las distribuciones de las features principales entre particiones, exigiendo *p* > 0.05 (no se rechaza igualdad). El conjunto de test permanece intocado durante el desarrollo.

## 3.4. Procedimiento experimental

1. **Recolección** de tuits con el filtro descrito.
2. **Anonimización** automática (URLs, menciones, datos personales).
3. **Anotación** triple con consenso por mayoría.
4. **Particionado** estratificado por usuario, *seed=42*.
5. **Baselines**: ejecución de XLM-RoBERTa-large *zero-shot* y de Logistic Regression sobre TF-IDF.
6. **Fine-tuning** de RoBERTuito: 3 épocas, *lr*=2×10⁻⁵, batch=32, sobre cinco semillas distintas.
7. **Evaluación** en el conjunto de test (intocado). Se reporta media ± desviación estándar.
8. **Pruebas estadísticas**: Wilcoxon pareado con α = 0.05; corrección de Holm si se compara contra múltiples baselines.

## 3.5. Métricas y análisis estadístico

La métrica principal es **F1 macro**, robusta a desbalance y alineada con la hipótesis. Como métricas de soporte se reportan AUROC, precisión y *recall* por clase. La comparación entre métodos se realiza mediante **Wilcoxon signed-rank pareado** sobre los pares de F1 obtenidos en las cinco semillas. Se aplica **corrección de Holm** dado que se compara contra cuatro baselines. Los intervalos de confianza del 95 % para F1 se estiman vía *bootstrap* no paramétrico con *n* = 1 000 resamples.

## 3.6. Control de sesgos y amenazas a la validez

- **Sesgo de selección**: el muestreo aleatorio con filtro geográfico verificable y la liberación pública de la lista de `tweet_id` permiten auditoría externa.
- **Sesgo del anotador**: la triple anotación con descarte por *κ* bajo y una ronda de consenso con un cuarto anotador experto en casos disputados mitigan la interpretación idiosincrática.
- **Sobreajuste**: el conjunto de test queda intocado; cualquier ajuste de hiperparámetros se realiza solo sobre *val*; se promedian cinco semillas para estimar la varianza.
- **Fuga de datos**: el *split* por usuario evita que el mismo autor aparezca en train y test, previniendo memorización de estilos.
- **Sesgo demográfico**: se verifica y reporta la distribución regional dentro de México (CDMX, MTY, GDL, Sur, Norte); si una región excede el 50 %, se documenta como limitación de validez externa.
- **Sesgo de publicación**: se reportan todas las semillas y, en caso de refutación, el resultado negativo —no se selecciona la mejor corrida.

# 4. Comparación con otras técnicas

Se evalúa la propuesta frente a cuatro baselines bajo las mismas condiciones de test, métricas y presupuesto computacional (≤ 4 GPU-horas por método):

| Método                                       | Tipo            | F1 esperado |
|----------------------------------------------|-----------------|-------------|
| Mayoría (clase frecuente)                    | Trivial         | ≈ 0.42      |
| Logistic Regression + TF-IDF                 | Clásico         | ≈ 0.62      |
| XLM-RoBERTa-large zero-shot                  | Estado del arte | ≈ 0.71      |
| RoBERTuito-MX (ours) sin preprocesamiento    | Ablación        | ≈ 0.78      |
| **RoBERTuito-MX (ours) con preprocesamiento**| **Propuesto**   | **≥ 0.83**  |

**Condiciones de comparación justa**: mismo *test set* intocado, métricas idénticas (scikit-learn), mismas cinco semillas, mismo presupuesto computacional, mismos hiperparámetros tuneados con el mismo protocolo sobre *val*. Las diferencias se evalúan con **Wilcoxon signed-rank** pareado y corrección de Holm.

# 5. Resultados esperados y discusión

Si la hipótesis se confirma, esperamos F1 ≥ 0.83 con *p* < 0.01 tras corrección de Holm, lo cual demostraría que el *shift* dialectal puede mitigarse con *fine-tuning* específico, sin recurrir a arquitecturas mayores. La contribución sería un *benchmark* MX reproducible y un modelo con licencia abierta.

Si la hipótesis se refuta —incremento menor a 8 puntos o *p* ≥ 0.05—, la implicación práctica es que el *shift* dialectal mexicano requiere intervenciones más profundas que el simple *fine-tuning*: posiblemente *prompt engineering*, generación de datos sintéticos vía LLM, o ajuste de arquitectura. En cualquier caso, el dataset *HateSpeech-MX* publicado servirá como base para investigación posterior.

# 6. Referencias

[1] Plaza-del-Arco, F. M., Molina-González, M. D., Ureña-López, L. A., & Martín-Valdivia, M. T. (2021). *A multi-task learning approach to hate speech detection leveraging sentiment analysis*. IEEE Access, 9, 112478-112489.

[2] Pamungkas, E. W., Basile, V., & Patti, V. (2023). *Towards multidomain and multilingual abusive language detection: a survey*. Personal and Ubiquitous Computing, 27(1), 17-43.

[3] Pérez, J. M., Furman, D. A., Alonso Alemany, L., & Luque, F. (2022). *RoBERTuito: a pre-trained language model for social media text in Spanish*. Proceedings of the Thirteenth Language Resources and Evaluation Conference (LREC).

[4] Basile, V. *et al.* (2019). *SemEval-2019 Task 5: Multilingual detection of hate speech against immigrants and women in Twitter (HatEval)*. Proceedings of the 13th International Workshop on Semantic Evaluation.

[5] Mosbach, M., Andriushchenko, M., & Klakow, D. (2021). *On the stability of fine-tuning BERT: Misconceptions, explanations, and strong baselines*. International Conference on Learning Representations (ICLR).
