import loginHandler from '../../handler/auth/login'

export async function login(req, res, next) {
  try {
    const { email, password } = req.body
    const token = await loginHandler({
      email,
      password
    }, req, res)
    if (!token) return
    return res.status(200).json({ message: req.t('message.success'), token })
  } catch(err) {
    return next(err)
  }
}