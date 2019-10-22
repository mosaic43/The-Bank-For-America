const fs = require('fs');
const mustache = require('mustache');
const express = require('express');
const app = express();
const router = express.Router();
var css = require('css');

const db = require('../../database');

const userpageTemplate = fs.readFileSync('./templates/userpageTemplate.mustache', 'utf8')
const accountPageTemplate = fs.readFileSync('./templates/accountPage.mustache', 'utf8')
const navBarTemplate = fs.readFileSync('./templates/navBar.mustache', 'utf8')
// const homePage = fs.readFileSync('./home.html', 'utf8')



router.get('/login', function (req, res) {
    console.log(res.data)

    res.send(mustache.render(userpageTemplate))
  })

  //Remove this later
router.get('/nav', function (req, res) {
  res.send(mustache.render(navBarTemplate))
})

router.get('/', function (req, res) {
  console.log(res.data)

  res.send(mustache.render(accountPageTemplate))
})


router.get('/userAccount/:"userAccount"', function (req, res) {
    getUserAccount(req.params.userAccount)
        .then(function (user) {
            res.send(mustache.render(userpageTemplate), {userAccountHTML: renderUserAccount(user)})
        })
})

router.get('/', function (req, res) {
    res.send('Hello')
})

// //Authentication OAuth
// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile'] }));

// app.get('/auth/google/callback', 
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });





function renderUserAccount (account) {
    return `<h1>${account.userAccount}</h1>`
}

const getAllUserAccountsQuery = `
    SELECT * 
    FROM account
`
function getAllUserAccounts() {
    return db.raw(getAllUserAccountsQuery)
} 


function getUserAccount (userAccount){
    return db.raw('SELECT * FROM account Where userAccount = ?', [userAccount])
    .then(function (results){
        if (results.length !== 1) {
          throw null
        } else {
          return results[0]
        }
      })
}









  module.exports = router; 