const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Admin', AdminSchema)
