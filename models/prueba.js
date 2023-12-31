const {Schema, model}= require('mongoose');

const PruebaSchema= Schema({
    tipo: {
        type: String,
        required: [true, 'Tipo es requerida'],
        enum: ['FRENOS', 'SUSPENSION', 'LUCES', 'MOTOR', 'ALINEACION', 'CONTAMINACION', 'TREN_DELANTERO', 'TREN_TRASERO', 'CINTURONES', 'MATAFUEGO']
    },
    puntaje: {
        type: Number,
        required: [true, 'Puntaje es requerido']
    }
});


module.exports= model('Prueba', PruebaSchema);