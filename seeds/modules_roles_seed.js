// 关联表的命名要按被关联表名称正序连接
const TABLE_NAME = 'modules_roles';

exports.seed = function(knex, Promise) {
  let data = [
    {role_id: 1, module_id: 1, module_right: 1680},
    {role_id: 1, module_id: 2, module_right: 1680},
    {role_id: 1, module_id: 3, module_right: 1680},
    {role_id: 2, module_id: 1, module_right: 1680},
    {role_id: 2, module_id: 2, module_right: 1680},
    {role_id: 3, module_id: 1, module_right: 2},
    {role_id: 3, module_id: 2, module_right: 2},
  ];

  return Promise.all([
    knex(TABLE_NAME).insert(data),
  ]);
};
