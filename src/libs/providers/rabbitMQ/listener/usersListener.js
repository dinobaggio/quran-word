import { consumeMessageAmqp } from ".."
import { QUEUES } from "../../../constant"
import { 
  create as usersCreate,
  update as usersUpdate,
  destroy as usersDestroy
 } from '../../../../handler/users/crud'

async function create(ch) {
  return consumeMessageAmqp(QUEUES.USERS_CREATE, ch, async (data) => {
    const users = await usersCreate(JSON.parse(data))
    console.log(' [*] Success create users %s', JSON.stringify(users))
  })
}

async function update(ch) {
  return consumeMessageAmqp(QUEUES.USERS_UPDATE, ch, async (message) => {
    const data = JSON.parse(message)
    const users = await usersUpdate(data.uuid, data.data)
    console.log(' [*] Success update users %s', JSON.stringify(users))
  })
}

async function destroy(ch) {
  return consumeMessageAmqp(QUEUES.USERS_DELETE, ch, async (uuid) => {
    await usersDestroy(uuid)
    console.log(' [*] Success delete users %s', uuid)
  })
}

export default {
  create,
  update,
  destroy
}