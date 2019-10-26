
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('account').del()
    .then(function () {
      // Inserts seed entries
      return knex('account').insert([
        {userid: 1, firstName: 'Sansa', lastName: 'Stark', userAccount: 'stark', userPassword: 'Welcome2IronBank'},
        {userid: 2, firstName: 'Daenerys', lastName: 'Targaryen', userAccount: 'dtargaryen', userPassword: 'Welcome2IronBank'},
        {userid: 3, firstName: 'Cersei', lastName: 'Lannister', userAccount: 'clannister', userPassword: 'Welcome2IronBank'}
      ]);
    });
};
