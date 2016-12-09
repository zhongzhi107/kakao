export default (Model) => {
  return async (ctx) => {
    let result;
    let id = ctx.params.id;

    await new Model({id})
      .destroy()
      .then(() => {
        result = {code: 0, message: '删除成功'};
      })
      .catch((e) => {
        console.log('===error==', e);
        result = {code: 1, message: '删除失败'};
      });

    ctx.body = result;
  };
};
