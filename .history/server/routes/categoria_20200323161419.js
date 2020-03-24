const express = require("express");
const _ = require("underscore");

let Categoria = require("../models/categoria");

// const verifica = require('../middlewares/autenticacion').verificaToken;
const {
    verificaToken,
    verificaAdmin_Role
} = require("../middlewares/autenticacion");

const app = express();

//===============================
// Mostrar todas las categorías
//===============================

app.get("/categoria", verificaToken, (req, res) => {
    //    Categoria.find({}, "nombre usuario")
    Categoria.find({})
        .exec((err, categorias) => {
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

//===============================
// Cambiar una categoría
//===============================

app.get("/categoria/:id", verificaToken, (req, res) => {
    let id = req.params.id;

    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err //: err
            });
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No se encontró la categoría o el ID no es correcto'
                }
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});


//===============================
//  Crear una categoría
//===============================

app.post("/categoria", [verificaToken, verificaAdmin_Role], (req, res) => {
    let body = req.body;
    let usuario = req.usuario;

    let categoria = new Categoria({
        nombre: body.nombre,
        usuario: usuario // usuario._id da el mismo resultado
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err //: err
            });
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No se pudo crear la categoría'
                }
            })
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});

//===============================
// Cambiar una categoría
//===============================

app.put("/categoria/:id", [verificaToken, verificaAdmin_Role], function(req, res) {
    let id = req.params.id;
    // let body = _.pick(req.body, ["nombre"]);

    // o bien...

    let body = {
        nombre: body.nombre
    }

    //opts = { new: true, runValidators: true }
    opts = { new: true, useFindAndModify: false };

    Categoria.findByIdAndUpdate(id, body, opts, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});


//===============================
// Borrar una categoría
//===============================

app.delete("/categoria/:id", [verificaToken, verificaAdmin_Role], function(req, res) {
    let id = req.params.id;
    //    let body = _.pick(req.body, ["nombre"]);

    //opts = { new: true, runValidators: true }
    opts = { new: true, useFindAndModify: false };
    Categoria.findByIdAndRemove(id, opts, (err, categoriaBorrada) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaBorrada) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Id de categoría no existente'
                }
            })
        }

        res.json({
            ok: true,
            message: 'categoría borrada'
                //            categoria: categoriaBorrada  
                // devuelvo un mensaje en lugar del ítem borrado
        });
    });
});


module.exports = app;