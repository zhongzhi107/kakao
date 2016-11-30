'use strict';

const TABLE_NAME = 'users';

exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists(TABLE_NAME, function(table) {
    table.comment('用户表');
    table.string('id', 36).primary().notNull();
    table.enu('status', ['active', 'disabled']).nullable().comment('账号状态');
    table.string('first_name').nullable().comment('姓');
    table.string('last_name').nullable().comment('名');
    table.string('email').unique().notNull().comment('电子邮件');
    table.string('password').nullable().comment('用户密码');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(TABLE_NAME);
};
