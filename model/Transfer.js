const mongoose = require('mongoose')

const TransferSchema = new mongoose.Schema({
  bank: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  rekeningNumber: {
    type: String,
    required: true,
  },
  transfer: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
  },
  createdAt: { type: Date, default: Date.now },
})

TransferSchema.pre('save', function (next) {
  this.total = this.transfer + 10000

  next()
})

module.exports = mongoose.model('Transfer', TransferSchema)
