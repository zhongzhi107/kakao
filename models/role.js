import Joi from 'joi';
import bookshelf from './base';
import Manager from './manager';
import Module from './module';

/**
 * @class Role
 * @extends bookshelf.Model
 */
export default class extends bookshelf.Model {

  // static fields = Joi.object().keys({
  //   name: Joi.number().required(),
  // });

  /**
   * 依赖表，删除时依据此项删除关联表中对应的数据
   * @static {array}
   */
  static dependents = ['managers', 'modules'];

  /**
   * 自定义字段列表，返回数据时会根据该列表定义的字段返回数据
   * @static {Object}
   */
  static masks = {
    custom: 'id,name',
  };

  /**
   * ID名称
   * @member
   * @return {string}
   */
  // get idAttribute() {
  //   return 'id';
  // }

  /**
   * 表名称
   * @member
   * @return {string}
   */
  get tableName() {
    return 'roles';
  }

  /**
   * 是否包含creted_at和updated_at
   * 默认不包含
   * @member
   * @return {boolean|array}
   */
  get hasTimestamps() {
    return true;
  }

  /**
   * schema验证
   */
  get validate() {
    return Joi.object().keys({
      name: Joi.string().required(),
      description: Joi.string(),
      created_at: Joi.date(),
      updated_at: Joi.date(),
    });
  }

  /**
   * 一对多关系
   * @method
   * @return {bookshelf.Model}
   */
  manager() {
    return this.belongsTo(Manager);
  }

  /**
   * 一对多关系
   * @method
   * @return {bookshelf.Model}
   */
  modules() {
    return this.belongsToMany(Module);
  }

};
