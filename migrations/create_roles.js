'use strict';

const TABLE_NAME = 'roles';

exports.up = function(knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, function(table) {
    table.comment('用户角色表');
    table.increments();
    table.string('name', 50).nullable().comment('角色名称');
    table.string('description').nullable().comment('角色描述');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(TABLE_NAME);
};
