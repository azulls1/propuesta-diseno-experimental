# 06 — Requisito 4: Comparación con otras técnicas o estudios

## Lo que dice el enunciado

> "Comparación con otras técnicas o con otros estudios, que se va a realizar."

Es la frase más breve del enunciado, pero **es la pieza que convierte una propuesta en un experimento de investigación**. Sin comparación, no hay forma de saber si tu resultado es bueno.

## Por qué importa

Cualquier número absoluto carece de significado sin un punto de referencia. Si dices "mi modelo tiene F1=0.85", la pregunta inmediata es: **¿comparado con qué?**

- ¿Con un clasificador aleatorio? (F1≈0.5 si dos clases balanceadas)
- ¿Con la mayoría? (F1 alto si hay desbalance, pero sin valor)
- ¿Con el estado del arte? (F1=0.92 publicado por otro grupo)
- ¿Con una versión previa? (mejora incremental)

Tu hipótesis dice "mejorará el resultado" — necesariamente implica un **baseline** frente al cual mejoras. Si no defines ese baseline, la hipótesis no es verificable.

## Dos formas de comparación

### A — Comparación con otras técnicas (baselines)

Aquí ejecutarías varios métodos en tu propio experimento y los compararías.

**Tipos de baselines a considerar**:

| Tipo | Ejemplo |
|---|---|
| **Baseline trivial** | Clasificador aleatorio, predicción de la clase mayoritaria |
| **Baseline clásico** | Regresión logística, SVM, random forest |
| **Baseline competitivo** | Modelo bien establecido para la tarea (BERT, ResNet, XGBoost) |
| **Baseline ablativo** | Tu mismo método sin alguna componente, para medir el aporte de cada parte |
| **Estado del arte** | El mejor método publicado en esa tarea/dataset |

**Recomendación**: incluye al menos un baseline trivial + uno competitivo + uno ablativo. Tres baselines bien justificados > diez baselines mal elegidos.

### B — Comparación con otros estudios (referencia bibliográfica)

Aquí comparas tus *resultados esperados* con los **resultados ya publicados** sobre el mismo dataset o tarea.

**Cómo se hace bien**:
- Identifica 3-5 papers que aborden la misma tarea o un problema cercano.
- Lista sus métricas reportadas (en una tabla).
- Indica qué de su metodología vas a replicar (uso del mismo dataset, mismas métricas) para que la comparación sea **justa**.
- Reconoce las diferencias (si las hay) y por qué tu comparación sigue siendo válida.

## Cómo presentar la comparación en tu documento

### Opción 1: tabla de baselines planificados

```
| Método           | Tipo                | Justificación de inclusión              |
|------------------|---------------------|-----------------------------------------|
| Random           | Trivial             | Suelo absoluto                          |
| Logistic Regression | Clásico          | Baseline ligero, interpretable          |
| BERT-base        | Estado del arte     | Modelo dominante en NLP                 |
| Ours w/o module X| Ablación            | Aislar contribución del módulo X        |
```

### Opción 2: tabla de referencia bibliográfica

```
| Estudio                | Dataset    | Métrica reportada | Métrica que replicaremos |
|------------------------|------------|-------------------|--------------------------|
| Smith et al. 2022      | DatasetA   | F1=0.78           | F1 (macro)               |
| López et al. 2023      | DatasetA   | F1=0.81           | F1 (macro)               |
| Wang et al. 2024 (SOTA)| DatasetA   | F1=0.85           | F1 (macro)               |
```

## Comparación justa — condiciones que tienes que defender

Para que la comparación sea **honesta** y aporte valor científico:

- [ ] Mismo dataset (o subconjunto explícitamente comparable).
- [ ] Mismas métricas (definidas igual — F1 macro ≠ F1 micro).
- [ ] Mismas particiones (si están disponibles públicamente).
- [ ] Mismo presupuesto computacional (no comparar un modelo entrenado 100h con uno entrenado 1h sin notarlo).
- [ ] Reportar varianza (si el baseline tiene varianza alta entre semillas, una sola corrida no basta).
- [ ] Pruebas estadísticas de significancia (no basta con "es 1% mejor").

## Pruebas estadísticas para comparar dos métodos

Si comparas tu método con un baseline, no basta con decir "es mejor porque el número es más alto". Necesitas:

- **Pruebas pareadas**: t-test pareado, Wilcoxon signed-rank, McNemar (clasificación binaria).
- **Bootstrap**: para intervalos de confianza de la métrica.
- **Múltiples comparaciones**: si comparas con varios baselines, corrige (Bonferroni, Holm).

Especifica en tu documento qué prueba usarás y con qué nivel de significancia (típicamente α=0.05).

## Errores comunes

1. **Comparar con un solo baseline trivial** y declarar victoria.
2. **Comparar contra baselines mal sintonizados** (no haces tuning del baseline pero sí del tuyo).
3. **No replicar las condiciones** del estudio con el que comparas (datasets distintos pero "parecidos").
4. **Olvidar las pruebas de significancia**.
5. **Citar SOTA pero no replicarlo en tu experimento**, comparándolo solo con los números del paper original (que pueden haberse obtenido en condiciones distintas).

## Conceptos relacionados

- [[03-req-1-hipotesis]] → la hipótesis define qué se compara con qué.
- [[08-glosario]] → baseline, estado del arte, significancia estadística.
- [[07-rubrica-explicada]] → la comparación nutre el Criterio 3 (rigor).

---

**Anterior:** [[05-req-3-train-val]] · **Siguiente:** [[07-rubrica-explicada]]
