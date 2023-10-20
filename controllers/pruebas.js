const Prueba= require('../models/prueba');


const crearPrueba= async(tipo, puntaje) => {
    return new Promise((resolve, reject) => {
        prueba= new Prueba({tipo, puntaje});

        prueba.save();

        if(prueba) {
            resolve(prueba);
            return;
        }

        reject('No se pudo crear prueba');
    });
}


const crearPruebas= async(pruebas) => {
    const {
        pruebaFrenos, 
        pruebaSuspension, 
        pruebaLuces, 
        pruebaMotor, 
        pruebaAlineacion, 
        pruebaContaminacion, 
        pruebaTrenDelantero, 
        pruebaTrenTrasero, 
        pruebaCinturones, 
        pruebaMatafuego
    }= pruebas;

   const [pFrenos, pSuspension, pLuces, pMotor, pAlineacion, pContaminacion, pTrenDelantero, pTrenTrasero, pCinturones, pMatafuego]= await Promise.all([
        crearPrueba(pruebaFrenos.tipo, pruebaFrenos.puntaje),
        crearPrueba(pruebaSuspension.tipo, pruebaSuspension.puntaje),
        crearPrueba(pruebaLuces.tipo, pruebaLuces.puntaje),
        crearPrueba(pruebaMotor.tipo, pruebaMotor.puntaje),
        crearPrueba(pruebaAlineacion.tipo, pruebaAlineacion.puntaje),
        crearPrueba(pruebaContaminacion.tipo, pruebaContaminacion.puntaje),
        crearPrueba(pruebaTrenDelantero.tipo, pruebaTrenDelantero.puntaje),
        crearPrueba(pruebaTrenTrasero.tipo, pruebaTrenTrasero.puntaje),
        crearPrueba(pruebaCinturones.tipo, pruebaCinturones.puntaje),
        crearPrueba(pruebaMatafuego.tipo, pruebaMatafuego.puntaje)
    ]);

    const data= {
        pruebaFrenos: pFrenos._id, 
        pruebaSuspension: pSuspension._id,
        pruebaLuces: pLuces._id,
        pruebaMotor: pMotor._id,
        pruebaAlineacion: pAlineacion._id,
        pruebaContaminacion: pContaminacion._id,
        pruebaTrenDelantero: pTrenDelantero._id,
        pruebaTrenTrasero: pTrenTrasero._id,
        pruebaCinturones: pCinturones._id,
        pruebaMatafuego: pMatafuego._id
    };

    return data;
}

module.exports= {
    crearPruebas
}