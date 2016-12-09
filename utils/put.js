export default (Model) => {
  return async (ctx) => {
    const id = ctx.params.id;
    let result;

    await Model
      .update(ctx.request.body, {id})
      // 下面 2 种写法也能更新
      // await Role.forge({id}).save({name})
      // await new Role({id}).save({name})
      .then(() => result = {code: 0, message: '数据更新成功'})
      .catch((e) => {
        console.log(e);
        result = {code: 1, message: '数据更新失败'};
      });
    ctx.body = result;
  };
};
