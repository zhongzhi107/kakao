// import Joi from 'joi';
import bookshelf from './base';

/**
 * @class
 * @extends bookshelf.Model
 */
export default class extends bookshelf.Model {
  /**
   * 表名称
   * @member
   * @return {string}
   */
  get tableName() {
    return 'managers_roles';
  }

  /**
   * 是否包含creted_at和updated_at
   * 默认包含
   * @member
   * @return {boolean|array}
   */
  get hasTimestamps() {
    return false;
  }

  /**
   * schema验证
   */
  // get validate() {
  //   return {
  //     manager_id: Joi.integer().required(),
  //     role_id: Joi.integer().required(),
  //   };
  // }

};
