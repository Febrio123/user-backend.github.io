'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category, { foreignKey: "categoryId" })
    }
  }
  Product.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "name product harus diisi"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "price product harus diisi"
        }
      }
    },
    description: DataTypes.TEXT,
    categoryId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: {
          tableName: 'Category'
        },
        key: 'id'
      },
      validate: {
        isInt: true,
        isExist: (value) => {
          return sequelize.models.Category.findByPk(value)
            .then((el) => {
              if (!el) {
                throw new Error('Category tidak ditemukan')
              }
            })
        }
      }
    },
    image: DataTypes.STRING,
    countReview: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
    freezeTableName: true,
    timestamps: false
  });
  return Product;
};