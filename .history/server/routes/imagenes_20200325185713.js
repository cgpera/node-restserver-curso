const express = require('express');

const fs = require('fs');

let app = express();

app.get('/:tipo/:img', (req, res) => {

    let tipo = req.params.tipo;
    let img = req.params.img;

    let pathImg = `/uploads/${ tipo }/${ img }`;

    res.sendFile


})