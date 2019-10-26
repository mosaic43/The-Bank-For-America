
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('savingsaccount').del()
    .then(function () {
      // Inserts seed entries
      return knex('savingsaccount').insert([
        {userid: 1, savingsaccountnumber:222019004, deposits: 1, withdraws: 5, savingsaccountbalance: 10000},
        {userid: 2, savingsaccountnumber:222019005, deposits: 24, withdraws: 2, savingsaccountbalance: 245000},
        {userid: 3, savingsaccountnumber:222019006, deposits: 124, withdraws: 0, savingsaccountbalance: 10000000}
      ]);
    });
};
