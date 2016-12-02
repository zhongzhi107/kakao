import bookshelf from './base';
import User from './user';
import Tag from './tag';

/**
 * @class Post
 * @extends bookshelf.Model
 */
export default class extends bookshelf.Model {
  /**
   * 依赖表，删除时依据此项删除关联表中对应的数据
   * @static {array}
   */
  static dependents = ['tags'];

  /**
   * 表名称
   * @return {string}
   */
  get tableName() {
    return 'posts';
  }

  /**
   * One-to-many
   * @return {bookshelf.Collection}
   */
  user() {
    return this.belongsTo(User);
  }

  /**
   * Many-to-many
   * @return {bookshelf.Collection}
   */
  tags() {
    return this.belongsToMany(Tag);
  }
};
