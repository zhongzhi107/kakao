export default (Model) => {
  return async (ctx) => {
    const query = ctx.query;
    const where = {};
    const fetchParams = {};
    const {id} = ctx.params;
    let result;

    if (id) {
      where.id = id;
    }

    if (query.withRelated) {
      fetchParams.withRelated = query.withRelated;
    }

    // get all records
    // Order by support
    if (query.sort) {
			let direction = query.direction || 'ASC';
			direction = direction.toLowerCase();
			Model = Model.orderBy(query.sort, direction);
    }

    // Limit support

    // Offset support

    await Model
      .where(where)
      .fetchAll(fetchParams)
      .then((items) => {
        result = items.toJSON();
      })
      .catch((e) => {
        console.log(e);
      });
    ctx.body = result;
  };
};
