const router = require('express').Router({ mergeParams: true })
const {
  createPaket,
  getPakets,
  getPaket,
  updatePaket,
  deletePaket,
} = require('../controller/pakets')
const { authentication } = require('../middleware')

router.use(authentication)

router.route('/').get(getPakets).post(createPaket)
router.route('/:id').get(getPaket).put(updatePaket).delete(deletePaket)

module.exports = router
