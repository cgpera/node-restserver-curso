const express = require('express');

const fs = require('fs');

let app = express();

app.get('/imagenes/:tipo/:img', (req, res) => {

    let tipo = req.params.tipo;
    let img = req.params.img;


})