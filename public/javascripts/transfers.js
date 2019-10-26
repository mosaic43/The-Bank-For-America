const fs = require('fs');
const express = require('express');
const app = express();
const router = express.Router();

// router.get('/', (req, res) => {
//     Story.find({amount:100})
//       .populate('user')
//       .sort({date:'desc'})
//       .then(balance => {
//         res.render('index', {
//             balance: balance
//         });
//       });
//   });

var amount = 100