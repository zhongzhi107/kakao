import bookshelf from './base';
import Post from './post';

export default bookshelf.Model.extend({
  // 表名称
  tableName: 'tags',

  posts() {
    return this.belongsToMany(Post);
  },
});
