/* eslint-disable import/unambiguous */

const casual = require('casual');
// const uuid = require('uuid/v1');

const TABLE_NAME = 'users';

exports.seed = function(knex, Promise) {
  let data = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      id: i, // uuid(),
      first_name: casual.first_name,
      last_name: casual.last_name,
      email: casual.email,
      password: '123456',
      status: 'active',
    });
  }


  return Promise.all([
    knex(TABLE_NAME).insert(data),
  ]);
};
