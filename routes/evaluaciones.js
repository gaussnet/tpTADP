const express= require('express');
const { check } = require('express-validator');
const { evaluacionesGet, evaluacionesGetPorMatricula, evaluacionesPost } = require('../controllers/evaluaciones');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router= express.Router();

router.get('/', [
    validarJWT,
    validarCampos
], evaluacionesGet);


router.get('/:matricula', evaluacionesGetPorMatricula);

router.post('/', [
    validarJWT,
    check('matricula', 'Matrícula es obligatorio').not().isEmpty(),
    check('pruebas', 'pruebas es obligatorio').not().isEmpty(),
    check('pruebas.pruebaFrenos', 'prueba frenos es obligatorio').not().isEmpty(),
    check('pruebas.pruebaFrenos.tipo', 'tipo incorrecto').matches('FRENOS'),
    check('pruebas.pruebaFrenos.puntaje', 'Debe ser un número entre 1 y 10').not().isEmpty().isInt({min: 1, max: 10}),
    check('pruebas.pruebaSuspension', 'prueba suspensión es obligatorio').not().isEmpty(),
    check('pruebas.pruebaSuspension.tipo', 'tipo incorrecto').matches('SUSPENSION'),
    check('pruebas.pruebaSuspension.puntaje', 'Debe ser un número entre 1 y 10').not().isEmpty().isInt({min: 1, max: 10}),
    check('pruebas.pruebaLuces', 'prueba luces es obligatorio').not().isEmpty(),
    check('pruebas.pruebaLuces.tipo', 'tipo incorrecto').matches('LUCES'),
    check('pruebas.pruebaLuces.puntaje', 'Debe ser un número entre 1 y 10').not().isEmpty().isInt({min: 1, max: 10}),
    check('pruebas.pruebaMotor', 'prueba motor es obligatorio').not().isEmpty(),
    check('pruebas.pruebaMotor.tipo', 'tipo incorrecto').matches('MOTOR'),
    check('pruebas.pruebaMotor.puntaje', 'Debe ser un número entre 1 y 10').not().isEmpty().isInt({min: 1, max: 10}),
    check('pruebas.pruebaAlineacion', 'prueba alineación es obligatorio').not().isEmpty(),
    check('pruebas.pruebaAlineacion.tipo', 'tipo incorrecto').matches('ALINEACION'),
    check('pruebas.pruebaAlineacion.puntaje', 'Debe ser un número entre 1 y 10').not().isEmpty().isInt({min: 1, max: 10}),
    check('pruebas.pruebaContaminacion', 'prueba contaminación es obligatorio').not().isEmpty(),
    check('pruebas.pruebaContaminacion.tipo', 'tipo incorrecto').matches('CONTAMINACION'),
    check('pruebas.pruebaContaminacion.puntaje', 'Debe ser un número entre 1 y 10').not().isEmpty().isInt({min: 1, max: 10}),
    check('pruebas.pruebaTrenDelantero', 'prueba tren delantero es obligatorio').not().isEmpty(),
    check('pruebas.pruebaTrenDelantero.tipo', 'tipo incorrecto').matches('TREN_DELANTERO'),
    check('pruebas.pruebaTrenDelantero.puntaje', 'Debe ser un número entre 1 y 10').not().isEmpty().isInt({min: 1, max: 10}),
    check('pruebas.pruebaTrenTrasero', 'prueba tren trasero es obligatorio').not().isEmpty(),
    check('pruebas.pruebaTrenTrasero.tipo', 'tipo incorrecto').matches('TREN_TRASERO'),
    check('pruebas.pruebaTrenTrasero.puntaje', 'Debe ser un número entre 1 y 10').not().isEmpty().isInt({min: 1, max: 10}),
    check('pruebas.pruebaCinturones', 'prueba cinturones es obligatorio').not().isEmpty(),
    check('pruebas.pruebaCinturones.tipo', 'tipo incorrecto').matches('CINTURONES'),
    check('pruebas.pruebaCinturones.puntaje', 'Debe ser un número entre 1 y 10').not().isEmpty().isInt({min: 1, max: 10}),
    check('pruebas.pruebaMatafuego', 'prueba matafuego es obligatorio').not().isEmpty(),
    check('pruebas.pruebaMatafuego.tipo', 'tipo incorrecto').matches('MATAFUEGO'),
    check('pruebas.pruebaMatafuego.puntaje', 'Debe ser un número entre 1 y 10').not().isEmpty().isInt({min: 1, max: 10}),
    check('observaciones', 'Observaciones es obligatorio').optional().not().isEmpty(),
    validarCampos
], evaluacionesPost);

module.exports= router;