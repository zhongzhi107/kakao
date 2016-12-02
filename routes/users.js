import User from '../models/user';

// User.NotFoundError((e) => {
//   console.log('===', e);
// });

export default (router) => router
  .get('/users', async (ctx) => {
    const users = await User.fetchPage({pageSize: 3});
    // let user = yield User.query({limit: 3}).fetchAll();
    ctx.body = users.toJSON();
  })

  .get('/users/:id', async (ctx) => {
    try {
      // let user = await User.where('id', this.params.id).fetch({
      //   require: true,
      //   // 只返回指定的字段
      //   columns: ['id', 'name'],
      //   // 返回关联表信息
      //   withRelated: 'addresses',
      // });
      const user = await User.findById(ctx.params.id, {
        // 必须返回数据
        // require: true,
        // 只返回指定的字段
        columns: ['id', 'first_name'],
        // 返回关联表信息
        withRelated: ['posts', 'posts.tags'],
        // withRelated: [{
        //   addresses: function(query) {query.columns('id');}
        //   // addresses: {
        //   //   columns: ['location', 'address']
        //   // }
        // }]
      });
      // ctx.body = user.related('addresses').toJSON();
      ctx.body = user.toJSON();
    } catch (e) {
      console.log(e);
      if (e instanceof User.NotFoundError) {
        ctx.body = {};
      }
    }
  })

  .post('/users', async (ctx) => {
    let result;
    await User
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

  .put('/users/:id', async (ctx) => {
    const user = await User.update({
      name: ctx.request.name,
    }, {
      id: ctx.params.id,
    });
    ctx.body = user.toJSON();
  })

  .delete('/users/:id', async (ctx) => {
    let result;
    let id = ctx.params.id;

    await new User({id})
      .destroy()
      .then(() => {
        result = {code: 0, message: '用户删除成功'};
      })
      .catch((e) => {
        console.log('===error==', e);
        result = {code: 1, message: '用户删除失败'};
      });

    ctx.body = result;
  });
