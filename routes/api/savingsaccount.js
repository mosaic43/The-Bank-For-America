const express = require('express');
const router = express.Router();
const db = require('../../database');

router.get('/savings', function(req, res) {
    db.select().from('savingsaccount').then(function(data) {
        res.send(data)
    });
});

router.post('/savings', function (req, res) {
    db.insert(req.body).returning('*').into('savingsaccount').then(function(data) {
        res.send(data);
    });
});

router.put('/savings:userid', function (req, res) {
    db('savingsaccount').where({userid: req.params.userid}).update(req.body).returning('*').then(function(data) {
        res.send(data);
    });
});



module.exports = router; 
