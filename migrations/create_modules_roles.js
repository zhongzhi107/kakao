'use strict';

const TABLE_NAME = 'roles_modules';

exports.up = function(knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, function(table) {
    table.comment('角色模块关联表');
    table.integer('role_id').notNullable().comment('角色ID');
    table.integer('module_id').notNullable().comment('模块ID');
    table.integer('module_right').notNullable().comment('模块权限');
    table.unique(['role_id', 'module_id']);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(TABLE_NAME);
};
