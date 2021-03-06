const express = require('express');
let { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion.js');
let app = express();
let Categoria = require('../models/categoria.js');
let Usuario = require('../models/usuario.js');


// ======================
// Mostrar todas las categorias
// ======================
app.get('/categoria', verificaToken, (req, res) => {


    Categoria.find()
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categorias) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Categoria.count((err, conteo) => {

                res.json({
                    ok: true,
                    categorias,
                    total: conteo
                });
            });
        });
});


// ======================
// Mostrar la categoria x id
// ======================
app.get('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;

    Categoria.findById(id, (err, categoriaBuscada) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaBuscada) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Categoria no encontrada'
                }
            });
        }

        res.json({
            ok: true,
            usuario: categoriaBuscada
        });

    });

});


// ======================
// Crear nueva categoria
// ======================
app.post('/categoria', verificaToken, (req, res) => {
    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {
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
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });

});


// ======================
// Actualizar categoria
// ======================
app.put('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let descCategoria = {
        descripcion: body.descripcion
    }

    Categoria.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, categoriaDB) => {
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

// ======================
// Borrar categoria
// ======================
app.delete('/categoria/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaBorrada) => {
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
                    mesage: 'el id no existe'
                }
            });
        }

        res.json({
            ok: true,
            mesage: 'Categoria borrada'
        });

    });
});


module.exports = app;