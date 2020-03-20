const express = require('express');
const router = express.Router();

const connection = require('../database');

router.get('/', (req, res) => {
   connection.query('SELECT * FROM product', (err, rows) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM product WHERE id = ?', [id], (err, 
        rows) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

router.post('/products', (req, res) => {
     const {
        name,
        value,
        stock,
        status
    } = req.body;
    connection.query('INSERT INTO product (name, value, stock, status) VALUES (?, ?, ?, ?)', [name, value, 
        stock, status], (err, result) => {
        console.log(result);
        if (err) {
            res.json({ status: 'error', msg: err.message });
        } else {
            res.json({ status: 'ok', result: result })
        }
    });
});


module.exports = router;