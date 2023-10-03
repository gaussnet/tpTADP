const {Schema, model}= require('mongoose');

const TurnoSchema= Schema({
    fechaYhora: {
        type: Date,
        required: [true, 'Fecha es requerida'],
        unique: true
    },
    matricula: {
        type: String,
        //required: [true, 'Matricula es requerida']
    },
    confirmado: {
        type: Boolean,
        default: false
    }
});

TurnoSchema.methods.toJSON= function() {
    const {__v, ...turno}= this.toObject();
    return turno;
}


module.exports= model('Turno', TurnoSchema);