import listUsers from '../../handler/users/list'
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