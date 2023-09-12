const express= require('express');
const { evaluacionesGet, evaluacionesGetId } = require('../controllers/evaluaciones');

const router= express.Router();

//module.exports= router;

/*
router.get('/', (req, res) => {
    const data= 'Hola evaluación';

    res.send({data:data});
})
*/

router.get('/', evaluacionesGet);
router.get('/:id', evaluacionesGetId);

module.exports= router;