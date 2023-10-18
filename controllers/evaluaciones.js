const {response}= require('express');
const Evaluacion = require('../models/evaluacion');
const { getFechaActual, getFechaActualString, getFechaHoraLocal } = require('../helpers/timeUtils');
const { crearPrueba, crearPruebas } = require('./pruebas');

const evaluacionesGet= async(req, res=response) => {
    //const data= 'Hola evaluación';

    //res.send({data:data});

    //const fechaActualString= getFechaActualString();
    //console.log(fechaActualString);

    const {limite= 0, desde= 0, fechaDesde= process.env.FECHADESDE, fechaHasta= process.env.FECHAHASTA}= req.query;

    //const query= {fechaYhora: {$gte:fechaActualString, $lte:fechaHasta}};
    const query= {fechaYhora: {$gte:fechaDesde, $lte:fechaHasta}};
    //console.log(query);

    const [total, evaluaciones]= await Promise.all([
        Evaluacion.countDocuments(query),
        Evaluacion.find(query)
            .populate('pruebas.pruebaFrenos', ['tipo', 'puntaje'])
            .populate('pruebas.pruebaSuspension', ['tipo', 'puntaje'])
            .populate('pruebas.pruebaLuces', ['tipo', 'puntaje'])
            .populate('pruebas.pruebaMotor', ['tipo', 'puntaje'])
            .populate('pruebas.pruebaAlineacion', ['tipo', 'puntaje'])
            .populate('pruebas.pruebaContaminacion', ['tipo', 'puntaje'])
            .populate('pruebas.pruebaTrenDelantero', ['tipo', 'puntaje'])
            .populate('pruebas.pruebaTrenTrasero', ['tipo', 'puntaje'])
            .populate('pruebas.pruebaCinturones', ['tipo', 'puntaje'])
            .populate('pruebas.pruebaMatafuego', ['tipo', 'puntaje'])
            .skip(Number(desde))
            .limit(Number(limite))
            .sort({fechaYhora:1})       //ordeno por fecha ascendente
    ]);

    
    
    for(let i=0; i < evaluaciones.length; i++) {
        let fechaProv= getFechaHoraLocal(evaluaciones[i].fechaYhora);
        evaluaciones[i].fechaYhora= fechaProv;
    }
    
    res.json({
        total,
        evaluaciones
    });

}

/*
const evaluacionesGetId= (req, res=response) => {
    const data= 'Hola evaluación';
    const id= req.params.id;

    res.send({
        data:data,
        id
    });
}
*/

const evaluacionesGetPorMatricula= async(req, res=response) => {
    const {matricula}= req.params;

    const query= {matricula:matricula};

    /*
    const [total, evaluaciones]= await Promise.all([
        Evaluacion.countDocuments(query),
        Evaluacion.find(query)
            .populate('pruebas.pruebaFrenos', ['tipo', 'puntaje'])
            .populate('pruebas.pruebaSuspension', ['tipo', 'puntaje'])
            .populate('pruebas.pruebaLuces', ['tipo', 'puntaje'])
            .populate('pruebas.pruebaMotor', ['tipo', 'puntaje'])
            .populate('pruebas.pruebaAlineacion', ['tipo', 'puntaje'])
            .populate('pruebas.pruebaContaminacion', ['tipo', 'puntaje'])
            .populate('pruebas.pruebaTrenDelantero', ['tipo', 'puntaje'])
            .populate('pruebas.pruebaTrenTrasero', ['tipo', 'puntaje'])
            .populate('pruebas.pruebaCinturones', ['tipo', 'puntaje'])
            .populate('pruebas.pruebaMatafuego', ['tipo', 'puntaje'])
            .sort({fechaYhora:1}) 
    ]);
    */

    const evaluacion= await Evaluacion.findOne(query)
            .populate('pruebas.pruebaFrenos', ['tipo', 'puntaje'])
            .populate('pruebas.pruebaSuspension', ['tipo', 'puntaje'])
            .populate('pruebas.pruebaLuces', ['tipo', 'puntaje'])
            .populate('pruebas.pruebaMotor', ['tipo', 'puntaje'])
            .populate('pruebas.pruebaAlineacion', ['tipo', 'puntaje'])
            .populate('pruebas.pruebaContaminacion', ['tipo', 'puntaje'])
            .populate('pruebas.pruebaTrenDelantero', ['tipo', 'puntaje'])
            .populate('pruebas.pruebaTrenTrasero', ['tipo', 'puntaje'])
            .populate('pruebas.pruebaCinturones', ['tipo', 'puntaje'])
            .populate('pruebas.pruebaMatafuego', ['tipo', 'puntaje'])
            .sort({fechaYhora:-1})

    /*
    for(let i=0; i < evaluaciones.length; i++) {
        //let fechaProv= subHours(turnos[i].fechaYhora, 3);
        let fechaProv= getFechaHoraLocal(evaluaciones[i].fechaYhora);
        evaluaciones[i].fechaYhora= fechaProv;
    }
    */

    if(!evaluacion) {
        return res.status(404).json({
            msg: 'No existe evaluación'
        });
    }

    evaluacion.fechaYhora= getFechaHoraLocal(evaluacion.fechaYhora);

    /*
    res.json({
        total,
        evaluaciones
    });
    */

    res.json(evaluacion);
}

const evaluacionesPost= async(req, res=response) => {
    /*
    const resultado= req.body;
    console.log(resultado);
    res.send(resultado).end;
    */

    //const {matricula, observaciones, pruebas}= req.body;
    const {matricula, pruebas}= req.body;
    let {observaciones}= req.body;

    //const pruebaFrenos= req.body.pruebas.pruebaFrenos;

    /*
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
    */

    //console.log(pruebas);
    const {resultado, puntajeTotal}= evaluar(pruebas);

    if(resultado != 'SEGURO' && !observaciones) {
        return res.status(400).json({
            msg: 'Debe incluir observaciones'
        });
    }

    if(resultado=== 'SEGURO') {
        observaciones= '';
    }

    //console.log(pruebaFrenos, pruebaSuspension, pruebaLuces, pruebaMotor, pruebaAlineacion, pruebaContaminacion, pruebaTrenDelantero, pruebaTrenTrasero, pruebaCinturones, pruebaMatafuego);
    //const pruebaFrenos= pruebas.pruebaFrenos;
    //const pFrenos= await crearPrueba(pruebaFrenos.tipo, pruebaFrenos.puntaje);

    //const pruebaSuspension= pruebas.pruebaSuspension;
    //const pSuspension= await crearPrueba(pruebaSuspension.tipo, pruebaSuspension.puntaje);

    //const pruebaLuces= pruebas.pruebaLuces;
    //const pLuces= await crearPrueba(pruebaLuces.tipo, pruebaLuces.puntaje);

    //const pruebaMotor= pruebas.pruebaMotor;
    //const pMotor= await crearPrueba(pruebaMotor.tipo, pruebaMotor.puntaje);

    //const pruebaAlineacion= pruebas.pruebaAlineacion;
   //const pAlineacion= await crearPrueba(pruebaAlineacion.tipo, pruebaAlineacion.puntaje);

    //const pruebaContaminacion= pruebas.pruebaContaminacion;
    //const pContaminacion= await crearPrueba(pruebaContaminacion.tipo, pruebaContaminacion.puntaje);

    //const pruebaTrenDelantero= pruebas.pruebaTrenDelantero;
    //const pTrenDelantero= await crearPrueba(pruebaTrenDelantero.tipo, pruebaTrenDelantero.puntaje);

    //const pruebaTrenTrasero= pruebas.pruebaTrenTrasero;
    //const pTrenTrasero= await crearPrueba(pruebaTrenTrasero.tipo, pruebaTrenTrasero.puntaje);

    //const pruebaCinturones= pruebas.pruebaCinturones;
    //const pCinturones= await crearPrueba(pruebaCinturones.tipo, pruebaCinturones.puntaje);

    //const pruebaMatafuego= pruebas.pruebaMatafuego;
    //const pMatafuego= await crearPrueba(pruebaMatafuego.tipo, pruebaMatafuego.puntaje);
    
    const pruebasRec= await crearPruebas(pruebas);
    //console.log(pruebasRec);

    /*
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
    */

    //console.log(pFrenos, pSuspension, pLuces, pMotor, pAlineacion, pContaminacion, pTrenDelantero, pTrenTrasero, pCinturones, pMatafuego);
    
    //const pSuspension= await crearPrueba(pruebaFrenos.tipo, pruebaFrenos.puntaje);
    //console.log(pFrenos);

    /*
    if(resultado=== 'SEGURO') {
        observaciones= '';
    }
    */

    const fechaActual= getFechaActual();

    /*
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
                                    puntajeTotal, resultado, observaciones});
    */

    const evaluacion= new Evaluacion({fechaYhora: fechaActual, matricula, pruebas: pruebasRec, puntajeTotal, resultado, observaciones});

    await evaluacion.save();

    evaluacion.fechaYhora= getFechaHoraLocal(fechaActual);

    //console.log(evaluacion.pruebas);
    
    res.status(201).json({
        evaluacion
    });
}

const evaluar= (pruebas) => {
    let puntajeTotal= 0;
    //let putajeBajo= false;
    let resultado= '';

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

    puntajeTotal= pruebaFrenos.puntaje + pruebaSuspension.puntaje + pruebaLuces.puntaje + pruebaMotor.puntaje + pruebaAlineacion.puntaje + pruebaContaminacion.puntaje +
                pruebaTrenDelantero.puntaje + pruebaTrenTrasero.puntaje + pruebaCinturones.puntaje + pruebaMatafuego.puntaje;

    if(puntajeTotal<40 || pruebaFrenos.puntaje<5 || pruebaSuspension.puntaje<5 ||  pruebaLuces.puntaje<5 || pruebaMotor.puntaje<5 || pruebaAlineacion.puntaje<5 ||
        pruebaContaminacion.puntaje<5 || pruebaTrenDelantero.puntaje<5 || pruebaTrenTrasero.puntaje<5 || pruebaCinturones.puntaje<5 || pruebaMatafuego.puntaje<5) {
        resultado= 'RECHEQUEAR';
    } else if(puntajeTotal>=40 && puntajeTotal <=80) {
        resultado= 'APROBADO CON OBSERVACIONES';
    } else if(puntajeTotal>80) {
        resultado= 'SEGURO';
    }

    return {
        resultado,
        puntajeTotal
    }
}

module.exports= {
    evaluacionesGet,
    //evaluacionesGetId,
    evaluacionesGetPorMatricula,
    evaluacionesPost
}