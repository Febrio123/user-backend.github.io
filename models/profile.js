'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Profile.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  Profile.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: {
          tableName: 'User'
        },
        key: 'id'
      }, validate:
      {
        isExist(value) {
          sequelize.models.User.findByPk(value).then(el => {
            if (!el) {
              //return "Id tidak ditemukan"
              throw new Error("id tidak ditemukan")
            }
          })
        }

      }
    }
  }, {
    sequelize,
    modelName: 'Profile',
    freezeTableName: true,
    timestamps: false
  });
  return Profile;
};