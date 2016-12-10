import {isObject} from 'util';

export default (Model) => {
  return async (ctx) => {
    const query = ctx.query;
    const where = {};
    const fetchParams = {};
    const {id} = ctx.params;
    let result;

    if (query.withRelated) {
      fetchParams.withRelated = query.withRelated;
    }

    console.log('====query:', query);
    // Get one record
    if (id) {
      where.id = id;
    } else if (query.where) {
      // curl --globoff http://localhost:3000/api/roles?where=id\&where=\>\&where=1
      if(Array.isArray(query.where)) {
        Model = Model.where.apply(Model, query.where);
      } else if(isObject(query.where)) {
        Model = Model.where(query.where);
      }
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
