const {response}= require('express');

const turnosGet=(req, res= response) => {
    const data= 'Hola turno';

    res.send({data:data});
}

module.exports= {
    turnosGet
}