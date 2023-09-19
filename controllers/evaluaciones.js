const {response}= require('express');

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

const evaluacionesPost= (req, res=response) => {
    const resultado= req.body;
    console.log(resultado);
    res.send(resultado).end;
}

module.exports= {
    evaluacionesGet,
    evaluacionesGetId,
    evaluacionesPost
}