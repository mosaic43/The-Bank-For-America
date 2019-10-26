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

const fetch = require("node-fetch");
var apiUrl = "http://localhost:3002/api/account"


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
  console.log(req.user)

  res.send(mustache.render(accountPageTemplate, { test: "hello this is a test" }))

})


router.get('/userAccount/:"userAccount"', function (req, res) {
    getUserAccount(req.params.userAccount)
        .then(function (user) {
            res.send(mustache.render(userpageTemplate), {userAccountHTML: renderUserAccount(user)})
        })
})

router.get('/userAccount/firstName', function (req, res) {
  getUserAccount(req.params.userAccount)
      .then(function (user) {
          res.send(mustache.render(userpageTemplate), {userAccountHTML: renderUserAccount(user)})
      })
})

router.get('/', function (req, res) {
    res.send('Hello')
})

// var accountUser = {
//   firstName: "Jon",
//   lastName: "Snow",
// };

var userId = 201903;
var userInfo = []
// function getUser(id) {
//   //fetch(apiUrl + '/userAccount/' + id)
//   fetch("http://localhost:3002/api/account/userAccount/201903")
//   .then(function(response) {
//     userInfo = response;
//     console.log(userInfo)
//   }).catch(err => {
//     console.error(err);
//   })

// }
// getUser(userId)

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


app.get('/welcomeu/:firstName', function (req, res) {
  getUserName(req.params.firstName)
    .then(function (account) {
      res.send(mustache.render(accountPageTemplate, { firstNameHTML: "test" }))
      // res.send(mustache.render(homepageTemplate, { cohortsListHTML: renderAllCohorts(allCohorts) }))
    })
    .catch(function (err) {
      res.status(404).send('username not found')
    })
})


function renderUserName (account) {
  return `<h1>${account.firstName}</h1>`
}

function getUserName (firstName) {
  return db.raw('SELECT * FROM account WHERE firstName = ?', [firstName])
    .then(function (results){
      if (results.length !== 1) {
        throw null
      } else {
        return results[0]
      }
    })
}

  module.exports = router; 