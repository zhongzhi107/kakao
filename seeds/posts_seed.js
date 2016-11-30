/* eslint-disable import/unambiguous */

const casual = require('casual');
const random = require('lodash/random');
// const uuid = require('uuid/v1');
const TABLE_NAME = 'posts';

exports.seed = function(knex, Promise) {
  let data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      id: i, // uuid(),
      subject: casual.title,
      content: casual.description,
      user_id: random(1, 10),
    });
  }


  return Promise.all([
    knex(TABLE_NAME).insert(data),
  ]);
};
