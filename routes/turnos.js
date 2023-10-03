const express= require('express');
const { turnosGet, turnosPost } = require('../controllers/turnos');

const router= express.Router();

router.get('/', turnosGet);
router.post('/', turnosPost);

module.exports= router;