const express = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const app = express()



app.get('/usuario', function(req, res) {

    let desde = req.query.desde || 0
    desde = Number(desde);

    let limite = req.query.limite || 0
    limite = Number(limite);

    Usuario.find({ estado: true }, 'nombre email estado google role img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err //: err
                })
            }
            Usuario.countDocuments({ estado: true }, (err, conteo) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err //: err
                    })
                }
                res.json({
                    ok: true,
                    usuarios: usuarios,
                    cantidad: conteo
                });
            });

        });
});

app.post('/usuario', function(req, res) {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    })

    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err //: err
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });
})

app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

app.delete('/usuario/:id', function(req, res) {
    let id = req.params.id;
    // poniendo marca de estado en false para indicar borrado
    let cambiaEstado = {
        estado: false
    };
    // borrando físicamente el registro
    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    // Otra opción:
    // cambiando la marca de estado
    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no existente'
                }
            })
        }
        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    });
});

module.exports = app;