const express = require("express");
const aplicacion = express();
const rutas = require('./rutas/rutas');
//const db = require('./DB/db');
const cors = require('cors');
//db();
aplicacion.use(express.json({ limit: '50mb' }));
aplicacion.use(
  express.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 1000000,
  }),
);
//
aplicacion.use(cors());
//
aplicacion.use('/', rutas);
module.exports = aplicacion;