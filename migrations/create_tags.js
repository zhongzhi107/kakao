'use strict';

const TABLE_NAME = 'tags';

exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists(TABLE_NAME, function(table) {
    table.comment('标签表');
    table.increments();
    table.string('name', 36).nullable().comment('标签名称');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(TABLE_NAME);
};
