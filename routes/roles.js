import Role from '../models/role';
// import ManagerRole from '../models/manager_role';

export default (router) => router
  .get('/roles/:id', async (ctx) => {
    let result;
    await Role
      .findById(ctx.params.id, {withRelated: ['managers']})
      .then((roles) => {
        // console.log(roles.related('managers').relatedData.target);
        result = roles.toJSON();
      })
      .catch((e) => {
        console.log(e);
        if (e instanceof Role.NotFoundError) {
          result = {};
        }
      });
      // 手动删除关联信息
      // await ManagerRole.where('manager_id', 100).destroy();
      // // 手动插入一条测试数据
      // await new ManagerRole({manager_id: 100, role_id: 101}).save();
    ctx.body = result;
  })

  .post('/roles', async (ctx) => {
    let result;
    await Role
      .create(ctx.request.body)
      .then(() => {
        result = {code: 0, message: '新增成功'};
      })
      .catch((e) => {
        console.log(e);
        if (e.name === 'ValidationError') {
          result = {code: 1, message: '参数错误： ' + e.details[0].message};
        }
      });
    ctx.body = result;
  })

  .put('/roles/:id', async (ctx) => {
    const id = ctx.params.id;
    const name = ctx.request.body.name;

    let result;

    await Role
      .update({name}, {id})
      // 下面 2 种写法也能更新
      // await Role.forge({id}).save({name})
      // await new Role({id}).save({name})
      .then(() => result = {code: 0, message: '数据更新成功'})
      .catch((e) => {
        console.log(e);
        result = {code: 1, message: '数据更新失败'};
      });
    ctx.body = result;
  })

  .delete('/roles/:id', async (ctx) => {
    let result;
    let id = ctx.params.id;

    await new Role({id})
      .destroy()
      .then(() => {
        result = {code: 0, message: '删除成功'};
      })
      .catch((e) => {
        console.log('===error==', e);
        result = {code: 1, message: '删除失败'};
      });

    ctx.body = result;
  });
