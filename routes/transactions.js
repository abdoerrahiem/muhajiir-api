const router = require('express').Router()
const {
  createTransaction,
  getTransactions,
  deleteTransaction,
  deleteAllTransactions,
  getTodayTransactions,
} = require('../controller/transactions')

router
  .route('/')
  .get(getTransactions)
  .post(createTransaction)
  .delete(deleteAllTransactions)
router.route('/:id').delete(deleteTransaction)
router.route('/today').get(getTodayTransactions)

module.exports = router
