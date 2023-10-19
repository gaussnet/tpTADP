const {response}= require('express');
const bcryptjs= require('bcryptjs');
const Usuario= require('../models/usuario');

const usuariosGet= async(req, res= response) => {

    const [total, usuarios]= await Promise.all([
        Usuario.countDocuments(),
        Usuario.find()
    ])

    res.json({
        total,
        usuarios
    });
}

const usuariosPost= async (req, res= response) => {

    const {nombre, apellido, password, email}= req.body;
    
    const usuario= new Usuario({nombre, apellido, password, email});

    //cifrar la contraseña
    const salt= bcryptjs.genSaltSync();     
    usuario.password= bcryptjs.hashSync(password, salt);

    //Guardar en BD
    await usuario.save();     

    res.status(201).json({
        usuario
    });
}

module.exports= {
    usuariosGet,
    usuariosPost
}