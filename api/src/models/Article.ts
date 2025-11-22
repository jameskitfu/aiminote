import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../utils/database';

export class Article extends Model {
  public id!: string;
  public user_id!: string;
  public title!: string;
  public content!: string;
  public summary!: string;
  public category!: string;
  public tags!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Article.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        len: [1, 200],
        notEmpty: true,
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 500],
        notEmpty: true,
      },
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    tags: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue('tags');
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value: string[]) {
        this.setDataValue('tags', JSON.stringify(value));
      },
    },
  },
  {
    sequelize,
    tableName: 'articles',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        fields: ['user_id'],
      },
      {
        fields: ['category'],
      },
      {
        fields: ['created_at'],
      },
    ],
  }
);