const {response}= require('express');
const Evaluacion = require('../models/evaluacion');
const { getFechaActual, getFechaHoraLocal } = require('../helpers/timeUtils');
const { crearPrueba } = require('./pruebas');

const evaluacionesGet= (req, res=response) => {
    const data= 'Hola evaluación';

    res.send({data:data});
}

const evaluacionesGetId= (req, res=response) => {
    const data= 'Hola evaluación';
    const id= req.params.id;

    res.send({
        data:data,
        id
    });
}

const evaluacionesPost= async(req, res=response) => {
    /*
    const resultado= req.body;
    console.log(resultado);
    res.send(resultado).end;
    */

    const {matricula, observaciones, pruebas}= req.body;

    //const pruebaFrenos= req.body.pruebas.pruebaFrenos;

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

    //const pruebaFrenos= pruebas.pruebaFrenos;
    //const pFrenos= await crearPrueba(pruebaFrenos.tipo, pruebaFrenos.puntaje);

    //const pruebaSuspension= pruebas.pruebaSuspension;
    //const pSuspension= await crearPrueba(pruebaSuspension.tipo, pruebaSuspension.puntaje);

    //const pruebaLuces= pruebas.pruebaLuces;
    //const pLuces= await crearPrueba(pruebaLuces.tipo, pruebaLuces.puntaje);

    //const pruebaMotor= pruebas.pruebaMotor;
    //const pMotor= await crearPrueba(pruebaMotor.tipo, pruebaMotor.puntaje);

    //const pruebaAlineacion= pruebas.pruebaAlineacion;
   // const pAlineacion= await crearPrueba(pruebaAlineacion.tipo, pruebaAlineacion.puntaje);

    //const pruebaContaminacion= pruebas.pruebaContaminacion;
    //const pContaminacion= await crearPrueba(pruebaContaminacion.tipo, pruebaContaminacion.puntaje);

    //const pruebaTrenDelantero= pruebas.pruebaTrenDelantero;
    //const pTrenDelantero= await crearPrueba(pruebaTrenDelantero.tipo, pruebaTrenDelantero.puntaje);

    //const pruebaTrenTrasero= pruebas.pruebaTrenTrasero;
    //const pTrenTrasero= await crearPrueba(pruebaTrenTrasero.tipo, pruebaTrenTrasero.puntaje);

    //const pruebaCinturones= pruebas.pruebaCinturones;
    //const pCinturones= await crearPrueba(pruebaCinturores.tipo, pruebaCinturores.puntaje);

    //const pruebaMatafuego= pruebas.pruebaMatafuego;
    //const pMatafuego= await crearPrueba(pruebaMatafuego.tipo, pruebaMatafuego.puntaje);
    

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

    
    //const pSuspension= await crearPrueba(pruebaFrenos.tipo, pruebaFrenos.puntaje);
    //console.log(pFrenos);

    const fechaActual= getFechaActual();

    const evaluacion= new Evaluacion({fechaYhora: fechaActual, matricula, pruebas:{
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
                                                                            }, 
                                    observaciones});

    await evaluacion.save();

    evaluacion.fechaYhora= getFechaHoraLocal(fechaActual);
    
    res.status(201).json({
        evaluacion
    });
}

module.exports= {
    evaluacionesGet,
    evaluacionesGetId,
    evaluacionesPost
}