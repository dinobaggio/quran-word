import loginHandler from '../../handler/auth/login'

export async function login(req, res, next) {
  try {
    const { email, password } = req.body
    await loginHandler({
      email,
      password
    }, req, res)
  } catch(err) {
    return next(err)
  }
}