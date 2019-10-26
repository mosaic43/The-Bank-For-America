
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('checkingaccount').del()
    .then(function () {
      // Inserts seed entries
      return knex('checkingaccount').insert([
        {userid: 1, checkingaccountnumber: 1112019004, checkingaccountbalance: 20000, deposits: 5, deductions: 2, supportsoverdraft: true},
        {userid: 2, checkingaccountnumber: 1112019005, checkingaccountbalance: 200000, deposits: 7, deductions: 5, supportsoverdraft: true},
        {userid: 3, checkingaccountnumber: 1112019006, checkingaccountbalance: 2000000, deposits: 10, deductions: 5, supportsoverdraft: true}
      ]);
    });
};
