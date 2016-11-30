import bookshelf from './base';
import Post from './post';

/**
 * @class Tag
 */
export default class extends bookshelf.Model {

  /**
   * 依赖表，删除时依据此项删除关联表中对应的数据
   * @static {array}
   */
  static dependents = ['posts'];

  /**
   * 表名称
   * @return {string}
   */
  get tableName() {
    return 'tags';
  }

  /**
   * One-to-many
   * @return {bookshelf.Collection}
   */
  posts() {
    return this.belongsToMany(Post);
  }
};
