// const casual = require('casual');
const TABLE_NAME = 'modules';

exports.seed = function(knex, Promise) {
  let data = [
    {id: 1, name: '广告管理'},
    {id: 2, name: '产品管理'},
    {id: 3, name: '用户管理'},
  ];

  return Promise.all([
    knex(TABLE_NAME).insert(data),
  ]);
};
