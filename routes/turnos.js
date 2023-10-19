const express= require('express');
const { check } = require('express-validator');
const {turnosPost, turnosPut, turnosGetLibres, turnosGetConfirmados, turnosGetConfirmadosPorMatricula } = require('../controllers/turnos');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { existeTurnoPorId } = require('../helpers/db-validators');

const router= express.Router();

router.get('/libres', [
    //check('fechaDesde', 'fecha Incorrecta').optional().isISO8601(),
    check('fechaHasta', 'fecha Incorrecta').optional().isISO8601(),
    validarCampos
], turnosGetLibres);

router.get('/confirmados', [
    validarJWT,
    validarCampos
], turnosGetConfirmados);

router.get('/confirmados/:matricula', [
    validarJWT,
    validarCampos
], turnosGetConfirmadosPorMatricula)

router.post('/', [
    validarJWT,
    check('fechaYhora', 'Fecha es obligatoria').not().isEmpty(),
    check('fechaYhora', 'Fecha incorrecta').isISO8601(),
    validarCampos
], turnosPost);

router.put('/:id', [
    check('id', 'ID invalido').isMongoId(),
    check('id').custom(existeTurnoPorId),
    check('matricula', 'Matrícula es obligatorio').not().isEmpty(),
    validarCampos
], turnosPut);


module.exports= router;