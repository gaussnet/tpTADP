const Usuario= require('../models/usuario');
const Turno= require('../models/turno')

const emailExiste= async(email='') => {
    //Verificar si el correo existe
    const existeEmail= await Usuario.findOne({email});
    if(existeEmail) {
        throw new Error(`Email ${email} ya existe`);
    }
}

const existeTurnoPorId= async(id) => {
    const existeTurno= await Turno.findById(id);
    if(!existeTurno) {
        throw new Error(`Id ${id} no existe`);
    }
}


module.exports= {
    emailExiste,
    existeTurnoPorId
}