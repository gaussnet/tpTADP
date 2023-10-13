const express= require('express');
const { check } = require('express-validator');
const { evaluacionesGet, evaluacionesGetId, evaluacionesPost } = require('../controllers/evaluaciones');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router= express.Router();

router.get('/', [
    validarJWT,
    validarCampos
], evaluacionesGet);

router.get('/:id', [
    check('id', 'ID invalido').isMongoId(),
    validarCampos
], evaluacionesGetId);

router.post('/', [
    validarJWT,
    check('matricula', 'Matrícula es obligatorio').not().isEmpty(),
    check('pruebas', 'pruebas es obligatorio').not().isEmpty(),
    check('pruebas.pruebaFrenos', 'prueba frenos es obligatorio').not().isEmpty(),
    check('pruebas.pruebaFrenos.tipo', 'tipo incorrecto').matches('FRENOS'),
    check('pruebas.pruebaSuspension', 'prueba suspensión es obligatorio').not().isEmpty(),
    check('pruebas.pruebaSuspension.tipo', 'tipo incorrecto').matches('SUSPENSION'),
    check('pruebas.pruebaLuces', 'prueba luces es obligatorio').not().isEmpty(),
    check('pruebas.pruebaLuces.tipo', 'tipo incorrecto').matches('LUCES'),
    check('pruebas.pruebaMotor', 'prueba motor es obligatorio').not().isEmpty(),
    check('pruebas.pruebaMotor.tipo', 'tipo incorrecto').matches('MOTOR'),
    check('pruebas.pruebaAlineacion', 'prueba alineación es obligatorio').not().isEmpty(),
    check('pruebas.pruebaAlineacion.tipo', 'tipo incorrecto').matches('ALINEACION'),
    check('pruebas.pruebaContaminacion', 'prueba contaminación es obligatorio').not().isEmpty(),
    check('pruebas.pruebaContaminacion.tipo', 'tipo incorrecto').matches('CONTAMINACION'),
    check('pruebas.pruebaTrenDelantero', 'prueba tren delantero es obligatorio').not().isEmpty(),
    check('pruebas.pruebaTrenDelantero.tipo', 'tipo incorrecto').matches('TREN_DELANTERO'),
    check('pruebas.pruebaTrenTrasero', 'prueba tren trasero es obligatorio').not().isEmpty(),
    check('pruebas.pruebaTrenTrasero.tipo', 'tipo incorrecto').matches('TREN_TRASERO'),
    check('pruebas.pruebaCinturones', 'prueba cinturones es obligatorio').not().isEmpty(),
    check('pruebas.pruebaCinturones.tipo', 'tipo incorrecto').matches('CINTURONES'),
    check('pruebas.pruebaMatafuego', 'prueba matafuego es obligatorio').not().isEmpty(),
    check('pruebas.pruebaMatafuego.tipo', 'tipo incorrecto').matches('MATAFUEGO'),
    //check('puntajeTotal', 'Puntaje total es obligatorio').not().isEmpty(),
    //check('puntajeTotal', 'Puntaje total tiene que ser un número del 1 al 10').isNumeric(),
    //check('resultado', 'Resultado es obligatorio').not().isEmpty(),
    check('observaciones', 'Puntaje total es obligatorio').optional().not().isEmpty(),
    validarCampos
], evaluacionesPost);

module.exports= router;