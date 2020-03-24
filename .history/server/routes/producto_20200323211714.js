const express = require('express');
const { verificaToken } = require('../middlewares/autenticacion');

let app = express();

let Producto = require('../models/producto');

app.get('/producto', verificaToken, (req, res) => {

    Producto.find({})
        .sort('nombre')
        .populate('usuario', 'nombre email')
        .populate('categoria', 'nombre')
        .exec((err, productoDB) => {

            if (err) {
                res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto: productoDB
            })

        })
});

module.exports = app;