const {Schema, model}= require('mongoose');
const PruebaSchema= require('./prueba');

const EvaluacionSchema= Schema({
    fechaYhora: {
        type: Date,
        required: [true, 'Fecha es requerida'],
        unique: true
    },
    matricula: {
        type: String,
        //required: [true, 'Matricula es requerida']
    },
    pruebas: {
        pruebaFrenos: {
            type: Schema.Types.ObjectId,
            //type: PruebaSchema,
            ref: 'Prueba'
        },
        pruebaSuspension: {
            type: Schema.Types.ObjectId,
            ref: 'Prueba'
        },
        pruebaLuces: {
            type: Schema.Types.ObjectId,
            ref: 'Prueba'
        },
        pruebaMotor: {
            type: Schema.Types.ObjectId,
            ref: 'Prueba'
        },
        pruebaAlineacion: {
            type: Schema.Types.ObjectId,
            ref: 'Prueba'
        },
        pruebaContaminacion: {
            type: Schema.Types.ObjectId,
            ref: 'Prueba'
        },
        pruebaTrenDelantero: {
            type: Schema.Types.ObjectId,
            ref: 'Prueba'
        },
        pruebaTrenTrasero: {
            type: Schema.Types.ObjectId,
            ref: 'Prueba'
        },
        pruebaCinturones: {
            type: Schema.Types.ObjectId,
            ref: 'Prueba'
        },
        pruebaMatafuego: {
            type: Schema.Types.ObjectId,
            ref: 'Prueba'
        },
    },
    puntajeTotal: {
        type: Number
    },
    resultado: {
        type: String
    },
    observaciones: {
        type: String
    }

});

module.exports= model('Evaluacion', EvaluacionSchema);