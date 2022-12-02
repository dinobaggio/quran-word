const { Model } = require('sequelize')
const { getHash } = require('../libs/passwordHash')

module.exports = (sequelize, DataTypes) => {
  /** Users */
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     *
     * @static
     * @memberof Users
     */
    static associate() {
      /** define association here */
      // this.addHook('beforeFind', (options) => {
      //   if (!options.attributes) {
      //     // eslint-disable-next-line no-param-reassign
      //     options.attributes = this.getBasicAttribute()
      //   }
      // })
    }
  }

  Users.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue('password', getHash(value))
      },
    },
    created_by: DataTypes.BIGINT,
    deleted_by: DataTypes.BIGINT,
    updated_by: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'Users',
    underscored: true,
    paranoid: true,
    tableName: 'users',
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    deletedAt: 'deleted_at',
  })

  // eslint-disable-next-line func-names
  /**
   * get array of attribute that can be called multiple times
   * @memberof Users
   * @function getBasicAttribute
   * @returns {Array} array of attributes
   */

  return Users
}
