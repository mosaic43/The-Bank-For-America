// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost:5432/the_bank_for_america',
    migrations: {
      directory: './knex/migrations'
    },
    seeds: {
      directory: './knex/seeds/dev'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: 'postgres://localHost:5432/the_bank_for_america',
    migrations: {
      directory: './knex/migrations'
    },
    seeds: {
      directory: './knex/seeds/production'
    },
    useNullAsDefault: true
  },
};
