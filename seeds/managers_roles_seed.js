const TABLE_NAME = 'managers_roles';

exports.seed = function(knex, Promise) {
  let data = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      manager_id: i+1,
      role_id: parseInt(i/3+1, 10),
    });
  }

  return Promise.all([
    knex(TABLE_NAME).insert(data),
  ]);
};
