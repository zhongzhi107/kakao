const casual = require('casual');
const TABLE_NAME = 'managers';

exports.seed = function(knex, Promise) {
  let data = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      account: casual.username,
      password: casual.password,
    });
  }

  return Promise.all([
    knex(TABLE_NAME).insert(data),
  ]);
};
