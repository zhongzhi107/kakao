exports.up = function(knex, Promise) {
  return knex.schema
  // .createTable('managers_roles', function(table) {
  //   table.comment('用户角色关联表');
  //   table.integer('manager_id').notNullable().comment('用户ID');
  //   table.integer('role_id').notNullable().comment('角色ID');
  //   // table.unique(['manager_id', 'role_id']);
  // })
  .createTable('managers', function(table) {
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
  })
  .createTable('modules_roles', function(table) {
    table.comment('角色模块关联表');
    table.integer('role_id').notNullable().comment('角色ID');
    table.integer('module_id').notNullable().comment('模块ID');
    table.integer('module_right').notNullable().comment('模块权限');
    // table.unique(['role_id', 'module_id']);
  })
  .createTable('modules', function(table) {
    table.comment('功能模块表');
    table.increments();
    table.string('name', 20).notNullable().comment('模块名称');
    table.string('description').nullable().comment('模块描述');
    // table.integer('parent_id').notNullable().defaultTo(0).comment('模块描述');
    table.timestamps(true, true);
  })
  .createTable('posts_tags', function(table) {
    table.comment('文章标签关联表');
    table.string('post_id', 36).nullable().comment('文章ID');
    table.string('tag_id', 36).nullable().comment('标签ID');
    table.unique(['post_id', 'tag_id']);
  })
  .createTable('posts', function(table) {
    table.comment('文章表');
    table.string('id', 36).primary().notNull();
    table.string('subject', 50).nullable().comment('文章标题');
    table.string('content', 1000).nullable().comment('文章内容');
    table.string('user_id', 36).nullable().comment('所属用户ID');
    table.timestamps(true, true);
  })
  .createTable('roles', function(table) {
    table.comment('用户角色表');
    table.increments();
    table.string('name', 50).nullable().comment('角色名称');
    table.string('description').nullable().comment('角色描述');
    table.integer('manager_id').notNullable().comment('管理员ID');
    table.timestamps(true, true);
  })
  .createTable('tags', function(table) {
    table.comment('标签表');
    table.increments();
    table.string('name', 36).nullable().comment('标签名称');
    table.timestamps(true, true);
  })
  .createTable('users', function(table) {
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
  return knex.schema
    .dropTableIfExists('managers_roles')
    .dropTableIfExists('managers')
    .dropTableIfExists('modules_roles')
    .dropTableIfExists('modules')
    .dropTableIfExists('posts_tags')
    .dropTableIfExists('posts')
    .dropTableIfExists('roles')
    .dropTableIfExists('tags')
    .dropTableIfExists('users');
};
