import models from '../../models'

const { Users } = models

export default async function ({ page, paginate, keyword }, req, res) {
  const { docs, total, pages } = await Users.list({ page, paginate, keyword })
  return res.status(200).json({
    message: req.t('message.success'),
    meta: {
      total,
      pages,
      page,
      paginate,
    },
    data: docs
  })
}