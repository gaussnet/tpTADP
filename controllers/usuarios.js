const {response}= require('express');
const bcryptjs= require('bcryptjs');
const Usuario= require('../models/usuario');

const usuariosGet= async(req, res= response) => {

    const total= await Usuario.countDocuments();
    const usuarios= await Usuario.find();

    res.json({
        total,
        usuarios
    });
}

const usuariosPost= async (req, res= response) => {

    const {nombre, apellido, password, email}= req.body;
    
    const usuario= new Usuario({nombre, apellido, password, email});

    //cifrar la contraseña
    const salt= bcryptjs.genSaltSync();     //Cantidad de iteraciones para cifrar. Por defecto está en 10, sino se le puede especificar
    usuario.password= bcryptjs.hashSync(password, salt);

    //Guardar en BD
    await usuario.save();     //Guarda la instancia en MongoDB

    res.status(201).json({
        usuario
    });
}

module.exports= {
    usuariosGet,
    usuariosPost
}