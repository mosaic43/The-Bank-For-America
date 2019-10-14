
const express = require('express');
const router = express.Router();
const db = require('../../database');

router.get('/', function(req, res) {
    db.select().from('account').then(function(data) {
        res.send(data)
    });
});

router.post('/', function (req, res) {
    db.insert(req.body).returning('*').into('account').then(function(data) {
        res.send(data);
    });
});

router.put('/:userid', function (req, res) {
    db('account').where({userid: req.params.userid}).update(req.body).returning('*').then(function(data) {
        res.send(data);
    });
});



module.exports = router; 
