const {response}= require('express');
const Evaluacion = require('../models/evaluacion');
const { getFechaActual, getFechaHoraLocal } = require('../helpers/timeUtils');
const { crearPrueba, crearPruebas } = require('./pruebas');

const evaluacionesGet= async(req, res=response) => {

    const {limite= 0, desde= 0, fechaDesde= process.env.FECHADESDE, fechaHasta= process.env.FECHAHASTA}= req.query;

    const query= {fechaYhora: {$gte:fechaDesde, $lte:fechaHasta}};

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

const evaluacionesGetPorMatricula= async(req, res=response) => {
    const {matricula}= req.params;

    const query= {matricula:matricula};

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

    if(!evaluacion) {
        return res.status(404).json({
            msg: 'No existe evaluación'
        });
    }

    evaluacion.fechaYhora= getFechaHoraLocal(evaluacion.fechaYhora);

    res.json(evaluacion);
}

const evaluacionesPost= async(req, res=response) => {
    
    const {matricula, pruebas}= req.body;
    let {observaciones}= req.body;

    const {resultado, puntajeTotal}= evaluar(pruebas);

    if(resultado != 'SEGURO' && !observaciones) {
        return res.status(400).json({
            msg: 'Debe incluir observaciones'
        });
    }

    if(resultado=== 'SEGURO') {
        observaciones= '';
    }

    const pruebasRec= await crearPruebas(pruebas);
    
    const fechaActual= getFechaActual();

    const evaluacion= new Evaluacion({fechaYhora: fechaActual, matricula, pruebas: pruebasRec, puntajeTotal, resultado, observaciones});

    await evaluacion.save();

    evaluacion.fechaYhora= getFechaHoraLocal(fechaActual);
    
    res.status(201).json({
        evaluacion
    });
}

const evaluar= (pruebas) => {
    let puntajeTotal= 0;
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
    evaluacionesGetPorMatricula,
    evaluacionesPost
}