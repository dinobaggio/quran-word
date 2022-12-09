import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { initAmqp } from '../libs/providers/rabbitMQ'
import listeners from '../libs/providers/rabbitMQ/listener'

dotenv.config()

const {
  ACTIVE_RABBITMQ
} = process.env

if (ACTIVE_RABBITMQ !== 'yes') {
  throw new Error('the env ACTIVE_RABBITMQ must yes')
}

let dirListeners = fs.readdirSync(path.join(__dirname, '../libs/providers/rabbitMQ/listener'))
dirListeners = dirListeners.filter(item => item !== 'index.js')

initAmqp()
  .then(async (conn) => {
    process.once('SIGINT', function() { conn.close(); });
    const ch = await conn.createChannel()
    dirListeners.forEach(item => {
      let name = String(item).replace('.js', '')
      listeners[name](ch)
    })
    console.log(' [*] Waiting for messages. To exit press CTRL+C');
  })
  .catch(console.warn)