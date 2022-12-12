import { createClient } from 'redis'
import dotenv from 'dotenv'
dotenv.config()

const {
  ACTIVE_RABBITMQ
} = process.env

export const createClientRedis = () => {
  if (ACTIVE_RABBITMQ !== 'yes') throw new Error('the env ACTIVE_RABBITMQ must yes')

  const clientRedis = createClient({
    socket: {
      port: process.env.REDIS_PORT,
      host: process.env.REDIS_HOST,
    }
  })
  
  clientRedis.on('reconnecting', res => {
    console.log('redis reconnecting...')
  })
  
  clientRedis.on('error', err => {
    console.log(`redis error: ${err.message}`)
  })

  return clientRedis
}

export default {
  createClientRedis
}