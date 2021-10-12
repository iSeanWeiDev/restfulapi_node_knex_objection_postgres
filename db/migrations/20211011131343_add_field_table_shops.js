exports.up = async (knex) => {
  await knex.schema.table('shops', (table) => {
    table.string('access_token');
  });
};

exports.down = async (knex) => {
  await knex.schema.table('shops', (table) => {
    table.dropColumn('access_token');
  });
};
