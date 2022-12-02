import express from 'express'
import authRouter from './authRouter'

const router = express.Router()

router.get('/', (req, res) => res.status(200).json({ message: req.t('message.success') }))
router.use('/auth', authRouter)

export default router
