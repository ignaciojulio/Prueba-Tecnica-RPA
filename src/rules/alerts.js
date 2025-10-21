module.exports = {
  generateAlert: function (data, tipo) {
    const alertas = [];
    
    // Alerta Climática
    if (tipo === 'clima') {
      // Temperatura
      if (data.temperatura_actual > 35 || data.temperatura_actual < 0) {
        alertas.push({
          tipo: "CLIMA",
          severidad: "CRÍTICO",
          mensaje: `Temperatura fuera del rango seguro: ${data.temperatura_actual}°C`
        });
      }
      
      // Viento
      if (data.viento > 50) {
        alertas.push({
          tipo: "CLIMA",
          severidad: "CRÍTICO",
          mensaje: `Velocidad del viento superior a 50 km/h: ${data.viento} km/h`
        });
      }

      // Lluvia
      if (data.precipitacion > 70) {
        alertas.push({
          tipo: "CLIMA",
          severidad: "CRÍTICO",
          mensaje: `Alta probabilidad de lluvia: ${data.precipitacion}%`
        });
      }
    }
    
    // Alerta de Tipo de Cambio
    if (tipo === 'cambio') {
      // Variación > 3% respecto al día anterior
      if (Math.abs(data.variacion_diaria) > 3) {
        alertas.push({
          tipo: "CAMBIO",
          severidad: "CRÍTICO",
          mensaje: `Variación de tipo de cambio superior al 3%: ${data.variacion_diaria}%`
        });
      }
      
      // Tendencia negativa
      if (data.tendencia_5_dias === "negativa") {
        alertas.push({
          tipo: "CAMBIO",
          severidad: "ALTA",
          mensaje: `Tendencia negativa en los últimos 3 días para el tipo de cambio`
        });
      }
    }
    
    return alertas;
  }
}
