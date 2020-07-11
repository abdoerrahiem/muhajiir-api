const router = require('express').Router()
const {
  createProvider,
  getProviders,
  getProvider,
  updateProvider,
  deleteProvider,
} = require('../controller/providers')
const { authentication } = require('../middleware')

router.use('/:providerId/pakets', require('./pakets'))
router.use(authentication)

router.route('/').get(getProviders).post(createProvider)
router.route('/:id').get(getProvider).put(updateProvider).delete(deleteProvider)

module.exports = router
