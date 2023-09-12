const mongoose= require('mongoose');

const dbConnect= async() => {
    const DB_URI= process.env.DB_URI;

    try {
        await mongoose.connect(DB_URI);
    
        console.log('Conectado a la BD');
    } catch {
        console.log(error);
        throw new Error('Error al conectar a la BD');
    }
    

}

module.exports= {dbConnect};