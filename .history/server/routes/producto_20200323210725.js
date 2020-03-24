const express = require('express');
const { verificaToken } = require('../middlewares/autenticacion');

let app = express();

let Producto = require('../models/producto');



module.exports = app;