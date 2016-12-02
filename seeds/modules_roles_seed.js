const TABLE_NAME = 'roles_modules';

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
