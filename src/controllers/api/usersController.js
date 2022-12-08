import listUsers from '../../handler/users/list'
import createUsers from '../../handler/users/create'
import updateUsers from '../../handler/users/update'
import deleteUsers from '../../handler/users/delete'
import detailUsers from '../../handler/users/detail'
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

    await listUsers(params, req, res)
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
    await createUsers(data, req, res)
  } catch (err) {
    return next(err)
  }
}

export async function detail(req, res, next) {
  try {
    const { uuid } = req.params
    const { isValid } = await validateNotfound([uuid, 'uuid'], {
      model: Users,
      req,
      res
    })
    if (!isValid) return

    await detailUsers(uuid, req, res)
  } catch (err) {
    return next(err)
  }
}

export async function update(req, res, next) {
  try {
    const { uuid } = req.params
    const { isValid } = await validateNotfound([uuid, 'uuid'], {
      model: Users,
      req,
      res
    })
    if (!isValid) return

    const dataUpdate = {
      name: req.body.name
    }
    await updateUsers(uuid, dataUpdate, req, res)
  } catch (err) {
    return next(err)
  }
}

export async function destroy(req, res, next) {
  try {
    const { uuid } = req.params
    const { isValid } = await validateNotfound([uuid, 'uuid'], {
      model: Users,
      req,
      res
    })
    if (!isValid) return
    
    await deleteUsers(uuid, req, res)
  } catch (err) {
    return next(err)
  }
}