import listUsers from '../../handler/users/list'
import createUsers from '../../handler/users/create'

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