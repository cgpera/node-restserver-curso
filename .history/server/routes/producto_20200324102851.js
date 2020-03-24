const express = require('express');
const { verificaToken } = require('../middlewares/autenticacion');

let app = express();

let Producto = require('../models/producto');
let Usuario = require('../models/usuario');
let Categoria = require('../models/categoria');

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
//  Crear un producto
//===============================

app.post('/producto', verificaToken, (req, res) => {

    let body = req.body;
    // let usuario = req.body.usuario;
    // Usuario.findById(usuario, (err, usuarioDB) => {
    //     if (err) {
    //         res.status(500).json({
    //             ok: false,
    //             err
    //         });
    //     }
    //     if (!usuarioDB) {
    //         return res.status(400).json({
    //             ok: false,
    //             err: {
    //                 message: 'El usuario no es válido'
    //             }
    //         });
    //     }
    // });

    // let categoria = req.body.categoria;
    // Categoria.findById(categoria, (err, categoriaDB) => {
    //     if (err) {
    //         res.status(500).json({
    //             ok: false,
    //             err
    //         });
    //     }
    //     if (!categoriaDB) {
    //         return res.status(400).json({
    //             ok: false,
    //             err: {
    //                 message: 'La categoría no existe'
    //             }
    //         });
    //     }


    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: true,
        categoria: body.categoria,
        usuario: body.usuario
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

        res.json({
            ok: true,
            producto: productoDB
        })

    });
});

module.exports = app;