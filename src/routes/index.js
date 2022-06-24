import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  return res.render('index.hbs')
})

export default router
