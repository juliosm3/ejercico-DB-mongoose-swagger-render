const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Base de datos conectada con éxito');
    } catch (error) {
        console.error('Error al conectar la base de datos:', error);
        throw new Error('Error al iniciar la base de datos');
    }
};

module.exports = { dbConnection };
