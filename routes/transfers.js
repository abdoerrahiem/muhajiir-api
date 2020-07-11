const router = require('express').Router()
const {
  createTransfer,
  getTransfers,
  deleteTransfer,
  deleteAllTransfers,
} = require('../controller/transfers')

router
  .route('/')
  .get(getTransfers)
  .post(createTransfer)
  .delete(deleteAllTransfers)
router.route('/:id').delete(deleteTransfer)

module.exports = router
