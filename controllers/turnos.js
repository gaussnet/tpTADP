const {response}= require('express');
const Turno= require('../models/turno');

const turnosGet=(req, res= response) => {
    const data= 'Hola turno';

    res.send({data:data});
}

const turnosPost=async(req, res= response) => {
    //const body= req.body;
    //const turno= new Turno(body);
    //turno.matricula= 'ac876er'

    const {fechaYhora, matricula}= req.body;

    fechaActual= new Date();
    console.log('Fecha actual', fechaActual, typeof fechaActual);
    console.log('Fecha actual string', fechaActual.toISOString(), typeof fechaActual.toISOString());
    console.log('Fecha recibida', fechaYhora, typeof fechaYhora);

    fechaYhoraDate= new Date(fechaYhora);
    console.log('Fecha recibida convertida', fechaYhoraDate);

    if(fechaYhoraDate < fechaActual) {
        return res.status(400).json({
            msg: 'Fecha es anterior'
        });
    }

    const turno= Turno({fechaYhora, matricula});

    const existeTurno= await Turno.findOne({fechaYhora});
    if(existeTurno) {
        return res.status(400).json({
            msg: 'Turno ya existente'
        });
    }
    await turno.save();       //Guarda en la DB. Es necesario ponerle el await?

    res.json(turno);
    
    //console.log(turno);
    
    //res.send(resultado).end;
}

module.exports= {
    turnosGet,
    turnosPost
}