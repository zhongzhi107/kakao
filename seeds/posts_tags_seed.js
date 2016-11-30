/* eslint-disable import/unambiguous */

// const random = require('lodash/random');

const TABLE_NAME = 'posts_tags';

exports.seed = function(knex, Promise) {
  let data = [];
  for (let i = 0; i < 1000; i++) {
    data.push({
      post_id: i+1,
      tag_id: parseInt(i/10+1, 10),
    });
  }

  return Promise.all([
    knex(TABLE_NAME).insert(data),
  ]);
};
