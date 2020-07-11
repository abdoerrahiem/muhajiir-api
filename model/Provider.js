const mongoose = require('mongoose')

const ProviderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  createdAt: { type: Date, default: Date.now },
})

ProviderSchema.pre('save', function (next) {
  this.name =
    this.name.trim()[0].toUpperCase() + this.name.slice(1).toLowerCase()

  next()
})

module.exports = mongoose.model('Provider', ProviderSchema)
