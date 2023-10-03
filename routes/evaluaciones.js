const express= require('express');
const { evaluacionesGet, evaluacionesGetId, evaluacionesPost } = require('../controllers/evaluaciones');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router= express.Router();

router.get('/', [
    validarJWT,
    validarCampos
], evaluacionesGet);
router.get('/:id', evaluacionesGetId);
router.post('/', evaluacionesPost);

module.exports= router;