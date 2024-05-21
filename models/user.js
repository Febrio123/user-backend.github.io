'use strict';
const {
  Model,
} = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Profile, { foreignKey: 'userId' })
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [6]
      }
    },

    roles_id: {
      allowNull: true,
      type: DataTypes.UUID,
      references: {
        model: {
          tableName: "Roles"
        },
        key: 'id'
      }
    }
  }, {

    hooks: {
      beforeCreate: async (User) => {
        if (User.password) {
          const salt = await bcrypt.genSaltSync(10)
          User.password = bcrypt.hashSync(User.password, salt)
          if (!User.roles_id) {
            const roleUser = await sequelize.models.Roles.findOne({
              where: { name: 'user' }
            })
            User.roles_id = roleUser.id
          }
          if (User.username === 'admin') {
            const roleUser = await sequelize.models.Roles.findOne({
              where: { name: 'admin' }
            })
            User.roles_id = roleUser.id
          }
        }
      }
    },
    sequelize,
    modelName: 'User',
    freezeTableName: true,
    timestamps: false
  });
  //menentukan nilai password apakah sama password yg ada di request body dan database
  User.prototype.correctPassword = async (reqPassword, passwordDb) => {
    return await bcrypt.compareSync(reqPassword, passwordDb)
  }
  return User;
};