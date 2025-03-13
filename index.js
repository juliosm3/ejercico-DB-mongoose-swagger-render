const express = require('express');
const { dbConnection } = require('./config/config');
const routes = require('./routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./docs');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

console.log('MONGO_URI:', process.env.MONGO_URI);

app.use(express.json());
app.use("/", routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

dbConnection();

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));