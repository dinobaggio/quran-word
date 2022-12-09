import express from 'express'
import apiRouter from './api'
import amqpRouter from './amqp'

const router = express.Router()

router.get('/', (req, res) => {
  return res.render('index.hbs')
})


router.use('/api/v1', apiRouter)
router.use('/amqp', amqpRouter)

export default router
