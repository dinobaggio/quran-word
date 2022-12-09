import _ from 'lodash'
import {
  list as listUsers,
  detail as detailUsers,
  create as createUsers,
  update as updateUsers,
  destroy as deleteUsers
} from '../../handler/users/crud'
import validateNotfound from '../../libs/middlewares/validators/validateNotfound'
import models from '../../models'

const { Users } = models

export async function list(req, res, next) {
  try {
    let params = {
      page: Number(req.query?.page || 1) ,
      paginate: Number(req.query?.paginate || 10),
      keyword: req.query?.keyword || ''
    }

    const { docs, total, pages } = await listUsers(params)

    return res.status(200).json({
      message: req.t('message.success'),
      meta: {
        total,
        pages,
        page: params.page,
        paginate: params.paginate,
      },
      data: docs
    })
  } catch (err) {
    return next(err)
  }
}

export async function create(req, res, next) {
  try {
    const { name, email, password } = req.body
    const data = {
      name,
      email,
      password
    }

    const user = await createUsers(data)

    return res.status(201).json({
      message: req.t('message.success_save'),
      data: _.omit(user?.dataValues, ['password'])
    })
  } catch (err) {
    return next(err)
  }
}

export async function detail(req, res, next) {
  try {
    const { uuid } = req.params
    const { isValid } = await validateNotfound([
      uuid, 
      'uuid',
      Users
    ], req,res)
    if (!isValid) return

    const user = await detailUsers(uuid)

    return res.status(200).json({
      message: req.t('message.success'),
      data: _.omit(user?.dataValues, ['password'])
    })
  } catch (err) {
    return next(err)
  }
}

export async function update(req, res, next) {
  try {
    const { uuid } = req.params
    const { isValid } = await validateNotfound([
      uuid, 
      'uuid',
      Users
    ], req,res)
    if (!isValid) return

    const dataUpdate = {
      name: req.body.name
    }
    const user = await updateUsers(uuid, dataUpdate)

    return res.status(200).json({
      message: req.t('message.success_update'),
      data: _.omit(user?.dataValues, ['password'])
    })
  } catch (err) {
    return next(err)
  }
}

export async function destroy(req, res, next) {
  try {
    const { uuid } = req.params
    const { isValid } = await validateNotfound([
      uuid, 
      'uuid',
      Users
    ], req,res)
    if (!isValid) return
    
    await deleteUsers(uuid)
    return res.status(200).json({
      message: req.t('message.success_delete')
    })
  } catch (err) {
    return next(err)
  }
}