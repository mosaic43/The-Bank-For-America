const fs = require('fs');
const mustache = require('mustache');
const express = require('express');
const app = express();
const router = express.Router();

const db = require('../../database');




function calculateTotalSavingsDeposits (savingDepositTotal) {
    return db.raw('SELECT SUM (deposits) FROM savingsaccount')
}

function calculateTotalSavingsWithdraws (savingsWithdrawTotal){
    return db.raw('SELECT SUM (deposits) FROM savingsaccount')
}


module.exports = router; 