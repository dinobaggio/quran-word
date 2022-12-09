import dotenv from 'dotenv'
import amqplib from 'amqplib'

dotenv.config()

const {
  RABBITMQ_USER,
  RABBITMQ_PASSWORD,
  RABBITMQ_HOST,
  RABBITMQ_PORT,
  ACTIVE_RABBITMQ
} = process.env

const url = `amqp://${RABBITMQ_USER}:${RABBITMQ_PASSWORD}@${RABBITMQ_HOST}:${RABBITMQ_PORT}`

export async function initAmqp() {
  if (ACTIVE_RABBITMQ !== 'yes') throw new Error('the env ACTIVE_RABBITMQ must yes')
  return amqplib.connect(url)
}

export async function createChannelAmqp(queue) {
  if (ACTIVE_RABBITMQ !== 'yes') throw new Error('the env ACTIVE_RABBITMQ must yes')
  const conn = await initAmqp()
  const ch = await conn.createChannel()
  await ch.assertQueue(queue)
  return { conn, ch }
}

export async function sendMessageAmqp(queue, message) {
  if (ACTIVE_RABBITMQ !== 'yes') throw new Error('the env ACTIVE_RABBITMQ must yes')
  const { conn, ch } = await createChannelAmqp(queue)
  await ch.sendToQueue(queue, Buffer.from(message))
  console.log(" [x] Success send '%s'", message);
  await ch.close()
  await conn.close()
}

export async function consumeMessageAmqp(queue, ch, cb = () => {}) {
  if (ACTIVE_RABBITMQ !== 'yes') throw new Error('the env ACTIVE_RABBITMQ must yes')
  await ch.assertQueue(queue)
  await ch.consume(queue, async function(msg) {
    const message = msg.content.toString()
    const data = JSON.parse(message)
    console.log("[x] Received '%s'", message)
    cb(data)
  }, { noAck: true })
}

export default {
  initAmqp,
  createChannelAmqp
}