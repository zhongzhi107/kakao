'use strict';

const TABLE_NAME = 'managers';

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable(TABLE_NAME, function(table) {
      table.comment('管理员用户表');
      table.increments();
      table.string('account', 50).nullable().comment('登录账号');
      table.string('password', 50).nullable().comment('登录密码');
      table.string('nickname', 50).nullable().comment('用户昵称');
      table.string('mobile', 20).nullable().unique().comment('手机号码');
      table.timestamp('last_login_at').defaultTo(knex.fn.now())
        .comment('上次登录时间');
      table.integer('login_count').defaultTo(0).comment('登录次数');
      table.enu('status', ['active', 'disabled']).defaultTo('active')
        .comment('账号状态');
      table.timestamps(true, true);
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(TABLE_NAME);
};
