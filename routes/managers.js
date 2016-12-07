import Manager from '../models/manager';

export default (router) => router
  .get('/managers/:id', async (ctx) => {
    let result;
    await Manager
      .findById(ctx.params.id, {withRelated: ['modules']})
      .then((managers) => {
        // console.log(roles.related('managers').relatedData.target);
        result = managers.toJSON();
      })
      .catch((e) => {
        console.log(e);
        if (e instanceof Manager.NotFoundError) {
          result = {};
        }
      });
      // 手动删除关联信息
      // await ManagerRole.where('manager_id', 100).destroy();
      // // 手动插入一条测试数据
      // await new ManagerRole({manager_id: 100, role_id: 101}).save();
    ctx.body = result;
  });
