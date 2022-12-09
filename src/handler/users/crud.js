import _ from 'lodash'
import models from '../../models'

const { Users } = models

export async function list({ page, paginate, keyword }) {
  const { docs, total, pages } = await Users.list({ page, paginate, keyword })
  return {
    docs,
    total,
    pages
  }
}

export async function detail(uuid) {
  const user = await Users.detail(uuid)
  return user  
}
export async function create(data) {
  const user = await Users.create(data)
  return user
}

export async function update(uuid, data) {
  const user = await Users.updateData(uuid, data)
  return user
}

export async function destroy(uuid) {
  await Users.delete(uuid)
}

export default {
  list,
  detail,
  create,
  update,
  destroy
}