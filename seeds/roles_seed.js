const TABLE_NAME = 'roles';

exports.seed = function(knex, Promise) {
  let data = [
    {name: 'admin', description: '超级管理员', manager_id: 1},
    {name: 'sales', description: '销售', manager_id: 2},
  ];

  return Promise.all([
    knex(TABLE_NAME).insert(data),
  ]);
};
