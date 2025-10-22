# Prueba Técnica RPA - Mission SAS
## Descripción
Este proyecto tiene como objetivo automatizar la recolección de datos climáticos, de tipo de cambio
y de hora de diversas ciudades para generar alertas y reportes interactivos. La solución es parte de
la prueba técnica para el puesto de Ingeniero de Automatización RPA en **Mission SAS**.
### Objetivos del Proyecto
- **Automatización de tareas repetitivas**: Recolección de datos de APIs públicas (clima, tipo de
cambio, hora).
- **Generación de alertas**: Alertas basadas en umbrales de datos (temperatura, viento,
precipitación, etc.).
- **Visualización de datos**: Dashboard interactivo con Looker Studio, mostrando la evolución de
los datos en formato visual (gráficos, tablas).
---
## Arquitectura de la Solución
La solución está compuesta por varios módulos que interactúan entre sí para extraer, procesar y
mostrar los datos de manera eficiente. La arquitectura modular permite la fácil expansión y
mantenimiento del sistema. Los principales componentes son:
1. **Extracción de Datos**: Se obtienen datos de tres APIs principales: clima, tipo de cambio y hora.
2. **Generación de Alertas**: A partir de las reglas de negocio, se generan alertas cuando se
superan ciertos umbrales en los datos.
3. **Índice de Viabilidad de Viaje (IVV)**: El sistema calcula un puntaje basado en condiciones
climáticas, tipo de cambio y índice UV.
4. **Dashboard Interactivo**: Los datos se visualizan en un dashboard interactivo utilizando
**Looker Studio**.
5. **Automatización**: El proceso de recolección de datos se ejecuta cada 30 minutos, con gestión
de reintentos en caso de fallos.
---
## Diagrama de Flujo del Proceso
**Diagrama de flujo**: (Añadir el diagrama de flujo visual aquí).
El diagrama de flujo representa cómo los datos son recolectados, procesados y mostrados en el
dashboard:
1. **Recolección de Datos**:
 - Obtener datos de las APIs de **Open-Meteo**, **ExchangeRate-API**, y **WorldTimeAPI**.
2. **Generación de Alertas**:
 - Verificar las condiciones meteorológicas y de tipo de cambio contra los umbrales definidos.
3. **Cálculo del IVV**:
 - Calcular el IVV con la fórmula `(Clima_Score * 0.4) + (Cambio_Score * 0.3) + (UV_Score * 0.3)`.
4. **Almacenamiento de Datos**:
 - Los datos recolectados y las alertas se almacenan en **Google Sheets**.
5. **Visualización en Dashboard**:
 - Los datos y alertas se visualizan en un dashboard interactivo en **Looker Studio**.
---
## Instrucciones de Instalación y Ejecución
### Requisitos del Sistema
- **Node.js**: Versión 14.x o superior.
- **NPM**: Para instalar dependencias.
- **Bootstrap 5**: Para diseño responsivo y elementos interactivos.
### Instalación
1. Clona el repositorio:
 ```bash
 git clone https://github.com/ignaciojulio/Prueba-Tecnica-RPA
 cd prueba-tecnica-rpa
 ```
2. Instala dependencias:
 ```bash
 npm install
 ```
3. Crea archivo de configuración `.env`:
 Asegúrate de definir las variables necesarias en el archivo `.env` con las URLs de las APIs y la
configuración del cronjob.
 ```bash
 # Ejemplo de archivo .env
 CRON_INTERVAL=30 # Intervalo en minutos
 ```
4. Ejecuta el proyecto:
 ```bash
 npm start
 ```
---
## Descripción de Cada Módulo/Función
### Módulos Principales
1. **`dataCollector.js`**:
 - Función: Recolecta los datos de las APIs de clima, tipo de cambio y hora. Realiza las peticiones
HTTP necesarias y organiza los datos en formato JSON.
2. **`dataStorage.js`**:
 - Función: Almacena los datos recolectados en archivos JSON y en **Google Sheets**. También
gestiona la persistencia de los datos de alertas.
3. **`alerts.js`**:
 - Función: Define las reglas para generar alertas basadas en los umbrales definidos para el clima,
tipo de cambio y el IVV.
4. **`ivv.js`**:
 - Función: Calcula el **Índice de Viabilidad de Viaje (IVV)** utilizando la fórmula mencionada
previamente y clasifica las ciudades según su nivel de riesgo.
5. **`server.js`**:
 - Función: Ejecuta el servidor de backend y gestiona la lógica de recolección y almacenamiento
de datos. También define los endpoints para obtener los datos de las ciudades y alertas.
6. **`fx.js`**:
 - Función: Gestiona la integración con la API de tipo de cambio para obtener el valor de las
monedas.
7. **`time.js`**:
 - Función: Se encarga de la obtención de la hora local de las ciudades utilizando la API de
**WorldTimeAPI**.
8. **`weather.js`**:
 - Función: Obtiene y procesa los datos meteorológicos (temperatura, viento, precipitación) desde
la API de **Open-Meteo**.
---
## Manejo de Errores Implementado
### **Manejo de Errores en la Recolección de Datos**:
- Se implementa un sistema de **reintentos** en caso de que alguna de las APIs no responda
correctamente. Si una API falla, el script volverá a intentar la recolección después de un tiempo de
espera.
- Se validan los **datos incompletos**. Si una API no devuelve todos los datos esperados, se
registra un error en el log y se intenta con los datos disponibles.
### **Manejo de Errores en el Cálculo del IVV**:
- Se asegura que el cálculo del **IVV** solo se realice si los **datos de clima** y **tipo de cambio**
son válidos. Si falta alguno de estos, se registra un error y se omite el cálculo.
### **Logs de Errores**:
- Todos los errores se registran en archivos de log estructurados en la carpeta
**logs/errors/error.log**.
- Se registra el detalle de los **errores de ejecución** en **logs/exec/exec.log** para facilitar el
diagnóstico.
---
## Conclusión
La solución automatiza eficientemente la recolección de datos, la generación de alertas y la
visualización de resultados. La arquitectura modular permite agregar nuevas funciones o APIs en el
futuro sin afectar el flujo principal del sistema.
---
## Licencia
Distribuido bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.