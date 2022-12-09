import { consumeMessageAmqp } from ".."
import { QUEUES } from "../../../constant"

export default async (ch) => {
  return consumeMessageAmqp(QUEUES.USERS_CREATE, ch, (data) => {
    console.log(data)
  })
}