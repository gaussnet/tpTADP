const Usuario= require('../models/usuario');

const emailExiste= async(email='') => {
    //Verificar si el correo existe
    const existeEmail= await Usuario.findOne({email});
    if(existeEmail) {
        throw new Error(`Email ${email} ya existe`);
    }
}


module.exports= {
    emailExiste
}