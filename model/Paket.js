const mongoose = require('mongoose')

const PaketSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: [String],
  },
  createdAt: { type: Date, default: Date.now },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Provider',
    required: true,
  },
})

module.exports = mongoose.model('Paket', PaketSchema)
