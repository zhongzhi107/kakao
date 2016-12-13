import Role from '../models/role';
import ResourceRouter from '../utils/ResourceRouter';

export default ResourceRouter.define({
  collection: (ctx) => ctx.state.role.managers(),
  name: 'managers',
  setup(router) {
    router.use(async (ctx, next) => {
      ctx.state.role = await Role.where({id: ctx.params.role_id}).fetch();
      await next();
    });
    router.crud();
  },
});

// export default roles;
