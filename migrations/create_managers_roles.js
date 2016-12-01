'use strict';

const TABLE_NAME = 'managers_roles';

exports.up = function(knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, function(table) {
    table.comment('用户角色关联表');
    table.integer('manager_id').notNullable().comment('用户ID');
    table.integer('role_id').notNullable().comment('角色ID');
    table.unique(['manager_id', 'role_id']);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(TABLE_NAME);
};
