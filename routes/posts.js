import Post from '../models/post';

export default (router) => router
  .get('/posts/:id', async (ctx) => {
    let result;
    await Post.findById(ctx.params.id, {
      withRelated: ['user', 'tags'],
    })
    .then((posts) => {
      // ctx.body = user.related('addresses').toJSON();
      result = posts.toJSON();
    })
    .catch((e) => {
      console.log(e);
      if (e instanceof Post.NotFoundError) {
        result = {};
      }
    });
    ctx.body = result;
  });
