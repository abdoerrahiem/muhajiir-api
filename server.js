const express = require('express')
const dotenv = require('dotenv')
dotenv.config({ path: './config/config.env' })
const cors = require('cors')
require('colors')

const MongoDB = require('./config/MongoDB')

const app = express()

MongoDB()

app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

app.get('/', (req, res) => res.send('API running'))

app.use('/providers', require('./routes/providers'))
app.use('/pakets', require('./routes/pakets'))
app.use('/transactions', require('./routes/transactions'))
app.use('/transfers', require('./routes/transfers'))
app.use('/admin', require('./routes/admin'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server berjalan pada port ${PORT}`.bgBlue))
