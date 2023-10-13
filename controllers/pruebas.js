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

module.exports= {
    crearPrueba
}