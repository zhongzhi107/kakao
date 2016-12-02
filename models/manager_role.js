import Joi from 'joi';
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
   * schema验证
   */
  get validate() {
    return {
      manager_id: Joi.integer().required(),
      role_id: Joi.integer().required(),
    };
  }

};
