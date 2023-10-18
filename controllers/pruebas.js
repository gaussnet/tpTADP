//const prueba = require('../models/prueba');
const Prueba= require('../models/prueba');

const crearPrueba= async(tipo, puntaje) => {
    //console.log('Entro a crear prueba', tipo, puntaje)
    prueba= new Prueba({tipo, puntaje});

    //console.log(prueba)

    await prueba.save();

    //console.log('Salgo de crear prueba')
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

    //const pruebaSuspension= pruebas.pruebaSuspension;
    const pSuspension= await crearPrueba(pruebaSuspension.tipo, pruebaSuspension.puntaje);

    //const pruebaLuces= pruebas.pruebaLuces;
    const pLuces= await crearPrueba(pruebaLuces.tipo, pruebaLuces.puntaje);

    //const pruebaMotor= pruebas.pruebaMotor;
    const pMotor= await crearPrueba(pruebaMotor.tipo, pruebaMotor.puntaje);

    //const pruebaAlineacion= pruebas.pruebaAlineacion;
   const pAlineacion= await crearPrueba(pruebaAlineacion.tipo, pruebaAlineacion.puntaje);

    //const pruebaContaminacion= pruebas.pruebaContaminacion;
    const pContaminacion= await crearPrueba(pruebaContaminacion.tipo, pruebaContaminacion.puntaje);

    //const pruebaTrenDelantero= pruebas.pruebaTrenDelantero;
    const pTrenDelantero= await crearPrueba(pruebaTrenDelantero.tipo, pruebaTrenDelantero.puntaje);

    //const pruebaTrenTrasero= pruebas.pruebaTrenTrasero;
    const pTrenTrasero= await crearPrueba(pruebaTrenTrasero.tipo, pruebaTrenTrasero.puntaje);

    //const pruebaCinturones= pruebas.pruebaCinturones;
    const pCinturones= await crearPrueba(pruebaCinturones.tipo, pruebaCinturones.puntaje);

    //const pruebaMatafuego= pruebas.pruebaMatafuego;
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
    //crearPrueba
    crearPruebas
}