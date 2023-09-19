const express= require('express');
const { evaluacionesGet, evaluacionesGetId, evaluacionesPost } = require('../controllers/evaluaciones');

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
router.post('/', evaluacionesPost);

module.exports= router;