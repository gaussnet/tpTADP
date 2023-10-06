const express= require('express');
const { check } = require('express-validator');
const {turnosPost, turnosPut, turnosGetLibres, turnosGetConfirmados } = require('../controllers/turnos');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router= express.Router();

router.get('/libres', [
    check('fechaDesde', 'fecha Incorrecta').optional().isISO8601(),
    check('fechaHasta', 'fecha Incorrecta').optional().isISO8601(),
    validarCampos
], turnosGetLibres);

router.get('/confirmados', [
    validarJWT,
    validarCampos
], turnosGetConfirmados);

router.post('/', [
    validarJWT,
    check('fechaYhora', 'Fecha es obligatoria').not().isEmpty(),
    check('fechaYhora', 'Fecha incorrecta').isISO8601(),
    //check('matricula', 'Matrícula es obligatorio').not().isEmpty(),
    validarCampos
], turnosPost);

router.put('/:id', [
    check('id', 'ID invalido').isMongoId(),
    check('matricula', 'Matrícula es obligatorio').not().isEmpty(),
    validarCampos
], turnosPut);

//router.put('/:id', turnosPut);


module.exports= router;