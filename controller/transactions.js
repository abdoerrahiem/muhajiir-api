const Transaction = require('../model/Transaction')

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()

    res.json({
      success: true,
      count: transactions.length,
      data: transactions,
    })
  } catch (err) {
    console.log(err.message)
  }
}

exports.createTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create(req.body)

    res.status(201).json({
      success: true,
      message: 'Transaksi berhasil',
      data: transaction,
    })
  } catch (err) {
    console.log(err.message)

    if (err._message === 'Transaction validation failed') {
      res.status(400).json({
        success: false,
        message: 'Silahkan isi seluruh field yang ada',
      })
    }
  }
}

exports.deleteAllTransactions = async (req, res) => {
  try {
    await Transaction.deleteMany()

    res.json({
      success: true,
      message: 'Semua transaksi berhasil dihapus',
    })
  } catch (err) {
    console.log(err.message)
  }
}

exports.deleteTransaction = async (req, res) => {
  try {
    let transaction = await Transaction.findById(req.params.id)

    if (!transaction)
      return res.status(404).json({
        success: false,
        message: 'Transaksi tidak ditemukan',
      })

    await transaction.remove()

    res.json({
      success: true,
      message: 'Transaksi berhasil dihapus',
    })
  } catch (err) {
    console.log(err.message)

    if (err.kind === 'ObjectId') {
      res.status(404).json({
        success: false,
        message: 'Transaksi tidak ditemukan',
      })
    }
  }
}
