import Router from 'koa-router';
import compose from 'koa-compose';
import Collection from 'bookshelf/lib/collection';
import _ from 'lodash';

function parse_args(ori_args, option_defaults = {}) {
  let args = Array.prototype.slice.call(ori_args);
  let none = async (ctx, next) => await next();
  let options = args.pop();
  let middlewares = args;
  middlewares = _.compact(middlewares);
  if (_.isFunction(options)) {
    middlewares = middlewares.concat(options);
    options = {};
  }
  middlewares = _.isEmpty(middlewares) ? [none] : middlewares ;
  options = _.defaults(options, option_defaults);

  return {middlewares, options};
}

/**
 * @class
 */
export default class ResourceRouter extends Router {
  methods = {create: false, read: false, update: false, destroy: false}

  /**
   * @static
   * @param {Object} options
   * @return {Router}
   */
  static define(options) {
    let {collection, setup, ...rest} = options;
    if (options instanceof Function || options instanceof Collection) {
      collection = options;
      options = undefined;
    }
    options = rest || options;
    setup = setup || ((router) => router.crud());
    let router = new this(collection, options);
    setup(router);
    return router;
  }

  /**
   * @constructor
   * @param {Collection} collection
   * @param {Object} options
   */
  constructor(collection, options) {
    options = _.defaults(options, {
      root: '',
      id: '',
      name: '',
    });
    super(options);
    this.collection = collection;
    if (!_.isFunction(collection)) {
      options.model = options.model || collection.model;
      options.id = options.id || options.model.prototype.idAttribute;
      this.collection = (ctx) => collection;
    }
    options.name = options.name || options.model.prototype.tableName;
    options.fields = options.fields ||
      (options.model ? options.model.fields : undefined);
    options.root = options.root || '/' + options.name;
    options.title = options.title || options.name;
    options.description = options.description || options.title;
    options.id = options.id || 'id';
    this.options = options;

    this.pattern = {
      root: options.root || '/',
      item: (options.root ? options.root : '') + '/:' + options.id,
    };
  }

  /**
   * Create a new record
   * @method
   * @return {Object}
   */
  create() {
    // let {options, ...middlewares} = arguments;
    let {collection, pattern} = this;
    this.methods.create = true;
    // create
    this.post(pattern.root, async (ctx) => {
      let attributes = ctx.state.attributes || ctx.request.body;
      if (collection(ctx).relatedData) {
        ctx.state.resource = await collection(ctx).create(attributes);
      } else {
        ctx.state.resource = collection(ctx).model.forge();
        await ctx.state.resource.save(attributes);
      }
      ctx.body = ctx.state.resource;
      ctx.status = 201;
    });
    return this;
  }

  /**
   * Read records
   * @method
   * @return {Object}
   */
  read() {
    this.methods.read = true;
    // let {options, ...middlewares} = arguments;
    // middlewares = _.compact(middlewares);
    // if (_.isFunction(options)) {
    //   middlewares = middlewares.concat(options);
    //   options = {};
    // }
    // middlewares = _.isEmpty(middlewares) ? [async (ctx, next) => await next()] : middlewares ;
    // console.log('====', middlewares);
    let {collection, options: {id}, pattern} = this;

    // read list
    this.get(pattern.root, /*compose(middlewares),*/ async (ctx) => {
      let query = ctx.state.query || collection(ctx).model.forge();
      if (collection(ctx).relatedData) {
        query = query.where({
          [collection(ctx).relatedData.key('foreignKey')]:
          collection(ctx).relatedData.parentId,
        });
      }
      let resources = await query.fetchPage();
      ctx.body = resources.models;
      //  ctx.pagination.length = resources.pagination.rowCount;
    });

    // read item
    this.get(pattern.item, async (ctx) => {
      ctx.body = await collection(ctx)
        .query((q) => q.where({[id]: ctx.params[id]}))
        .fetchOne({required: true});
    });
    return this;
  }

  /**
   * Update record
   * @method
   * @return {Object}
   */
  update() {
    // let {middlewares, options} = parse_args(arguments);
    let {collection, options: {id}, pattern} = this;
    this.methods.update = true;
    const update = async (ctx) => {
      let attributes = ctx.state.attributes || ctx.request.body;
      ctx.state.resource = (
        await collection(ctx)
          .query((q) => q.where({[id]: ctx.params[id]}))
          .fetch({required: true})
      ).first();
      await ctx.state.resource.save(attributes, {patch: true});
      ctx.body = ctx.state.resource;
      ctx.status = 202;
    };
    this.put(pattern.item, update);
    this.patch(pattern.item, update);

    return this;
  }

  /**
   * Remove a record
   * @method
   * @return {Object}
   */
  destroy() {
    // let {middlewares, options} = parse_args(arguments)
    let {collection, pattern, options: {id}} = this;
    this.methods.destroy = true;

    this.del(pattern.item, async (ctx) => {
      ctx.state.resource = await collection(ctx)
        .query((q) => q.where({[id]: ctx.params[id]}))
        .fetchOne({require: true});
      ctx.state.deleted = ctx.state.resource.toJSON();
      await ctx.state.resource.destroy();
      ctx.status = 204;
    });
    return this;
  }

  /**
   * Auto generate CRUD
   * @method
   * @return {Object}
   */
  crud() {
    return this.create().read().update().destroy();
  }
}
