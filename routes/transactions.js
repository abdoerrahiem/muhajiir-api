const router = require('express').Router()
const {
  createTransaction,
  getTransactions,
  deleteTransaction,
  deleteAllTransactions,
} = require('../controller/transactions')

router
  .route('/')
  .get(getTransactions)
  .post(createTransaction)
  .delete(deleteAllTransactions)
router.route('/:id').delete(deleteTransaction)

module.exports = router
