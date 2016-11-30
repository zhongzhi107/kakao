import bookshelf from './base';
import User from './user';
import Tag from './tag';

export default bookshelf.Model.extend({
  // 表名称
  tableName: 'posts',

  user() {
    return this.belongsTo(User);
  },

  tags() {
    return this.belongsToMany(Tag);
  },
});
