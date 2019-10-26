
const env = 'production';
const config = require('../../knexfile')[env];
const knex = require('knex')(config);
const express = require('express');
const router = express.Router();
const db = require('../../database');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
// app.use(bodyParser.json());
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const app = express();

app.use(cookieSession({
    name: 'session',
    keys: ['123']
}));
app.use(cookieParser());


router.get('/userAccount', function(req, res) {
    knex.select().from('account').then(function(data) {
        res.send(data);
    });
});

router.get('/userAccount/:userid', function (req, res) {
    knex.select().from('account').where({userid: req.params.userid}).then(function(data) {
        res.send(data);
        });
    });


router.post('/account', function (req, res) {
    knex.insert(req.body).returning('*').into('account').then(function(data) {
        res.send(data);
    });
});

router.put('/:userid', function (req, res) {
    knex('account').where({userid: req.params.userid}).update(req.body).returning('*').then(function(data) {
        res.send(data);
    });
});
//account rendering -----------------
 function renderAccount (userData) {
     return `<h1> ${userData.firstName} + ${userData.lastName} </h1>`
 }

//---------------------
//account Database queries --------------

// router.get('/myaccount', function(req, res) {
//     knex.select().from('account').then(function(data) {
//         console.log(data)
//         res.render('index/myaccount', {
//             data: data.length
//             });
//         });
//     });









//----------
//end account










































//checking --- move this later
// router.get('/checking', function(req, res) {
//     knex.select().from('checkingaccount').then(function(data) {
//         res.send(data)
//     });
// });

// router.post('/checking', function (req, res) {
//     knex.insert(req.body).returning('*').into('checkingaccount').then(function(data) {
//         res.send(data);
//     });
// });

// router.put('/checking:userid', function (req, res) {
//     knex('checkingaccount').where({userid: req.params.userid}).update(req.body).returning('*').then(function(data) {
//         res.send(data);
//     });
// });



module.exports = router; 
