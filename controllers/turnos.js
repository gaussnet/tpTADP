const {response}= require('express');
const Turno= require('../models/turno');

const { getFechaHoraLocal, getFechaActual, getFechaActualString } = require('../helpers/timeUtils');

const turnosGetLibres= async(req, res= response) => {
    const fechaActualString= getFechaActualString();

    const {limite= 0, desde= 0, fechaHasta= process.env.FECHAHASTA}= req.query;

    const query= {confirmado:false, fechaYhora: {$gte:fechaActualString, $lte:fechaHasta}};

    const [total, turnos]= await Promise.all([
        Turno.countDocuments(query),
        Turno.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .sort({fechaYhora:1})       //ordeno por fecha ascendente
    ]);

    for(let i=0; i < turnos.length; i++) {
        let fechaProv= getFechaHoraLocal(turnos[i].fechaYhora);
        turnos[i].fechaYhora= fechaProv;
    }

    res.json({
        total,
        turnos
    })
}

const turnosGetConfirmados= async(req, res= response) => {
    const {limite= 0, desde= 0, fechaDesde= process.env.FECHADESDE, fechaHasta= process.env.FECHAHASTA}= req.query;
    
    const query= {confirmado:true, fechaYhora: {$gte:fechaDesde, $lte:fechaHasta}};
   
    const [total, turnos]= await Promise.all([
        Turno.countDocuments(query),
        Turno.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .sort({fechaYhora:1}) 
    ]);

    for(let i=0; i < turnos.length; i++) {
        let fechaProv= getFechaHoraLocal(turnos[i].fechaYhora);
        turnos[i].fechaYhora= fechaProv;
    }

    res.json({
        total,
        turnos
    })

}

const turnosGetConfirmadosPorMatricula= async(req, res= response) => {
    const {limite= 0, desde= 0, fechaDesde= process.env.FECHADESDE, fechaHasta= process.env.FECHAHASTA}= req.query;
    const {matricula}= req.params;
    const query= {confirmado:true, matricula:matricula, fechaYhora: {$gte:fechaDesde, $lte:fechaHasta}};
   
    const [total, turnos]= await Promise.all([
        Turno.countDocuments(query),
        Turno.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .sort({fechaYhora:1}) 
    ]);

    for(let i=0; i < turnos.length; i++) {
        let fechaProv= getFechaHoraLocal(turnos[i].fechaYhora);
        turnos[i].fechaYhora= fechaProv;
    }

    res.json({
        total,
        turnos
    })

}

const turnosPost=async(req, res= response) => {

    const {fechaYhora, matricula}= req.body;

    const fechaActual= getFechaActual();

    const fechaYhoraDate= new Date(fechaYhora);

    if(fechaYhoraDate < fechaActual) {
        return res.status(400).json({
            msg: 'Fecha es anterior'
        });
    }

    const existeTurno= await Turno.findOne({fechaYhora});
    if(existeTurno) {
        return res.status(400).json({
            msg: 'Turno ya existente'
        });
    }

    const turno= Turno({fechaYhora, matricula});
    await turno.save();       

    turno.fechaYhora= getFechaHoraLocal(fechaYhoraDate);

    res.status(201).json(turno);
    
}

const turnosPut=async(req, res= response) => {
    const {id}= req.params;
    const {_id, fechaYhora, matricula, ...resto}= req.body;

    const turno= await Turno.findOne({_id:id});

    if(turno.confirmado === true) {
        return res.status(400).json({
            msg: 'Turno ya reservado'
        });
    }

    turno.matricula= matricula;
    turno.confirmado= true;

    await turno.save();

    turno.fechaYhora= getFechaHoraLocal(turno.fechaYhora);

    res.json(turno);

}


module.exports= {
    turnosGetLibres,
    turnosGetConfirmados,
    turnosGetConfirmadosPorMatricula,
    turnosPost,
    turnosPut
}