const express= require('express');
const cors= require('cors');
//const { dbConnection } = require('../database/config');
const {dbConnect}= require('../config/mongo');

class Server {

    constructor() {
        this.app= express();
        this.port= process.env.PORT;
        this.usuariosPath= '/api/usuarios';
        this.authPath= '/api/auth';
        this.turnosPath= '/api/turnos';
        this.evaluacionesPath= '/api/evaluaciones';

        //Conexión a base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();
    }

    async conectarDB() {
        await dbConnect();
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //Directorio público
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
        this.app.use(this.turnosPath, require('../routes/turnos'));
        this.app.use(this.evaluacionesPath, require('../routes/evaluaciones'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Escuchando en puerto ${this.port}`);
        });
    }
    
}

module.exports= Server;