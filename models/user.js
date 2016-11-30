// import Joi from 'joi';
import bookshelf from './base';
import Post from './post';

export default bookshelf.Model.extend({
  // 表名称
  tableName: 'users',

  // 是否包含creted_at和updated_at
  // 默认包含
  // hasTimestamps: [],

  // 一对多关系
  posts() {
    return this.hasMany(Post);
  },

  // schema验证
  // validate: {
  //   name: Joi.number().required().label('姓名').description('====='),
  // },
});
