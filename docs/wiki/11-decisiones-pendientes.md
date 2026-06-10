# 11 — Decisiones pendientes que tienes que tomar tú

Esta wiki desmenuza el enunciado, pero hay **decisiones de fondo** que solo tú puedes tomar. Listadas aquí para que las atiendas antes de empezar a escribir.

---

## Decisión 1 — ¿Qué problema vas a investigar?

El enunciado **no especifica el tema**, así que tienes libertad total dentro del campo de IA. Algunas familias de problemas viables (con ejemplos concretos):

### NLP

- Clasificación de intención en asistentes conversacionales en español.
- Resumen automático en dominio médico/legal.
- Detección de texto generado por LLMs (humano vs IA).
- Traducción automática para lenguas indígenas (náhuatl, maya, etc.) con pocos datos.
- Análisis de sesgo en LLMs frente a poblaciones latinoamericanas.

### Visión por computadora

- Detección de objetos en condiciones de baja luz.
- Clasificación de imágenes médicas con datasets pequeños.
- Detección de deepfakes.
- Reconocimiento de gestos en lengua de señas mexicana.

### ML clásico / tabular

- Predicción de deserción universitaria con features demográficas.
- Detección de fraude financiero con métodos interpretables.
- Modelos de scoring de crédito sin sesgo demográfico.

### Sistemas / Ingeniería

- Comparación de costo-efectividad: GPT-4o vs Llama-3 vs modelo pequeño fine-tuneado.
- Cuantización de modelos LLM para edge devices.
- Estudio de eficiencia energética de modelos de IA.

### IA + Humanos

- Evaluación de UX de un chatbot médico.
- Estudio de confianza de usuarios en explicaciones de IA (XAI).
- Comparación de productividad con y sin asistente de código.

### Ética / Sesgos

- Auditoría de sesgo en un sistema comercial de IA.
- Evaluación de equidad demográfica en modelos de recomendación.

**Criterios para elegir bien**:
1. ¿Te interesa? (vas a invertir tiempo).
2. ¿Hay literatura previa? (necesitas referencias).
3. ¿Hay datasets/recursos públicos? (aunque no ejecutes, debes saber de dónde sacarías los datos).
4. ¿Cabe en 5 páginas? (no elijas algo demasiado amplio).

---

## Decisión 2 — ¿Tu experimento implica humanos o solo datos?

Esta decisión **estructura toda tu metodología**:

| Eliges... | Implicaciones |
|---|---|
| **Solo datasets** | Te ahorras consideraciones éticas y de muestreo poblacional; pero debes ser muy riguroso en preprocesamiento y splits |
| **Con humanos** | Necesitas muestreo demográfico, ética, consentimiento; pero los datos son "más reales" |
| **Híbrido** | Más complejidad, mejor calidad — viable solo si tienes claro el alcance |

Recomendación práctica: para una primera actividad de Maestría, **solo datasets** suele ser más manejable.

---

## Decisión 3 — ¿Tu experimento usa Machine Learning?

Esto determina si el [[05-req-3-train-val]] aplica plenamente o no.

- **Sí, entreno o afino un modelo** → aplica todo: train/val/test, hiperparámetros, validación cruzada.
- **No, evalúo modelos pre-entrenados (LLMs por API)** → aplica parcialmente: hay test set pero no train; describe los prompts, semillas de temperatura, etc.
- **No, es un estudio observacional** → no aplica; documéntalo así.

---

## Decisión 4 — ¿Qué baselines vas a usar?

Pre-decide al menos:

- **Un baseline trivial** (random / mayoría).
- **Un baseline establecido** para tu tarea.
- **Una ablación** (tu método sin un componente clave).

Si no se te ocurren, **lee 2-3 papers de la tarea** y mira qué baselines usaron.

---

## Decisión 5 — ¿Qué métrica(s) eligirás?

La métrica debe alinearse con la hipótesis y con la naturaleza de la tarea:

- Clasificación balanceada → accuracy, F1.
- Clasificación desbalanceada → F1 macro, AUROC, AUC-PR.
- Regresión → MAE, RMSE, R².
- Generación de texto → BLEU, ROUGE, BERTScore + evaluación humana.
- Estudio con usuarios → escala Likert, tiempo de tarea, tasa de éxito.

---

## Decisión 6 — ¿Cuál es el formato de citación que usarás?

Elige **uno** y úsalo de forma consistente:

- **APA 7ª edición** (más común en ciencias sociales y educación).
- **IEEE** (más común en ingeniería y CS).

---

## Decisión 7 — ¿Trabajas solo o en equipo?

Si la actividad permite equipo, verifica las reglas de coautoría. Si es individual, asegúrate de tener tu propia lectura única del problema (no copiar la hipótesis de un compañero).

---

## Preguntas que podrías llevarle al maestro

Si tienes acceso a foros o tutorías, estas son las preguntas que valen la pena hacer:

1. ¿La portada y las referencias cuentan dentro de las 5 páginas?
2. ¿Hay alguna preferencia o restricción sobre el tema (un dominio de IA específico)?
3. ¿Se valora más una hipótesis ambiciosa pero arriesgada, o una conservadora pero sólida?
4. ¿Hay un formato de plantilla obligatorio?
5. Si el experimento involucra humanos, ¿se espera anexo con el formato de consentimiento informado?

---

## Tu próximo paso concreto

1. Anota aquí (debajo) las decisiones que tomas:
   - **Tema**:
   - **Humanos / datos**:
   - **ML sí/no**:
   - **Baselines tentativos**:
   - **Métricas**:
   - **Formato de citas**:

2. Lee 2-3 papers de tu tema en Google Scholar.
3. Comienza por el [[09-plan-redaccion]].

---

**Anterior:** [[10-checklist-final]] · **Volver al** [[README]]
