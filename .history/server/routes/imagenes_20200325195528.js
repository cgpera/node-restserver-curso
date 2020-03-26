const express = require('express');

const fs = require('fs');
const path = require('path');

const {} = require('../middlewares/autenticacion');

let app = express();

app.get('/imagen/:tipo/:img', (req, res) => {

    let tipo = req.params.tipo;
    let img = req.params.img;

    let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${img}`);
    if (fs.existsSync(pathImagen)) {
        res.sendFile(pathImagen);
    } else {
        let pathImg = `/uploads/${tipo}/${img}`;
        res.sendFile(path.resolve(__dirname, '../assets/no-image.jpg'));
    }


})

module.exports = app;