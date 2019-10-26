const express = require('express');
const router = express.Router();
//var path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

router.get('/', (req, res) => {
    res.render('index/welcome');
  });
  
  router.get('/myaccount', (req, res) => {
    res.render('index/myaccount');
  });
  
  router.get('/about', (req, res) => {
    res.render('index/about');
  });

  router.get('/billPay', (req, res) => {
    res.render('index/billpay');
  });

  router.get('/transfers', (req, res) => {
    res.render('index/transfers', {
        amount: 100,
        user: 'csmith',
        recipient: 'lfuentes',
        recipientList: [{name: 'jsnow'}, {name: 'astark'}, {name: 'jlannister'}]
    });
  });

  router.get('/mytransactions', (req, res) => {
    res.render('index/mytransactions', {
        currentBalance: 1000,
        transactions: [
          {description: 'at&t', amount: 500, outgoing: false}, 
          {description: 't-mobile', amount: -10, outgoing: true}, 
          {description: '7-11 Gas Station', amount: -300, outgoing: true},
          {description: 'phub', amount: -40, outgoing: true},
          {description: 'paystub', amount: 800, outgoing: false}


        ]
    });
  });

const amount = 100
router.get('/transfers', (req, res) => {
    res.render('index/transfers', {amount: amount});
  });
  module.exports = router;