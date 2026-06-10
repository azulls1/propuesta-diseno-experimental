# 09 — Plan de redacción del documento

> El documento tiene **máximo 5 páginas**, Calibri 12, interlineado 1,5. Eso da, aproximadamente, **2000–2300 palabras útiles** descontando títulos y referencias.

## Estructura sugerida (con presupuesto de páginas)

```
1. Título + Introducción y motivación  ........... 0.75 pg
2. Hipótesis  .................................... 0.5  pg
3. Metodología  .................................. 1.75 pg
   3.1. Diseño experimental
   3.2. Datos / Participantes
   3.3. Conjuntos de entrenamiento y validación
   3.4. Procedimiento experimental
   3.5. Métricas y análisis estadístico
   3.6. Control de sesgos y amenazas a la validez
4. Comparación con otras técnicas / estudios  .... 0.75 pg
5. Resultados esperados y discusión  ............. 0.5  pg
6. Referencias  .................................. 0.75 pg
                                                   ------
                                                   ~5 pg
```

Si te ajustas, puedes recortar 5.0 (resultados esperados) y fusionar con 4.

---

## Sección 1 — Introducción y motivación

**Estructura interna sugerida**: 3-4 párrafos.

- **Párrafo 1**: contexto general del problema. ¿Por qué este tema es relevante en IA hoy?
- **Párrafo 2**: estado del arte breve. ¿Qué soluciones existen? ¿Quién las propuso?
- **Párrafo 3**: el hueco. ¿Por qué las soluciones actuales no son suficientes? ¿Qué falla?
- **Párrafo 4** (transición): "Por lo anterior, en este trabajo proponemos investigar [X], con el fin de [Y]."

Cubre **Criterio 1 (20%)**. Ver [[03-req-1-hipotesis]] piezas A y B.

---

## Sección 2 — Hipótesis

Esta sección puede ser breve pero precisa.

- Una frase de **contextualización** ("Partiendo del problema descrito...").
- **Hipótesis H1** en cursiva, en su propia línea o párrafo.
- **Hipótesis H0** (opcional, recomendado).
- **Criterio de refutación**: "La hipótesis se considerará refutada si...".

Cubre **Criterio 2 (20%)**. Ver [[03-req-1-hipotesis]] pieza C.

---

## Sección 3 — Metodología

La sección **más larga y la más importante** (Criterio 3 = 40%).

### 3.1. Diseño experimental

- Tipo de estudio: experimental controlado / cuasi-experimental / observacional.
- Variables independientes, dependientes, de control.
- Diseño: entre-sujetos vs intra-sujetos (si aplica).

### 3.2. Datos / Participantes

Según escenario (ver [[04-req-2-metodologia]]):

- Si humanos: tamaño muestral con justificación, distribución demográfica, criterios de inclusión/exclusión, muestreo, ética.
- Si dataset: nombre, tamaño, dominio, balance de clases, idioma, año, fuente, licencia, posibles sesgos del dataset.

### 3.3. Conjuntos de entrenamiento y validación

Aplica si hay ML (ver [[05-req-3-train-val]]):

- Estrategia (split fijo / k-fold / temporal / stratified).
- Proporciones (% train / val / test).
- Semilla aleatoria.
- Cómo se justifica la representatividad.

### 3.4. Procedimiento experimental

Pasos exactos para ejecutar el experimento, en orden, con suficiente detalle para que un tercero pueda replicar.

- Setup de hardware/software (versiones, frameworks).
- Para cada método a comparar: definición del modelo, hiperparámetros, criterio de selección.
- Protocolo: número de corridas, criterios de parada, tiempos.

### 3.5. Métricas y análisis estadístico

- Métricas seleccionadas, con definición y justificación.
- Pruebas estadísticas que se aplicarán.
- Nivel de significancia (α).
- Corrección por comparaciones múltiples si aplica.

### 3.6. Control de sesgos y amenazas a la validez

Sub-sección que MARCA la diferencia entre un trabajo regular y uno de Maestría. Lista:

- Sesgos esperables (de la lista en [[08-glosario]]).
- Cómo los mitigarás.
- Limitaciones reconocidas.

---

## Sección 4 — Comparación con otras técnicas o estudios

Ver [[06-req-4-comparacion]].

- Tabla de baselines con justificación de inclusión.
- O tabla de estudios previos sobre el mismo problema.
- Condiciones de la comparación (mismo dataset, métricas, etc.).
- Pruebas estadísticas para validar diferencias.

---

## Sección 5 — Resultados esperados y discusión (opcional / breve)

- Qué resultados anticipas si la hipótesis es correcta.
- Qué resultados anticipas si la hipótesis se refuta.
- Cómo cada caso contribuye al campo.

(Esta sección no está pedida explícitamente, pero ayuda a cerrar la propuesta y muestra madurez. Solo inclúyela si te alcanza el espacio.)

---

## Sección 6 — Referencias

Formato APA o IEEE — elige uno y sé consistente. Ejemplos:

**APA**:
> Gaudet, B., Linares, R., & Furfaro, R. (2020). Terminal adaptive guidance via reinforcement meta-learning: Applications to autonomous asteroid close-proximity operations. *Acta Astronautica*, 171, 1-13.

**IEEE**:
> [1] B. Gaudet, R. Linares, and R. Furfaro, "Terminal adaptive guidance via reinforcement meta-learning: Applications to autonomous asteroid close-proximity operations," *Acta Astronautica*, vol. 171, pp. 1-13, 2020.

Incluye 5-8 referencias relevantes. Más no necesariamente es mejor — calidad > cantidad.

---

## Reglas de redacción para Criterio 4 (20%)

- **Tiempo verbal consistente**: futuro para lo que se hará ("se utilizará"), o presente narrativo ("utilizamos"). No mezcles.
- **Voz**: tercera persona ("se" impersonal) o primera del plural ("nosotros"). No primera del singular en escritura científica.
- **Citas en el texto** cada vez que afirmes algo no obvio: "Smith et al. (2023) reportaron que...".
- **Tablas y figuras numeradas** con descripción ("Tabla 1. Comparación de baselines.").
- **Sin contracciones** del registro coloquial.
- **Revisa ortografía** (Word lo hace; aprovecha).
- **Una idea por párrafo**. Cada párrafo se abre con una oración tópica.

---

## Antes de entregar

Pasa por la lista de verificación de [[10-checklist-final]].

---

**Anterior:** [[08-glosario]] · **Siguiente:** [[10-checklist-final]]
