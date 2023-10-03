const {response}= require('express');
const bcryptjs= require('bcryptjs');
const Usuario= require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');

const login= async(req, res= response) => {

    const {email, password}= req.body;

    try {
        //Verificar que email exista
        const usuario= await Usuario.findOne({email});
        if(!usuario) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - correo'
            });
        }

        //Verificar contraseña
        const validPassword= await bcryptjs.compare(password, usuario.password);
        if(!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - password'
            });
        }

        //Generar JWT
        const token= await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })

    } catch(error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error auth'
        })
    }

}

module.exports= {
    login
}