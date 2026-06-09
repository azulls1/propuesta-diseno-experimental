# 02 — Análisis detallado de la "Descripción"

Vamos a desmenuzar la sección **Descripción** del enunciado en fragmentos para extraer todo lo que el maestro está pidiendo (a veces de forma implícita).

---

## Fragmento 1 — Planificación previa

> "Los experimentos científicos deben ser planificados antes de ser realizados para controlar todos los posibles problemas que puedan surgir."

**Lo que significa**: Tu documento debe **anticipar** problemas. No basta con decir "haré X"; tienes que mostrar que ya pensaste qué puede salir mal (variables de confusión, datos sesgados, métricas inapropiadas) y cómo lo vas a controlar.

**Lo que se traduce en tu doc**: en la sección de metodología, agrega un párrafo de "Control de variables y posibles amenazas a la validez".

---

## Fragmento 2 — Usuarios humanos

> "Sobre todo, si en estos experimentos intervienen usuarios humanos."

**Lo que significa**: Si tu experimento involucra personas (encuestas, anotación humana, evaluación de usabilidad, A/B tests), hay consideraciones extra:
- Consentimiento informado.
- Aspectos éticos.
- Distribución demográfica equilibrada (edad, género, geografía, etnia) — el enunciado lo menciona explícitamente más adelante.
- Tamaño muestral estadísticamente justificable.

**Lo que se traduce en tu doc**: si eliges un experimento con humanos, dedica una subsección a **población y ética**. Si no involucra humanos (p. ej. solo dataset), justifica que tu dataset no introduce sesgos demográficos.

---

## Fragmento 3 — Reproducibilidad y verificabilidad

> "Los experimentos deben ser reproducibles y verificables por terceros para poder evaluar que estos han sido rigurosos y no se han producido manipulaciones."

**Lo que significa**: Otro investigador, leyendo solo tu documento, debería poder **replicar** tu experimento sin pedirte aclaraciones. Esto es la prueba ácida del rigor.

**Lo que se traduce en tu doc**: incluir todos los detalles que un tercero necesitaría — versiones de software, hiperparámetros, semillas aleatorias, criterios de inclusión/exclusión, métricas exactas.

Ver [[08-glosario]] → **reproducibilidad** vs **replicabilidad**.

---

## Fragmento 4 — "No es necesario realizar el experimento"

> "La actividad que proponemos es el diseño de un experimento que sea verificable. Por supuesto, no es necesario realizar el experimento, nos quedaremos solo en la preparación del mismo."

**Lo que significa**: NO tienes que ejecutar nada. NO tienes que entregar código, ni resultados, ni gráficas de resultados reales. Solo **el plan**.

**Lo que NO debes hacer**: inventar resultados ficticios o aproximaciones. Eso resta credibilidad y va contra el espíritu de la actividad.

---

## Fragmento 5 — Equivalente a la sección Methods

> "Sería similar a lo que se escribiría en un artículo científico en el apartado *Methods* o Descripción o Configuración del experimento."

**Lo que significa**: tu documento se parece a esto:

```
1. Introducción / motivación  ← problema real
2. Hipótesis                  ← qué quieres demostrar
3. Metodología                ← cómo lo vas a hacer
   3.1 Datos / participantes
   3.2 Procedimiento experimental
   3.3 Métricas
   3.4 Control de variables
4. Comparación con baselines  ← qué métodos rivales evaluarás
5. Discusión / conclusiones   ← qué esperarías encontrar y cómo se interpretaría
```

Ver [[09-plan-redaccion]] para la estructura concreta.

---

## Fragmento 6 — Qué se especifica en Methods

> "...se especifica cuál ha sido la metodología llevada a cabo para realizar el experimento, cómo se ha llevado a cabo, qué decisiones se han tomado, cómo se ha preparado el entorno, los datos que se han empleado o cuáles serían las acciones que se llevarían a cabo durante el experimento."

**Checklist implícito** de lo que tienes que cubrir:

- [ ] **Metodología**: paradigma experimental (experimental vs cuasi-experimental vs observacional).
- [ ] **Procedimiento**: pasos concretos en orden.
- [ ] **Decisiones tomadas**: con justificación (por qué este algoritmo, por qué este dataset, por qué esta métrica).
- [ ] **Entorno**: hardware/software/condiciones.
- [ ] **Datos**: origen, preprocesamiento, particiones.
- [ ] **Acciones**: qué se haría paso a paso si se ejecutase el experimento.

---

## Lo que viene después en el enunciado

El enunciado luego enumera **4 requisitos explícitos** (puntos numerados). Cada uno tiene su propia página:

- [[03-req-1-hipotesis]] — hipótesis con motivación.
- [[04-req-2-metodologia]] — descripción de la metodología.
- [[05-req-3-train-val]] — conjuntos de entrenamiento/validación si aplica ML.
- [[06-req-4-comparacion]] — comparación con otras técnicas/estudios.

---

**Anterior:** [[01-objetivo]] · **Siguiente:** [[03-req-1-hipotesis]]
