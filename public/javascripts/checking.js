const fs = require('fs');
const mustache = require('mustache');
const express = require('express');
const app = express();
const router = express.Router();

const db = require('../../database');









function calculateTotalDeposits (depositTotal) {
    return db.raw('SELECT * SUM (deposits) FROM checkingaccount')
}

function calculateTotalWithdraws (withdrawTotal) {
    return db.raw('SELECT * SUM (deductions) FROM checkingaccount')
}








module.exports = router; 