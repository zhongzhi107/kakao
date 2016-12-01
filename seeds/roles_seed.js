const TABLE_NAME = 'roles';

exports.seed = function(knex, Promise) {
  let data = [
    {name: 'admin', description: '超级管理员'},
    {name: 'manager', description: '经理'},
    {name: 'sales', description: '销售'},
    {name: 'editor', description: '编辑'},
  ];

  return Promise.all([
    knex(TABLE_NAME).insert(data),
  ]);
};
