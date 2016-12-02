'use strict';

const TABLE_NAME = 'modules';

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable(TABLE_NAME, function(table) {
      table.comment('功能模块表');
      table.increments();
      table.string('name', 20).notNullable().comment('模块名称');
      table.string('description').nullable().comment('模块描述');
      // table.integer('parent_id').notNullable().defaultTo(0).comment('模块描述');
    table.timestamps(true, true);
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(TABLE_NAME);
};
