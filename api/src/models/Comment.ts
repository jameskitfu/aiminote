import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../utils/database';

export class Comment extends Model {
  public id!: string;
  public article_id!: string;
  public author_name!: string;
  public content!: string;
  public readonly created_at!: Date;
}

Comment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    article_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'articles',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    author_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [1, 100],
        notEmpty: true,
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 1000],
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    tableName: 'comments',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    indexes: [
      {
        fields: ['article_id'],
      },
      {
        fields: ['created_at'],
      },
    ],
  }
);