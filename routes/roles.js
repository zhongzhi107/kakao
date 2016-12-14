/**
 * 演示创建一个嵌套路由
 */

import Role from '../models/role';
import ResourceRouter from '../utils/router';

// 最简洁的写法
// export default ResourceRouter.define(Role.collection());

const managers = ResourceRouter.define({
  collection: (ctx) => ctx.state.role.managers(),
  name: 'managers',
  setup(router) {
    router
      .use(async (ctx, next) => {
        ctx.state.role = await Role.findById(
          ctx.params.role_id,
          {require: true}
        );
        await next();
      })
      .crud();
  },
});

export default ResourceRouter.define({
  collection: Role.collection(),
  setup(router) {
    router.crud();
    // router.create().read().update().destroy();

    // 使用嵌套路由
    router.use('/roles/:role_id(\\d+)', managers.routes());
  },
});
