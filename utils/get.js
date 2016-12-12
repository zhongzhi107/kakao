/**
 * 该文件处理 2 类路由
 *   1. get('/models')
 *   2. get('/models/:id')
 *
 * 对于第 1 类路由，可以接以下几个querystring参数来实现不同的返回
 * 1. withRelated - 获取关联数据
 * 2. where - 根据条件查询数据
 * 3.
 * 4.
 */
import {isObject} from 'util';

export default (Model) => {
  return async (ctx) => {
    const query = ctx.query;
    const fetchParams = {};
    const {id} = ctx.params;
    let result;

    if (query.withRelated) {
      fetchParams.withRelated = query.withRelated;
    }

    // Get one record
    // curl http://localhost:3000/api/roles/2
    if (id) {
      const findById = {};
      findById[Model.idAttribute] = id;
      Model = Model.where(findById);
    } else if (query.where) {
      // curl --globoff http://localhost:3000/api/roles?where=id\&where=\>\&where=1
      if(Array.isArray(query.where)) {
        Model = Model.where(...query.where);
        // Model = Model.where.apply(Model, query.where);
      } else if(isObject(query.where)) {
        // curl --globoff http://localhost:3000/api/roles?where[name]=sales
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

    // Pagination support
    if (query.page || query.page_size) {
      console.log(query);
      // const {page = 1, page_size = 10} = query;
      // console.log(page, pageSize);
      const page = query.page || 1;
      const pageSize = query.page_size || 10;
      await Model
        .fetchPage({
          page,
          pageSize,
          ...fetchParams,
        })
        .then((items) => {
          result = items.toJSON();
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      await Model
        .fetchAll(fetchParams)
        .then((items) => {
          result = items.toJSON();
        })
        .catch((e) => {
          console.log(e);
        });
    }
    ctx.body = result;
  };
};
