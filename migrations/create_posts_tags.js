/* eslint-disable import/unambiguous */

const TABLE_NAME = 'posts_tags';

exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists(TABLE_NAME, function(table) {
    table.comment('文章标签关联表');
    table.string('post_id', 36).nullable().comment('文章ID');
    table.string('tag_id', 36).nullable().comment('标签ID');
    table.unique(['post_id', 'tag_id']);
  // }).catch(function(error) {
  //   console.log('=======', error);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(TABLE_NAME);
};
