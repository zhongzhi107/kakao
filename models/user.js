// import Joi from 'joi';
import bookshelf from './base';
import Post from './post';

/**
 * @class User
 */
export default class extends bookshelf.Model {
  /**
   * 依赖表，删除时依据此项删除关联表中对应的数据
   * @static {array}
   */
  static dependents = ['posts'];

  /**
   * @method 表名称
   * @return {string}
   */
  get tableName() {
    return 'users';
  }

  /**
   * 插入新记录时是否自动生成UUID
   * @return {boolean}
   */
  get uuid() {
    return true;
  }


  // 是否包含creted_at和updated_at
  // 默认包含
  // hasTimestamps: [],

  /**
   * 一对多关系
   * @method
   * @return {bookshelf.Collection}
   */
  posts() {
    return this.hasMany(Post);
  }

  // schema验证
  // validate: {
  //   name: Joi.number().required().label('姓名').description('====='),
  // },
};
