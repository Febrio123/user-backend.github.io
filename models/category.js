'use strict';
const {
  Model
} = require('sequelize');
const { validate } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.hasOne(models.Product, { foreignKey: "categoryId" })
    }
  }
  Category.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      validate: {
        notNull: {
          msg: "id Tidak boleh kosong"
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "nama category Tidak boleh kosong"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
    freezeTableName: true,
    timestamps: false
  });
  return Category;
};