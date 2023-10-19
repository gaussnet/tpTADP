const Prueba= require('../models/prueba');

const crearPrueba= async(tipo, puntaje) => {
    prueba= new Prueba({tipo, puntaje});

    await prueba.save();

    return prueba;

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

    const pFrenos= await crearPrueba(pruebaFrenos.tipo, pruebaFrenos.puntaje);
    const pSuspension= await crearPrueba(pruebaSuspension.tipo, pruebaSuspension.puntaje);
    const pLuces= await crearPrueba(pruebaLuces.tipo, pruebaLuces.puntaje);
    const pMotor= await crearPrueba(pruebaMotor.tipo, pruebaMotor.puntaje);
    const pAlineacion= await crearPrueba(pruebaAlineacion.tipo, pruebaAlineacion.puntaje);
    const pContaminacion= await crearPrueba(pruebaContaminacion.tipo, pruebaContaminacion.puntaje);
    const pTrenDelantero= await crearPrueba(pruebaTrenDelantero.tipo, pruebaTrenDelantero.puntaje);
    const pTrenTrasero= await crearPrueba(pruebaTrenTrasero.tipo, pruebaTrenTrasero.puntaje);
    const pCinturones= await crearPrueba(pruebaCinturones.tipo, pruebaCinturones.puntaje);
    const pMatafuego= await crearPrueba(pruebaMatafuego.tipo, pruebaMatafuego.puntaje);

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