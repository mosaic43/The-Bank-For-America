
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('account', table => {
          table.increments('userid').primary()
          table.string('firstName')
          table.string('lastName')
          table.string('userPassword')
          table.boolean('enableoverdraft')
          table.timestamps(true, true)
        })
      ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('ideas')
      ])
};
