const express = require('express');
const fileUpload = require('express-fileupload');

const Usuario = require('../models/usuario');

const app = express();

// default options
app.use(fileUpload());

app.put('/upload/:tipo/:id', function(req, res) {

    let tipo = req.params.tipo;
    let id = req.params.id;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400)
            .json({
                ok: false,
                err: {
                    message: 'No se ha seleccionado ningún archivo'
                }
            });
    }

    // Valida tipo de archivo
    let tiposValidos = ['usuarios', 'productos'];
    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400)
            .json({
                ok: false,
                err: {
                    message: 'Los tipos de archivo permitidos son ' + tiposValidos.join(', ')
                }
            });

    }

    // The name of the input field (i.e. "archivo") is used to retrieve the uploaded file
    let archivo = req.files.archivo;
    let nombre = archivo.name.split('.');
    let extension = nombre[nombre.length - 1]
        // Extensiones permitidas
    let extensionesPermitidas = ['jpg', 'png', 'jpeg', 'gif'];

    if (extensionesPermitidas.indexOf(extension) < 0) {
        return res.status(400)
            .json({
                ok: false,
                err: {
                    message: 'Las extensiones de archivo permitidas son ' + extensionesPermitidas.join(', '),
                    ext: extension
                }
            });
    }

    // Cambiar nombre al archivo para que sea único
    let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extension}`

    // Use the mv() method to place the file somewhere on your server
    archivo.mv(`uploads/${tipo}/${nombreArchivo}`, (err) => {
        if (err)
            return res.status(500)
                .json({
                    ok: false,
                    err
                });

        res.json({
            ok: true,
            message: 'Archivo subido correctamente'
        });
    });
});

module.exports = app;