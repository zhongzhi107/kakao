import Role from '../models/role';
import ResourceRouter from '../utils/ResourceRouter';
import managers from './managers';

const roles = ResourceRouter.define(Role.collection());

// 下面的代码等同于上面一行代码
// export default ResourceRouter.define({
//   collection: Role.collection(),
//   setup(router) {
//     router.create();
//     router.read();
//     router.update();
//     router.destroy();
//   },
// });

// const managers = ResourceRouter.define({
//   collection: (ctx) => ctx.state.role,
//   // setup(router) {
//   //   // get post instance in context
//   //   router.use(async (ctx, next) => {
//   //     ctx.state.role = await Role.findById(ctx.params.role_id, {require: true});
//   //     await next();
//   //   });
//   // },
// });

// YES! Thanks to koa-router, nested router is supported
roles.use('/roles/:roles_id(\\d+)', managers.routes());

export default roles;
