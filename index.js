const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routers')
const logger = require('morgan');

const app = express();

//configuración de mongoos para conectarse al a bd
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/prueba-api', { useUnifiedTopology: true }, { useNewUrlParser: true });
// Habilitar body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
    // Habilitar Cors.
app.use(cors());
// Logger
app.use(logger("dev"));

app.use('/api', routes()); // usamos routes.js
app.listen(3002, function() {
    console.log('Servidor en Ejecución');
})