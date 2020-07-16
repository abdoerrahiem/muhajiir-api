const mongoose = require('mongoose')
const moment = require('moment')

const TransactionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  paket: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
  createdAt: { type: Date },
})

TransactionSchema.pre('save', function (next) {
  this.name = this.name
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  next()
})

TransactionSchema.pre('save', function (next) {
  this.createdAt = moment(Date.now()).format('MMM Do YY')

  next()
})

module.exports = mongoose.model('Transaction', TransactionSchema)
