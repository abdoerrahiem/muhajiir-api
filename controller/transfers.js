const Transfer = require('../model/Transfer')

exports.getTransfers = async (req, res) => {
  try {
    const transfers = await Transfer.find()

    res.json({
      success: true,
      count: transfers.length,
      data: transfers,
    })
  } catch (err) {
    console.log(err.message)
  }
}

exports.createTransfer = async (req, res) => {
  try {
    const transfer = await Transfer.create(req.body)

    res.status(201).json({
      success: true,
      message: 'Transfer berhasil',
      data: transfer,
    })
  } catch (err) {
    console.log(err.message)

    if (err._message === 'Transfer validation failed') {
      res.status(400).json({
        success: false,
        message: 'Silahkan isi seluruh field yang ada',
      })
    }
  }
}

exports.deleteAllTransfers = async (req, res) => {
  try {
    await Transfer.deleteMany()

    res.json({
      success: true,
      message: 'Semua transfer berhasil dihapus',
    })
  } catch (err) {
    console.log(err.message)
  }
}

exports.deleteTransfer = async (req, res) => {
  try {
    let transfer = await Transfer.findById(req.params.id)

    if (!transfer)
      return res.status(404).json({
        success: false,
        message: 'Transfer tidak ditemukan',
      })

    await transfer.remove()

    res.json({
      success: true,
      message: 'Transfer berhasil dihapus',
    })
  } catch (err) {
    console.log(err.message)

    if (err.kind === 'ObjectId') {
      res.status(404).json({
        success: false,
        message: 'Transfer tidak ditemukan',
      })
    }
  }
}
