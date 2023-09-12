const express= require('express');
const { turnosGet } = require('../controllers/turnos');

const router= express.Router();

//module.exports= router;

/*
router.get('/', (req, res) => {
    const data= 'Hola turno';

    res.send({data:data});
});
*/

router.get('/', turnosGet);

module.exports= router;