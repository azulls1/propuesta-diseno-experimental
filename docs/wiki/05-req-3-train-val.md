# 05 — Requisito 3: Conjuntos de aprendizaje y validación

## Lo que dice el enunciado

> "Si se utiliza algún algoritmo de aprendizaje automático habrá que tener un conjunto de datos de aprendizaje y otro de validación. ¿Cómo se han seleccionado ambos conjuntos? ¿Cómo se ha llevado a cabo el muestreo? ¿Son representativos?"

## Cuándo aplica este requisito

Aplica **solo si tu experimento involucra aprendizaje automático** (entrenar un modelo). Si tu experimento es:

- Una encuesta a usuarios humanos → este punto **no aplica**, pero menciónalo brevemente en tu documento para que el maestro vea que lo consideraste y lo descartaste con razón ("No aplica porque el experimento no implica entrenamiento de modelos").
- Un benchmark sobre dataset con modelo pre-entrenado fijo → **aplica parcialmente** (sigue habiendo conjunto de test/validación, aunque no de entrenamiento).
- Un entrenamiento de modelo desde cero o fine-tuning → **aplica completamente**.

## Las tres preguntas que tienes que responder

### Pregunta 1: ¿Cómo se han seleccionado ambos conjuntos?

Tienes varias estrategias estándar. Justifica cuál elegirás y por qué:

| Estrategia | Cuándo usar | Riesgo principal |
|---|---|---|
| **Split fijo** (p. ej. 80/10/10) | Datasets grandes, suficiente para una sola partición | Alta varianza si el dataset es pequeño |
| **K-fold cross-validation** | Datasets medianos; queremos estimar varianza | Costoso computacionalmente |
| **Leave-one-out (LOOCV)** | Datasets muy pequeños | Muy lento, alta varianza |
| **Stratified split** | Clases desbalanceadas | Requiere conocer la variable estratificadora |
| **Temporal split** | Datos con dependencia temporal (series, eventos) | No usar nunca un random split aquí |
| **Group/subject split** | Datos agrupados por entidad (mismos sujetos, mismos pacientes) | Si no agrupas, hay fuga de datos |

**Tu documento debe especificar**:
- Qué estrategia exacta.
- Qué proporciones (% train / % val / % test).
- Semilla aleatoria (para reproducibilidad).
- Si hay estratificación, sobre qué variable.

### Pregunta 2: ¿Cómo se ha llevado a cabo el muestreo?

Esto se refiere al **mecanismo concreto** de obtención de la muestra:

- **Aleatorio simple**: cada elemento tiene igual probabilidad.
- **Estratificado**: divides la población en estratos y muestreas dentro de cada uno (útil para preservar balance de clases o demográfico).
- **Por conglomerados (cluster sampling)**: muestreas grupos enteros (p. ej. todos los tuits de ciertos usuarios).
- **Sistemático**: cada k-ésimo elemento.
- **Por conveniencia**: lo más accesible (sesgado, evitar si es posible).

**Importante para Criterio 3**: el maestro evalúa la **calidad del muestreo**. Justifica por qué tu elección controla mejor los sesgos.

### Pregunta 3: ¿Son representativos?

Esta es la pregunta clave para la **validez externa** del experimento.

Tu validation set es representativo si:
- Refleja la **misma distribución** que el train set en variables de interés.
- Refleja la **distribución del mundo real** donde se desplegará el modelo (si difiere del train, es *covariate shift*).
- Tiene **suficiente tamaño** para estimar las métricas con baja varianza (rule of thumb: ≥1000 ejemplos por clase para clasificación robusta, depende del problema).

**Cómo lo justificas en el documento**:
- Compara estadísticas descriptivas de train vs val (media, varianza, distribución de clases).
- Si hay desbalance, menciona métricas robustas a desbalance (F1 macro, AUROC, no solo accuracy).
- Si la población objetivo del modelo en producción es distinta, advierte sobre la limitación de generalización.

## Conceptos críticos para no equivocarse

### Fuga de datos (data leakage)

El error más castigado en revisiones de papers. Ocurre cuando información del test set entra (directa o indirectamente) en el entrenamiento. Ejemplos:

- Normalizar con la media de **todo** el dataset (usa solo media del train).
- Tuning de hiperparámetros sobre el test set (usa val, deja test intocado).
- Datos del mismo sujeto en train y test (split por sujeto, no por muestra).
- Features temporales que incluyen información del futuro.

### Train / Validation / Test — la diferencia

Confundirlos es un error grave de rigor:

| Conjunto | Para qué se usa | ¿Se "ve"? |
|---|---|---|
| **Train** | Ajustar parámetros del modelo (pesos) | Sí, muchas veces |
| **Validation** | Seleccionar hiperparámetros, decidir early stopping, comparar arquitecturas | Sí, varias veces |
| **Test** | Reportar la métrica final del paper | Una sola vez, al final |

Si solo tienes train y val, **al menos llámalos correctamente** y reconoce que no hay un test set independiente (limitación a mencionar).

## Plantilla para esta sección de tu documento

```markdown
### 3.x. Selección de conjuntos de entrenamiento y validación

Partimos del dataset [D] con N=[número] ejemplos. Aplicamos una división
estratificada por [variable] con proporciones 70/15/15 para train/val/test
respectivamente. La estratificación garantiza que la distribución de clases
en cada partición refleje la del dataset completo.

El muestreo es aleatorio simple dentro de cada estrato, con semilla 42 para
reproducibilidad. Verificamos representatividad mediante la prueba de
Kolmogorov-Smirnov sobre las distribuciones de las features principales,
buscando que p > 0.05 (no rechazo de la hipótesis de igualdad de
distribuciones).

Para entrenamientos finales reportaremos resultados con 5-fold cross-validation
sobre el conjunto train+val, dejando test intocado hasta el reporte final, para
estimar la varianza de la métrica.
```

## Errores comunes

1. **No especificar la semilla aleatoria** → experimento no reproducible.
2. **Usar test set para validar** → estimación optimista del rendimiento.
3. **Hacer split aleatorio cuando hay dependencia** (series temporales, mismos pacientes).
4. **Olvidar el balanceo de clases**.
5. **No justificar las proporciones** ("usamos 80/20" — ¿por qué?).

## Conceptos relacionados

- [[04-req-2-metodologia]] → este requisito es un sub-tema dentro de metodología.
- [[08-glosario]] → muestreo, sesgo de selección, fuga de datos, cross-validation.
- [[07-rubrica-explicada]] → "calidad del muestreo" es parte explícita del Criterio 3.

---

**Anterior:** [[04-req-2-metodologia]] · **Siguiente:** [[06-req-4-comparacion]]
