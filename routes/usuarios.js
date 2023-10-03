const express= require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPost} = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const {emailExiste} = require('../helpers/db-validators');

const router= express.Router();

router.get('/', usuariosGet);

router.post('/', [
    check('nombre', 'Nombre es obligatorio').not().isEmpty(),
    check('apellido', 'APellido es obligatorio').not().isEmpty(),
    check('password', 'Password debe tener al menos 6 caracteres').isLength({min: 6}),
    check('email', 'El email no es válido').isEmail(),
    check('email').custom(emailExiste),
    validarCampos
], usuariosPost);

module.exports= router;