import { expect } from 'chai'
import dotenv from 'dotenv'
import { createChannelAmqp, initAmqp } from '../src/libs/providers/rabbitMQ'

dotenv.config()
const {
  ACTIVE_RABBITMQ
} = process.env

if (ACTIVE_RABBITMQ === 'no') {
  describe('No test rabbitmq', () => {
    it('notest rabbit mq', (done) => {done()})
  })
} else if (ACTIVE_RABBITMQ === 'yes') {
  describe('[RabbitMQ] Test Provider RabbitMQ', () => {
    let ch = null
    const message = 'Test queue'
    const queue = 'test_queue'
    it('[RabbitMQ] Test connection', async () => {
      const conn = await initAmqp()
      conn.close()
    })
    it('[RabbitMQ] Send rabbitMQ', async () => {
      const { ch, conn } = await createChannelAmqp(queue)
      await ch.assertQueue(queue)
      await ch.sendToQueue(queue, Buffer.from(message))
      await ch.close()
      await conn.close()
    })
    it('[RabbitMQ] Receive rabbitMQ', async () => {
      const { ch, conn } = await createChannelAmqp(queue)
      await ch.assertQueue(queue)
      await ch.consume(queue, (msg) => {
        expect(msg.content.toString()).to.equal(message)
      }, { noAck: true })
      await ch.close()
      await conn.close()
    })
    it('[RabbitMQ] Remove queue rabbitMQ', async () => {
      const { ch, conn } = await createChannelAmqp(queue)
      await ch.deleteQueue(queue)
      await ch.close()
      await conn.close()
    })
  })
}