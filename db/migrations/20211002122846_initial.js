const fs = require('fs');
const path = require('path');

exports.up = async (knex) => {
  const dumpSqlFile = path.resolve(__dirname, '../dump.sql');
  const initialSchema = fs.readFileSync(dumpSqlFile, 'utf-8');
  await knex.raw(initialSchema);
};

exports.down = function (knex) {
  console.log('Down migrations not supported');
};
