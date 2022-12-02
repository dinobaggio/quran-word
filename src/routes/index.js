import express from 'express'
import apiRouter from './api'

const router = express.Router()

router.get('/', (req, res) => {
  return res.render('index.hbs')
})


router.use('/api/v1', apiRouter)

export default router
