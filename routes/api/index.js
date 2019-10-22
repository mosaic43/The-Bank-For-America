const express = require('express');
const router = express.Router();
const accountRoute = require('./account')
// const checkingaccountRoute = require('./checkingaccount')
// const savingsaccountRoute = require('./savingsaccount')


router.use('/account', accountRoute)


module.exports = router;