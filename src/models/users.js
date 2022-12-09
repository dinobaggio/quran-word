const { Model, Op } = require('sequelize')
const { getHash } = require('../libs/passwordHash')
const sequelizePaginate = require('sequelize-paginate')

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
    static associate(models) {
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
    created_by: DataTypes.INTEGER,
    deleted_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER,
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

  Users.list = async function({
    page,
    paginate,
    keyword
  }) {
    let condition = {}
    if (keyword) {
      condition['name'] = {
        [Op.like]: `%${keyword}%`
      }
    }
    return this.paginate({
      page,
      paginate,
      attributes: {
        exclude: ['password']
      },
      where: condition
    })
  }

  Users.detail = async function (uuid) {
    const user = await this.findOne({
      where: {
        uuid
      }
    })
    return user  
  }

  Users.updateData = async function (uuid, data) {
    await this.update(data, {
      where: {
        uuid
      },
      returning: true
    })
    const user = await this.findOne({
      where: { uuid }
    })
  
    return user
  }

  Users.delete = async function (uuid) {
    await this.destroy({
      where: {
        uuid
      }
    })
  }

  sequelizePaginate.paginate(Users)

  return Users
}
