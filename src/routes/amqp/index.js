import express from 'express'
import { isAuthenticate } from '../../libs/middlewares/authMiddleware'
import usersRouter from './usersRouter'

const router = express.Router()

router.get('/', (req, res) => res.status(200).json({ message: req.t('message.success') }))
router.use('/users', isAuthenticate, usersRouter)

export default router
