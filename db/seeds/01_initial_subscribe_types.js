exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('subscribe_types')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('subscribe_types').insert([
        {
          name: 'Annual',
          keycode: 'ANNUAL',
          price: 59,
          base_price: 79,
          recommended: true,
          created_at: new Date()
        },
        {
          name: 'Quarterly',
          keycode: 'QUARTERLY',
          price: 69,
          base_price: 79,
          recommended: false,
          created_at: new Date()
        },
        {
          name: 'Monthly',
          keycode: 'MONTHLY',
          price: 79,
          base_price: 79,
          recommended: false,
          created_at: new Date()
        }
      ]);
    });
};
