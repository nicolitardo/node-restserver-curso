const express = require('express');
const fs = require('fs');
const path = require('path');

const { verificaTokenImg } = require('../middlewares/autenticacion');

const app = express();


app.get('/imagen/:tipo/:img', verificaTokenImg, (req, res) => {
    let tipo = req.params.tipo;
    let img = req.params.img;
    let pathImagen = path.resolve(__dirname, `../../uploads/${ tipo }s/${ img }`);
    let pathAMostrar = '';
    if (fs.existsSync(pathImagen)) {
        pathAMostrar = pathImagen;
    } else {
        pathAMostrar = path.resolve(__dirname, '../assets/no-image.jpg');
    }
    res.sendFile(pathAMostrar);

});











module.exports = app;