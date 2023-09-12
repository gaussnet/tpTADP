require('dotenv').config();
//const express= require('express');
//const cors= require('cors');
//const dbConnect= require('./config/mongo');

/*
const app= express();

app.use(cors());

const port= process.env.PORT || 3000

app.use('/api', require('./routes/turnos'));
app.use('/api', require('./routes/evaluaciones'));

app.listen(port, () => {
    console.log(`APP escuchando en puerto ${port}`);
});

dbConnect();
*/

const Server = require('./models/server');

const server= new Server();

server.listen();