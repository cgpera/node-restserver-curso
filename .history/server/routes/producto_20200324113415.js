const express = require('express');
const { verificaToken } = require('../middlewares/autenticacion');

let app = express();

let Producto = require('../models/producto');

//===============================
// Mostrar todos los productos
//===============================

app.get('/producto', verificaToken, (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Producto.find({ disponible: true })
        .skip(desde)
        .limit(limite)
        .sort('nombre')
        .populate('usuario', 'nombre email')
        .populate('categoria', 'nombre')
        .exec((err, productos) => {

            if (err) {
                res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                productos
            })

        })
});

//===============================
// Mostrar un producto
//===============================

app.get("/producto/:id", verificaToken, (req, res) => {
    let id = req.params.id;

    Producto.findById(id, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err //: err
            });
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No se encontró el producto, el ID no es correcto'
                }
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        });
    });
});

//===============================
//  Crear un producto
//===============================

app.post('/producto', verificaToken, (req, res) => {

    let body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: true,
        categoria: body.categoria,
        usuario: req.usuario._id
    });

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err //: err
            });
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No se pudo crear el producto'
                }
            })
        }

        res.status(201).json({
            ok: true,
            producto: productoDB
        })

    });

});

//===============================
// Cambiar un producto
//===============================

app.put("/producto/:id", verificaToken, function(req, res) {

    let id = req.params.id;
    let body = req.body;

    let newBody = {
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: true,
        categoria: body.categoria,
        usuario: body.usuario
    }

    opts = { new: true, useFindAndModify: false };

    Producto.findByIdAndUpdate(id, newBody, opts, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            producto: productoDB
        });
    });
});


//===============================
// Borrar un producto
//===============================

app.delete("/producto/:id", verificaToken, function(req, res) {
    let id = req.params.id;

    let deshabilitarProducto = {
        disponible: false
    }

    opts = { new: true, useFindAndModify: false };
    Producto.findByIdAndUpdate(id, deshabilitarProducto, opts, (err, productoBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Producto no existente'
                }
            })
        }

        res.json({
            ok: true,
            message: 'producto deshabilitado'
        });
    });
});


module.exports = app;