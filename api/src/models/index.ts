import { User } from './User';
import { Article } from './Article';
import { Comment } from './Comment';

// Define associations
User.hasMany(Article, {
  foreignKey: 'user_id',
  as: 'articles',
  onDelete: 'CASCADE',
});

Article.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'author',
});

Article.hasMany(Comment, {
  foreignKey: 'article_id',
  as: 'comments',
  onDelete: 'CASCADE',
});

Comment.belongsTo(Article, {
  foreignKey: 'article_id',
  as: 'article',
});

export { User, Article, Comment };