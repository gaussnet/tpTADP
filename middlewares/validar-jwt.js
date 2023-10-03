const {response, request}= require('express');
const jwt= require('jsonwebtoken');

const Usuario= require('../models/usuario');

const validarJWT= async (req= request, res= response, next) => {
    const token= req.header('x-token');

    if(!token) {
        return res.status(401).json({
            msg: 'No hay token'
        });
    }

    try {
        const {_id}= jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //Obtener datos de el usuario que corresponde al id
        const usuario= await Usuario.findById(_id);

        if(!usuario) {
            return  res.status(401).json({
                msg: 'Token inválido - usuario no existe en BD'
            });
        }

        req.usuario= usuario;                        

        next();
    } catch(error) {
        res.status(401).json({
            msg: 'Token no válido'
        });
    }

    

    

}

module.exports= {
    validarJWT
}