const subMinutes = require('date-fns/subMinutes');

const getFechaActual= () => {
    return new Date();
}

const getFechaActualString= () => {
    return getFechaActual().toISOString();
}

//Devuelve la fecha con la hora convertida al Time zone local
const getFechaHoraLocal= (fecha) => {
    return subMinutes(fecha, fecha.getTimezoneOffset());
}

module.exports= {
    getFechaActual,
    getFechaActualString,
    getFechaHoraLocal
}