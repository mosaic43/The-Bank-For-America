const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        database: 'the_bank_for_america'
    }
});

module.exports = knex; 