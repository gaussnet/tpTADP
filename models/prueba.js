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

/*
PruebaSchema.methods.toJSON= function() {
    const{_id, ...prueba}= this.toObject();
    return prueba;
}
*/

module.exports= model('Prueba', PruebaSchema);