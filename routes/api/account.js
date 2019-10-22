
const express = require('express');
const router = express.Router();
const db = require('../../database');



//account info
router.get('/userAccount', function(req, res) {
    db.select().from('account').then(function(data) {
        res.send(data)
    });
});

router.get('/userAccount/:userid', function (req, res) {
    db.select().from('account').where({userid: req.params.userid}).then(function(data) {
        res.send(data);
    });
});

router.post('/account', function (req, res) {
    db.insert(req.body).returning('*').into('account').then(function(data) {
        res.send(data);
    });
});

router.put('/:userid', function (req, res) {
    db('account').where({userid: req.params.userid}).update(req.body).returning('*').then(function(data) {
        res.send(data);
    });
});
//account rendering -----------------
 function renderAccount (userData) {
     return `<h1> ${userData.firstName} + ${userData.lastName} </h1>`
 }

//---------------------
//account Database queries --------------


//----------
//end account



//checking --- move this later
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

//end checking ---move later