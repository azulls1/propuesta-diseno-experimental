---
title: "Corrección autónoma de trayectoria para la intercepción de asteroides peligrosos"
subtitle: "Guiado por aprendizaje por refuerzo vs navegación proporcional aumentada — Propuesta de diseño experimental"
author: "Adonai Samael Hernández Mata (azulls1) · azull.samael@gmail.com"
date: "Maestría en IA · Investigación en Inteligencia Artificial · Actividad 1 · Junio 2026"
lang: es
documentclass: article
---

# 1. Introducción y motivación

La defensa planetaria ante objetos cercanos a la Tierra (NEOs) potencialmente peligrosos dejó de ser teórica: en septiembre de 2022 la misión **DART** de la NASA impactó el asteroide Dimorphos y midió una alteración real de su órbita —una reducción de 2.70 ± 0.10 mm/s en su velocidad orbital, con un factor de transferencia de momento *beta* entre 2.2 y 4.9 [1]—, demostrando que un impactador cinético es una estrategia de mitigación viable. Sin embargo, durante la **fase terminal de aproximación** el retardo de la señal Tierra–sonda (minutos) impide el control desde tierra: el guiado debe ser **autónomo y recalcularse a bordo en tiempo real**.

Los métodos clásicos de guiado —navegación proporcional y control óptimo basado en el problema de Lambert— son precisos, pero asumen una dinámica conocida y, bajo incertidumbre realista (masa y forma del objetivo desconocidas, gravedad multicuerpo, presión de radiación solar, ruido de sensores), pierden robustez o resultan computacionalmente costosos para ejecutarse a bordo. Trabajos recientes aplican **aprendizaje por refuerzo (RL)** al guiado de naves, con resultados prometedores en operaciones de proximidad a asteroides [2] y un creciente cuerpo de investigación en guiado y control basado en IA [3]. No obstante, persiste un hueco: **no existe una comparación cuantitativa y estadísticamente rigurosa entre el guiado aprendido y el clásico, bajo incertidumbre realista, para la intercepción de cuerpos pequeños**. Esta propuesta diseña —sin ejecutarlo— ese experimento controlado y reproducible.

# 2. Hipótesis

**H1 (alternativa):** Un controlador de guiado basado en aprendizaje por refuerzo (política recurrente meta-entrenada) reducirá la **distancia de fallo** (*miss distance*) media en la intercepción terminal de un cuerpo pequeño en **al menos 30 %** respecto al guiado clásico por **navegación proporcional aumentada (APN)**, bajo incertidumbre en la masa del objetivo, perturbaciones de gravedad multicuerpo, presión de radiación solar y ruido de medición, evaluado con prueba pareada (α = 0.05).

**H0 (nula):** No existe diferencia estadísticamente significativa (*p* > 0.05) en la distancia de fallo media entre el controlador aprendido y el guiado clásico APN sobre el mismo conjunto de escenarios.

**Variables:**

- *Variable independiente*: estrategia de guiado (APN clásico vs RL aprendido).
- *Variable dependiente*: distancia de fallo (m), con métricas de soporte $\Delta v$ (coste de maniobra) y latencia de cómputo.
- *Variables de control*: simulador y su versión, efemérides, semilla aleatoria, paso de integración, hardware de cómputo, horizonte temporal de la maniobra.

**Criterio explícito de refutación:** la hipótesis se considerará **refutada** si, sobre el conjunto de escenarios de prueba, la reducción media de la distancia de fallo es **menor a 30 %** *o* si la prueba de Wilcoxon pareada arroja *p* ≥ 0.05; en ese caso aceptaríamos H0.

# 3. Metodología

## 3.1. Diseño experimental

Estudio **experimental controlado** de tipo cuantitativo mediante **simulación Monte Carlo**. La unidad de análisis es un *escenario de intercepción*. Se compara la variable dependiente entre las condiciones de guiado aplicadas sobre los **mismos escenarios** (diseño pareado), aislando el efecto de la estrategia de guiado.

## 3.2. Escenarios, datos y muestreo

No se emplea un dataset descargable: los escenarios se generan con un **simulador de dinámica de N cuerpos de alta fidelidad**. Cada escenario muestrea los parámetros del asteroide objetivo —masa, tamaño, geometría y velocidad de aproximación— de distribuciones **ancladas en el catálogo real JPL Small-Body Database** de NEOs conocidos. Las perturbaciones modeladas incluyen gravedad de terceros cuerpos (Sol y planetas, vía efemérides DE440), presión de radiación solar y un modelo de ruido de sensores sobre la posición y velocidad relativas. El tamaño objetivo es de **10 000 escenarios**, suficiente para estimaciones de alta precisión (ver §3.5). La **representatividad** del conjunto frente a la población real de NEOs se verifica comparando las distribuciones muestreadas con el catálogo mediante una prueba de Kolmogorov–Smirnov (se exige *p* > 0.05, no se rechaza igualdad). El simulador, los parámetros y las semillas se liberan para auditoría bajo licencia abierta.

## 3.3. Conjuntos de entrenamiento y validación

La política RL se entrena sobre un subconjunto de escenarios y se valida en otro; el conjunto de **prueba se reserva con una distribución desplazada** —tipos y tamaños de asteroide **no vistos** en entrenamiento— para medir generalización **fuera de distribución (OOD)**. El *split* es **70/15/15 estratificado por dificultad** (velocidad de aproximación y nivel de incertidumbre), con semilla `42` y **5-fold cross-validation** sobre train + val. El conjunto de prueba permanece intocado durante todo el desarrollo.

## 3.4. Procedimiento experimental

1. **Generación** de escenarios (muestreo de parámetros + perturbaciones).
2. **Baselines**: balística sin corrección, navegación proporcional (PN), navegación proporcional aumentada (APN) y control óptimo (Lambert + optimización convexa).
3. **Entrenamiento RL**: política recurrente optimizada con PPO [4] y meta-aprendizaje, sobre cinco semillas distintas.
4. **Validación** y ajuste de hiperparámetros únicamente sobre *val*.
5. **Evaluación** en el conjunto de prueba intocado; se reporta media ± desviación estándar.
6. **Registro** de distancia de fallo, $\Delta v$, tasa de éxito y latencia de cómputo.
7. **Pruebas estadísticas**: Wilcoxon pareado (α = 0.05) con corrección de Holm para comparaciones múltiples.

Entorno: GPU NVIDIA A100, simulador con versión fijada y efemérides DE440; todos los hiperparámetros (tasa de aprendizaje, arquitectura recurrente, pasos por episodio) se documentan para reproducibilidad.

## 3.5. Métricas y análisis estadístico

La métrica principal es la **distancia de fallo** (m). Como soporte se reportan el **coste de maniobra** $\Delta v$ (eficiencia), la **tasa de éxito** (% de escenarios con fallo menor al umbral operacional) y la **latencia de cómputo** (viabilidad de recálculo en tiempo real a bordo). La comparación entre métodos se realiza mediante **Wilcoxon signed-rank pareado** sobre los escenarios, con **corrección de Holm** dado que se compara contra cuatro baselines; los intervalos de confianza del 95 % se estiman vía *bootstrap* no paramétrico (*n* = 1 000). **Suficiencia y potencia muestral:** con 10 000 escenarios pareados, el margen del IC 95 % para la distancia de fallo es muy estrecho, de modo que la reducción objetivo de 30 % supera con holgura el mínimo efecto detectable; un análisis de potencia *a priori* (α = 0.05, potencia = 0.80) confirma que el tamaño disponible es más que suficiente para validar o refutar H1.

## 3.6. Control de sesgos y amenazas a la validez

- **Brecha simulación→realidad (*sim2real*)**: principal amenaza a la validez externa; se mitiga con *randomización de dominio* y modelos de perturbación calibrados contra datos de misiones reales (DART [1]).
- **Desplazamiento de distribución**: el conjunto de prueba OOD mide explícitamente la generalización a asteroides no vistos, evitando sobreestimar el desempeño.
- **Sobreajuste y *reward hacking* del RL**: función de recompensa auditada, conjunto de prueba intocado y promedio sobre cinco semillas para estimar la varianza.
- **Representatividad de la población de escenarios**: muestreo anclado al catálogo JPL; si un tipo de objeto domina la muestra, se documenta como límite de validez externa.
- **Reproducibilidad**: se publican semillas, versión del simulador, efemérides e hiperparámetros, de modo que un tercero pueda replicar el experimento solo con el documento.
- **Sin sujetos humanos**: el objeto de estudio es una simulación física; no aplican consideraciones éticas de participantes ni sesgo demográfico.

# 4. Comparación con otras técnicas

Se evalúa la propuesta frente a cuatro *baselines* bajo idénticas condiciones de escenario, métricas y presupuesto computacional. Los valores esperados se reportan como rangos plausibles a partir de la literatura citada [2, 3]; el valor final se computará en el experimento. La **Tabla 1** resume la configuración.

**Tabla 1.** Configuración de baselines y desempeño esperado (distancia de fallo relativa; menor es mejor).

| Método                                              | Tipo            | Fallo relativo esperado |
|-----------------------------------------------------|-----------------|-------------------------|
| Balística sin corrección                            | Trivial         | 1.00 (referencia)       |
| Navegación proporcional (PN)                        | Clásico         | 0.45 – 0.60             |
| Navegación proporcional aumentada (APN)             | Clásico fuerte  | 0.30 – 0.45             |
| Control óptimo (Lambert + convexo)                  | Estado del arte | 0.20 – 0.30             |
| **Guiado RL meta-aprendido (esta propuesta)**       | **Propuesto**   | **≤ 0.21**              |

**Condiciones de comparación justa**: mismos escenarios de prueba intocados, mismas métricas, mismas cinco semillas, mismo presupuesto de cómputo a bordo y mismo modelo de perturbaciones. Las diferencias se evalúan con la prueba **Wilcoxon signed-rank pareada** y corrección de Holm. Nótese que el control óptimo clásico, aun siendo preciso, exige un coste computacional que puede ser inviable para el recálculo en tiempo real a bordo —ventaja potencial del enfoque aprendido que también se mide (latencia).

# 5. Resultados esperados y discusión

Si la hipótesis se confirma —reducción de la distancia de fallo ≥ 30 % con *p* < 0.01 tras corrección de Holm y latencia compatible con operación a bordo—, la implicación es que una política aprendida puede absorber la incertidumbre de masa y las perturbaciones mejor que el guiado clásico, ofreciendo intercepción más robusta sin un solucionador óptimo costoso. La contribución sería un **banco de escenarios de intercepción reproducible** y una política de guiado de licencia abierta para investigación en defensa planetaria.

Si la hipótesis se refuta —reducción menor a 30 % o *p* ≥ 0.05—, la implicación práctica es que el guiado clásico APN u óptimo sigue siendo preferible, y que los cuellos de botella del enfoque aprendido son la brecha *sim2real* y la generalización fuera de distribución, no la capacidad del modelo. En cualquier caso, reportar todas las semillas (incluido el resultado negativo) mantiene el valor informativo del estudio, y el banco de escenarios servirá como base para investigación posterior.

# 6. Referencias

[1] Cheng, A. F., Agrusa, H. F., Barbee, B. W., *et al.* (2023). *Momentum transfer from the DART mission kinetic impact on asteroid Dimorphos*. Nature, 616, 457–460.

[2] Gaudet, B., Linares, R., & Furfaro, R. (2020). *Terminal adaptive guidance via reinforcement meta-learning: Applications to autonomous asteroid close-proximity operations*. Acta Astronautica, 171, 1–13.

[3] Izzo, D., Märtens, M., & Pan, B. (2019). *A survey on artificial intelligence trends in spacecraft guidance dynamics and control*. Astrodynamics, 3(4), 287–299.

[4] Schulman, J., Wolski, F., Dhariwal, P., Radford, A., & Klimov, O. (2017). *Proximal Policy Optimization Algorithms*. arXiv:1707.06347.

[5] Gaudet, B., Linares, R., & Furfaro, R. (2020). *Adaptive guidance and integrated navigation with reinforcement meta-learning*. Acta Astronautica, 169, 180–190.
