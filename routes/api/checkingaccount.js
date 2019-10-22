
const express = require('express');
const router = express.Router();
const db = require('../../database');


router.get('/checking', function(req, res) {
    db.select().from('checkingaccount').then(function(data) {
        res.send(data)
    });
});

router.post('/checking', function (req, res) {
    db.insert(req.body).returning('*').into('checkingaccount').then(function(data) {
        res.send(data);
    });
});

router.put('/checking:userid', function (req, res) {
    db('checkingaccount').where({userid: req.params.userid}).update(req.body).returning('*').then(function(data) {
        res.send(data);
    });
});



module.exports = router; 
