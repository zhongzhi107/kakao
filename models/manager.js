import Joi from 'joi';
import bookshelf from './base';
import Role from './role';
import Module from './module';

/**
 * @class
 * @extends bookshelf.Model
 */
export default class extends bookshelf.Model {
  /**
   * 依赖表，删除时依据此项删除关联表中对应的数据
   * @static {array}
   */
  static dependents = ['roles'];

  /**
   * 自定义字段列表，返回数据时会根据该列表定义的字段返回数据
   * @static {Object}
   */
  static masks = {
    custom: 'account,nickname,role(id,name)',
  };


  /**
   * 表名称
   * @return {string}
   */
  get tableName() {
    return 'managers';
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
    return {
      account: Joi.string().required(),
    };
  }

  /**
   * Many-to-many
   * @method
   * @return {bookshelf.Collection}
   */
  role() {
    return this.hasOne(Role);
  }

  /**
   * Many-to-many
   * @method
   * @return {bookshelf.Collection}
   */
  modules() {
    return this.belongsToMany(Module).through(Role);
  }

};
