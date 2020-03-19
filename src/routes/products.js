const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM product', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM product WHERE id = ?', [id], (err, 
        rows, fields) => {
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
    mysqlConnection.query(`INSERT INTO product (name, value, stock, status) VALUES (?, ?, ?, ?)`, [name,
    value, stock, status], (err, result) => {
        if (err) {
            res.json({ status: 'error', msg: err.message });
        } else {
            res.json({ status: 'ok', result: result.insertId })
        }
    });
});


module.exports = router;