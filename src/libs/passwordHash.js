import bcrypt from 'bcrypt'

export const getHash = (password) => {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)

  return hash
}

export const compareHash = (password, hash) => {
  const valid = bcrypt.compareSync(password, hash)
  return valid
}