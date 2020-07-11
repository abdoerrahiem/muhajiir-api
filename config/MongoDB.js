const mongoose = require('mongoose')

const MongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })

    console.log(`MongoDB terhubung`.bgBlue)
  } catch (err) {
    console.log('Tidak bisa terkoneksi ke MongoDB'.bgRed)
    process.exit(1)
  }
}

module.exports = MongoDB
