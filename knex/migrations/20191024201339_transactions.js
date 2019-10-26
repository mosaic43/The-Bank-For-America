
exports.up = function(knex) {
        knex.schema.createTable('transactions', table => {
          table.increments('id').primary()
          table.integer('deposits')
          table.integer('withdraws')
        })
};

exports.down = function(knex) {
        knex.schema.dropTable('ideas')
};
