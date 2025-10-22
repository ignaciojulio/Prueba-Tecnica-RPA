# Prueba Técnica RPA - Mission SAS
## Descripción
Este proyecto tiene como objetivo automatizar la recolección de datos
climáticos, de tipo de cambio y de hora de diversas ciudades para generar
alertas y reportes interactivos. La solución es parte de la prueba técnica para
el puesto de Ingeniero de Automatización RPA en **Mission SAS**.
### Objetivos del Proyecto
- **Automatización de tareas repetitivas**: Recolección de datos de APIs
públicas (clima, tipo de cambio, hora).
- **Generación de alertas**: Alertas basadas en umbrales de datos
(temperatura, viento, precipitación, etc.).
- **Visualización de datos**: Dashboard interactivo con Looker Studio,
mostrando la evolución de los datos en formato visual (gráficos, tablas).
## Requisitos Técnicos
### APIs utilizadas:
1. **Open-Meteo API** (para datos meteorológicos)
2. **ExchangeRate-API** (para datos de tipos de cambio)
3. **WorldTimeAPI** (para zonas horarias)
### Requerimientos del Sistema
- **Node.js**: Versión 14.x o superior.
- **NPM**: Para instalar dependencias.
- **Bootstrap 5**: Para diseño responsivo y elementos interactivos.
## Instalación
1. Clonar el repositorio:
 ```bash
 git clone https://github.com/tu_usuario/prueba-tecnica-rpa.git
 cd prueba-tecnica-rpa
 ```
2. Instalar dependencias:
 ```bash
 npm install
 ```
3. Crear archivo de configuración `.env`:
 Asegúrate de definir las variables necesarias en el archivo `.env` con las
URLs de las APIs y la configuración del cronjob.
 ```bash
 # Ejemplo de archivo .env
 CRON_INTERVAL=30 # Intervalo en minutos
 ```
4. Ejecutar el proyecto:
 ```bash
 npm start
 ```
## Estructura del Proyecto
El proyecto está organizado en la siguiente estructura de carpetas:
```bash
├───PruebaTecnica_IgnacioJulio
│   .env
│   .gitignore
│   LICENSE
│   package-lock.json
│   package.json
│   README.md
│
├───data
│   ├───processed
│   │       cityData_processed.json
│   │
│   └───raw
│           cityData_raw.json
│
├───logs
│   ├───errors
│   │       errors.log
│   │
│   └───exec
│           exec.log
│
├───public
│       index.html
│
├───src
│   │   index.js
│   │   server.js
│   │
│   ├───config
│   │       cities.js
│   │
│   ├───lib
│   │       dataCollector.js
│   │       dataStorage.js
│   │       http.js
│   │       logger.js
│   │
│   ├───pipeline
│   │       runOnce.js
│   │
│   ├───rules
│   │       alerts.js
│   │       ivv.js
│   │
│   └───services
│           fx.js
│           time.js
│           weather.js
│
└───tests
    │   setup.js
    │
    ├───rules
    │       ivv.test.js
    │
    └───services
            api.test.js
```
## Funcionalidad
### Extracción de Datos
Los datos se extraen de las siguientes APIs:
1. **Clima**: Temperatura, precipitación, viento, y UV para cada ciudad.
2. **Tipo de Cambio**: Conversión de USD a monedas locales.
3. **Hora**: Hora local y diferencia con Bogotá.
### Reglas de Negocio
El sistema genera alertas para los siguientes casos:
- **Alerta Climática Crítica**: 
 - Temperatura > 35°C o < 0°C
 - Probabilidad de lluvia > 70%
 - Viento > 50 km/h
- **Alerta de Tipo de Cambio**: 
 - Variación > 3% respecto al día anterior
 - Tendencia negativa por 3 días consecutivos
### Índice de Viabilidad de Viaje (IVV)
El IVV se calcula con la fórmula:
``` 
IVV = (Clima_Score * 0.4) + (Cambio_Score * 0.3) + (UV_Score * 0.3)
```
Con niveles de riesgo (verde, amarillo, naranja, rojo) basados en el puntaje
IVV.
## Automatización
La recolección de datos se ejecuta automáticamente cada 30 minutos,
gestionando reintentos por si alguna API no responde correctamente.
## Dashboard
El dashboard interactivo muestra:
- **Mapa de ciudades** con indicadores de IVV (verde/amarillo/rojo).
- **Gráfico de temperatura** para los últimos 7 días.
- **Gráfico de barras** para comparar tipos de cambio.
## Documentación Técnica
El sistema maneja errores de las APIs (caídas, datos incompletos) y registra
logs estructurados. Además, los datos recolectados se almacenan en formato
JSON para su procesamiento posterior.
## Pruebas
Se han implementado pruebas unitarias en los módulos principales utilizando
archivos de prueba en la carpeta `tests`.
## Entregables
1. Código fuente completo.
2. Diagrama de flujo del proceso.
3. Dashboard interactivo (publicado o en código fuente).
4. Video demostrativo de la solución.
## Conclusión
La solución automatiza eficientemente la recolección de datos, el
procesamiento de alertas y la visualización de resultados. La arquitectura
modular permite agregar nuevas funciones o APIs en el futuro sin afectar el
flujo principal del sistema.
## Licencia
Distribuido bajo la Licencia MIT. Consulta el archivo LICENSE para más
detalles.
