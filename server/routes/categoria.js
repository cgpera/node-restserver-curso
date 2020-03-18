const express = require("express");
const _ = require("underscore");

let Categoria = require("../models/categoria");

// const verifica = require('../middlewares/autenticacion').verificaToken;
const {
    verificaToken,
    verificaAdmin_Role
} = require("../middlewares/autenticacion");

const app = express();

app.get("/categoria", verificaToken, (req, res) => {
    Categoria.find({}, "nombre usuario").exec((err, categorias) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err //: err
            });
        }
        res.json({
            ok: true,
            categorias: categorias
        });
    });
});

app.post("/categoria", [verificaToken, verificaAdmin_Role], (req, res) => {
    let body = req.body;
    let usuario = req.usuario;

    let categoria = new Categoria({
        nombre: body.nombre,
        usuario
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err //: err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});

app.put("/categoria/:id", [verificaToken, verificaAdmin_Role], function (
    req,
    res
) {
    let id = req.params.id;
    let body = _.pick(req.body, ["nombre"]);

    //opts = { new: true, runValidators: true }
    opts = { new: true, useFindAndModify: false };

    Categoria.findByIdAndUpdate(id, body, opts, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});

app.delete("/categoria/:id", [verificaToken, verificaAdmin_Role], function (req, res) {
    let id = req.params.id;
    //    let body = _.pick(req.body, ["nombre"]);

    //opts = { new: true, runValidators: true }
    opts = { new: true, useFindAndModify: false };
    Categoria.findByIdAndRemove(id, opts, (err, categoriaBorrada) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!categoriaBorrada) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Categoría no existente'
                }
            })
        }

        res.json({
            ok: true,
            categoria: categoriaBorrada
        });
    });
});


module.exports = app;
