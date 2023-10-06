const {response}= require('express');
const Turno= require('../models/turno');

const subHours = require('date-fns/subHours');

const turnosGetLibres= async(req, res= response) => {
    //const data= 'Hola turno';
    //res.send({data:data});
    //let query= {confirmado:false};
    //const query= {$and: [{confirmado:false}, {fechaYhora: {$gte:fechaDesde, $lte:fechaHasta}}]};

    //const total= await Turno.countDocuments(query);
    //const turnos= await Turno.find(query);

    const {limite= 0, desde= 0, fechaDesde= '2023-01-01', fechaHasta= '2925-12-31'}= req.query;
    //const query= {$and: [{confirmado:false}, {fechaYhora: {$gte:fechaDesde, $lte:fechaHasta}}]};
    //query= {$and: [{confirmado:false}, {fechaYhora: {$gte:fechaDesde}}, {fechaYhora: {$lte:fechaHasta}}]};
    query= {confirmado:false, fechaYhora: {$gte:fechaDesde, $lte:fechaHasta}}

    /*
    const turnos= await Turno.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
        .sort({fechaYhora:1}) ;
    */

    const [total, turnos]= await Promise.all([
        Turno.countDocuments(query),
        Turno.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .sort({fechaYhora:1})       //ordeno por fecha ascendente
    ]);

    res.json({
        total,
        turnos
    })
}

const turnosGetConfirmados= async(req, res= response) => {
    const query= {confirmado:true};

    const [total, turnos]= await Promise.all([
        Turno.countDocuments(query),
        Turno.find(query)
            .sort({fechaYhora:1}) 
    ]);

    res.json({
        total,
        turnos
    })

}

const turnosPost=async(req, res= response) => {
    //const body= req.body;
    //const turno= new Turno(body);
    //turno.matricula= 'ac876er'

    const {fechaYhora, matricula}= req.body;

    fechaActual= new Date();
    /*
    console.log('Fecha actual', fechaActual, typeof fechaActual);
    console.log('Fecha actual string', fechaActual.toISOString(), typeof fechaActual.toISOString());
    console.log('Fecha recibida', fechaYhora, typeof fechaYhora);
    */

    fechaYhoraDate= new Date(fechaYhora);
    //console.log('Fecha recibida convertida', fechaYhoraDate, typeof fechaYhoraDate);

    if(fechaYhoraDate < fechaActual) {
        return res.status(400).json({
            msg: 'Fecha es anterior'
        });
    }

    //const fechaAGuardar= fechaYhoraDate.toLocaleDateString('en-US');
    //console.log('Fecha a guardar', fechaAGuardar, typeof fechaAGuardar);

   
    //const turno= Turno({fechaAGuardar, matricula});

    const existeTurno= await Turno.findOne({fechaYhora});
    if(existeTurno) {
        return res.status(400).json({
            msg: 'Turno ya existente'
        });
    }

    const turno= Turno({fechaYhora, matricula});
    await turno.save();       //Guarda en la DB. Es necesario ponerle el await?

    turno.fechaYhora= subHours(fechaYhoraDate, 3);
    res.json(turno);
    
    //console.log(turno);
    
    //res.send(resultado).end;
}

const turnosPut=async(req, res= response) => {
    //console.log('Entro controlador');
    const {id}= req.params;
    const {_id, fechaYhora, matricula, ...resto}= req.body;

    const turno= await Turno.findOne({_id:id});

    if(!turno) {
        return res.status(404).json({
            msg: 'Turno no existe'
        });
    }

    if(turno.confirmado === true) {
        return res.status(400).json({
            msg: 'Turno ya reservado'
        });
    }

    turno.matricula= matricula;
    turno.confirmado= true;

    await turno.save();

    res.json(turno);

}


module.exports= {
    turnosGetLibres,
    turnosGetConfirmados,
    turnosPost,
    turnosPut
}