/* eslint-disable import/unambiguous */

const TABLE_NAME = 'posts';

exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists(TABLE_NAME, function(table) {
    table.comment('文章表');
    table.string('id', 36).primary().notNull();
    table.string('subject', 50).nullable().comment('文章标题');
    table.string('content', 1000).nullable().comment('文章内容');
    table.string('user_id', 36).nullable().comment('所属用户ID');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(TABLE_NAME);
};
