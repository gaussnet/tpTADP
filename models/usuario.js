const {Schema, model}= require('mongoose');

const UsuarioSchema= Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre es requerido']
    },
    apellido: {
        type: String,
        required: [true, 'Apellido es requerido']
    },
    password: {
        type: String,
        required: [true, 'Password es requerido']
    },
    email: {
        type: String,
        required: [true, 'Email es requerido'],
        unique: true
    }
});

UsuarioSchema.methods.toJSON= function() {
    const {__v, password, ...usuario}= this.toObject();
    return usuario;
}


module.exports= model('Usuario', UsuarioSchema);
