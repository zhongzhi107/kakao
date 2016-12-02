import Joi from 'joi';
import bookshelf from './base';
import Role from './role';

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
   * 一对多关系
   * @method
   * @return {bookshelf.Collection}
   */
  roles() {
    return this.belongsToMany(Role);
  }

};
