import User from '../models/user';
import Post from '../models/post';
import {k as knex} from '../models/base';

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
      .create({first_name: ctx.request.body.first_name})
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
      // .fetch()
      .then(() => {
        result = {code: 0, message: '用户删除成功'};
        // return knex.select('id').from('posts').whereIn('user_id', id);
        // return knex('posts').whereIn('user_id', id).del();
        return Post.where('user_id', id).fetchAll(); //
      })
      // 删posts表中的关联数据
      .then((posts) => {
        // console.log(posts.toJSON());
        let postIds = [];
        posts.forEach((item) => {
          postIds.push(item.id);
          // 从数据库中删除post
          item.destroy();
        });
        // TODO 使用ORM方式删除，避免自己操作数据库
        return knex('posts_tags').whereIn('post_id', postIds).del();
      })
      .catch((e) => {
        console.log('===error==', e);
        result = {code: 1, message: '用户删除失败'};
      });

    ctx.body = result;
  });
