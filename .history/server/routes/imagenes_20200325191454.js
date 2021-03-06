const express = require('express');

const fs = require('fs');
const path = require('path');

let app = express();

app.get('/imagen/:tipo/:img', (req, res) => {

    let tipo = req.params.tipo;
    let img = req.params.img;

    let pathImg = `/uploads/${ tipo }/${ img }`;

    res.sendFile(path.resolve(__dirname, './assets/no-image.jpg'));


})

module.exports = app;