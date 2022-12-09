import _ from 'lodash'
import { QUEUES } from '../../libs/constant'
import validateNotfound from '../../libs/middlewares/validators/validateNotfound'
import { sendMessageAmqp } from '../../libs/providers/rabbitMQ'
import models from '../../models'

const { Users } = models

export async function create(req, res, next) {
  try {
    const { name, email, password } = req.body
    const data = {
      name,
      email,
      password
    }

    await sendMessageAmqp(QUEUES.USERS_CREATE, JSON.stringify(data))

    return res.status(201).json({
      message: req.t('message.success_save')
    })
  } catch (err) {
    return next(err)
  }
}

export async function update(req, res, next) {
  try {
    const { uuid } = req.params
    const { isValid } = await validateNotfound([
      uuid, 
      'uuid',
      Users
    ], req,res)
    if (!isValid) return

    const dataUpdate = {
      name: req.body.name
    }
    
    await sendMessageAmqp(QUEUES.USERS_UPDATE, JSON.stringify({
      uuid,
      data: dataUpdate
    }))

    return res.status(200).json({
      message: req.t('message.success_update')
    })
  } catch (err) {
    return next(err)
  }
}

export async function destroy(req, res, next) {
  try {
    const { uuid } = req.params
    const { isValid } = await validateNotfound([
      uuid, 
      'uuid',
      Users
    ], req,res)

    if (!isValid) return
    await sendMessageAmqp(QUEUES.USERS_DELETE, uuid)
    return res.status(200).json({
      message: req.t('message.success_delete')
    })
  } catch (err) {
    return next(err)
  }
}