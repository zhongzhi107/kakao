/* eslint-disable import/unambiguous */

const casual = require('casual');
const TABLE_NAME = 'tags';

exports.seed = function(knex, Promise) {
  let data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      name: casual.word,
    });
  }

  return Promise.all([
    knex(TABLE_NAME).insert(data),
  ]);
};
