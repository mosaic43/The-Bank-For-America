const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        database: 'the_bank_for_america',
    }
});

const knexfile = require('../knexfile');


const env = process.env.NODE_ENV || 'production';
const configOptions = knexfile[env];

module.exports = knex(configOptions); 