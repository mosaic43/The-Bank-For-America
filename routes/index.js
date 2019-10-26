
const env = 'production';
const config = require('../knexfile')[env];
const knex = require('knex')(config);
const express = require('express');
const router = express.Router();
//var path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
//const moment = require('moment')
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

////Passport
var passport = require('passport')
const auth = require('./../auth');

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

////

const app = express();

app.use(cookieParser());

router.get('/', (req, res) => {
    res.render('index/myaccount');
  });

router.post('/login',
passport.authenticate('local', { successRedirect: '/welcome',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);
router.get('/auth/google', passport.authenticate('google', {
   scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));

// router.get('/auth/google/callback',
//     passport.authenticate('google', {failureRedirect: '/'}),
//     (req, res) => {
//       console.log("in callback")
//         req.session.token = req.user.token;
//         res.redirect('/');
//     }
// );
router.get('/auth/google/callback',
    passport.authenticate('google', (req, res) => {
        res.redirect('/welcome');
    })
    );

router.get('/logout', (req, res) => {
    req.logout();
    req.session = null;
    res.redirect('/');
});
  router.get('/about', (req, res) => {
    res.render('index/about');
  });
  
// router.get('/myaccount',
//   (req, res) => {
//       res.render('/myaccount')
//   }
// );
router.get('/welcome',
  passport.authenticate('google'),
  (req, res) => {
      res.redirect('/')
  }
);
// router.get('/myaccount',
// passport.authenticate('google', (req, res) => {

//   res.render('index/myaccount');
// })
// );

router.get('/myaccount', function(req, res) {
  knex.select('*').from('transaction').then(function(data) {
      res.render('index/mytransactions', {
         transactions: data
      });
  });
});
// router.get('/welcome',
//     passport.authenticate('google', passport.authenticate('google', (req, res) => {
//       res.send('reached callback URI')
//     })),
//     (req, res) => {
//       console.log(req.user.token)
//         req.session.token = req.user.token;
//         res.redirect('/billPay');
//     }
// );
  router.get('/billpay', (req, res) => {
    res.render('index/billpay', {data: res.data});
  });
 
  router.get('/transfers', function(req, res) {
    knex.select('*').from('transfer').then(function(data) {
        res.render('index/transfers', {
           data: data
        });
    });
});
router.get('/mytransactions', function(req, res) {
  knex.select('*').from('transaction').then(function(data) {
      res.render('index/mytransactions', {
         transactions: data
      });
  });
});
router.put('/transfer', function (req, res) {
  var newTransaction = req.body
    var nextId = 0
  knex.select('*').from('transaction').then(function(data) {
   nextId = data.length + 1
})
  .then(function(){
    console.log(newTransaction)
    if (incoming === 0 ) {
      newTransaction.under = true;
    }
   newTransaction.id = nextId;
   newTransaction.ts = new Date().toISOString().slice(0, 19).replace('T', ' ');
    knex.insert(newTransaction).returning('*').into('transaction').then(function(mytransfers) {
      res.render('index/myaccount', {  
        data: mytransfers
           });
    });
  })

});


//accountpage
// router.get('/myaccount', function(req, res) {
//   knex.select().from('account').then(function(data) {
//       console.log(data)
//       res.render('index/myaccount', {
//           data: data.length
//           });
//       });
//   });


//   router.get('/myaccount/', function (req, res) {
//     knex.select().from('account').where({userid: req.params.userid}).then(function(data2) {
//       res.render('index/myaccount', {  
//      data: data2.length
//         });
//     });
// });

// router.post('/account', function (req, res) {
//   knex.insert(req.body).returning('*').into('account').then(function(inputaccountdata) {
//     res.render('index/myaccount', {  
//       data: inputaccountdata.length
//          });
//   });
// });

// router.put('/:userid', function (req, res) {
//   knex('account').where({userid: req.params.userid}).update(req.body).returning('*').then(function(changeaccountdata) {
//     res.render('index/myaccount', {  
//       data: changeaccountdata.length
//          });
//   });
// });

// router.get('/myaccount', function(req, res) {
//   knex.select().from('checkingaccount').then(function(getcheckingdata) {
//     res.render('index/myaccount', {  
//       data: getcheckingdata.length
//          });
//   });
// });

// router.get('/myaccount', function (req, res) {
//   knex.select().from('checkingaccount').where({userid: req.params.userid}).then(function(getusercheckingdata) {
//     res.render('index/myaccount', {  
//    data: getusercheckingdata.length
//       });
//   });
// });



// router.get('/myaccount', function(req, res) {
//   db.select().from('savingsaccount').then(function(getsavingsdata) {
//     res.render('index/myaccount', {  
//       data: getsavingsdata.length
//          });
//   });
// });

// router.get('/myaccount/:userid', function (req, res) {

//   knex.select('*')
// .from('checkingaccount')
// .joinRaw('natural full join savingsaccount', 'savingsaccount.userid', 'checkingaccount.userid')
// //.leftJoin('customer_user AS cu', 'cu.user_id', 'u.id')
// .where('checkingaccount.userid', '=', req.params.userid)
// .then(function(userData) {
//   console.log(userData)
//   res.render('index/myaccount', {  
//  data: userData
//     });
// });
// });

//   knex.select('*').from('savingsaccount').joinRaw('checkingaccount full join userid', 'savingsaccount.userid').where({userid: req.params.userid}).then(function(userData) {
//     console.log(userData)
//     res.render('index/myaccount', {  
//    data: userData.length
//       });
//   });
// });




  module.exports = router;