const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

// default options
app.use(fileUpload());

app.put('/upload', function(req, res) {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400)
            .json({
                ok: false,
                err: {
                    message: 'No se ha seleccionado ningún archivo'
                }
            });
    }

    // The name of the input field (i.e. "archivo") is used to retrieve the uploaded file
    let archivo = req.files.archivo;
    let nombreArchivo = archivo.name.split('.');
    let extension = nombreArchivo[nombreArchivo - 1]
    console.log(extension);
    return

    // Extensiones permitidas
    let extensionesPermitidas = ['jpg', 'png', 'jpeg', 'gif'];


    // Use the mv() method to place the file somewhere on your server
    archivo.mv('uploads/filename.jpg', (err) => {
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