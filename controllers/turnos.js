const {response}= require('express');
const Turno= require('../models/turno');

const turnosGet=(req, res= response) => {
    const data= 'Hola turno';

    res.send({data:data});
}

const turnosPost=(req, res= response) => {
    //const body= req.body;
    //const turno= new Turno(body);
    //turno.matricula= 'ac876er'

    const {fechaYhora, matricula}= req.body;
    const turno= Turno({fechaYhora, matricula});
    turno.save();       //Guarda en la DB. Es necesario ponerle el await?

    res.json(turno);
    console.log(turno);
    
    //res.send(resultado).end;
}

module.exports= {
    turnosGet,
    turnosPost
}