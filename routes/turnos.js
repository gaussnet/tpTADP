const express= require('express');
const { check } = require('express-validator');
const { turnosGet, turnosPost, turnosPut } = require('../controllers/turnos');
const { validarCampos } = require('../middlewares/validar-campos');

const router= express.Router();

router.get('/', turnosGet);
router.post('/', turnosPost);
router.put('/:id', [
    check('id', 'ID invalido').isMongoId(),
    check('matricula', 'Matrícula es obligatorio').not().isEmpty(),
    validarCampos
], turnosPut);

//router.put('/:id', turnosPut);


module.exports= router;