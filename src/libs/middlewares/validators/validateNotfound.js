import _ from 'lodash'
import models from '../../../models'

export default async function([value, field, model], req, res) {
  let ormModel = null
  if (typeof model === 'string') ormModel = models[model]
  else ormModel = model
  const data = await ormModel.findOne({
    where: { [field]: value }
  })
  if (!data) {
    res.status(404).json({
      message: req.t('validator.not_found', { field: _.capitalize(field) })
    })
    return { isValid: false }
  }
  return { isValid: true, data }
}