const express = require('express');
const { verificaToken } = require('../middlewares/autenticacion');

let app = express();

let Producto = require('../models/producto');

app.get('/producto', verificaToken, (req, res) => {

    Producto.find({})
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
})

module.exports = app;