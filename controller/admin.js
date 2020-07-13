const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Admin = require('../model/Admin')

exports.getAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password')

    res.json({
      success: true,
      data: admin,
    })
  } catch (err) {
    console.log(err.message)
  }
}

exports.register = async (req, res) => {
  try {
    const admin = await Admin.create(req.body)
    admin.password = await bcrypt.hash(req.body.password, 10)

    await admin.save()

    const payload = {
      admin: { id: admin.id },
    }

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE },
      (err, token) => {
        if (err) throw err

        res.json({
          success: true,
          message: 'Admin berhasil didaftarkan',
          token,
        })
      }
    )
  } catch (err) {
    console.log(err.message)

    if (err._message === 'Admin validation failed') {
      res.status(400).json({
        success: false,
        message: 'Silahkan isi seluruh field yang ada',
      })
    }
  }
}

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body

    let admin = await Admin.findOne({ username })

    if (!admin)
      return res.status(404).json({
        success: false,
        message: 'Admin tidak ditemukan',
      })

    const passwordMatched = await bcrypt.compare(password, admin.password)

    if (!passwordMatched)
      return res.status(400).json({
        success: false,
        message: 'Password yang anda masukkan salah',
      })

    const payload = {
      admin: { id: admin.id },
    }

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE },
      (err, token) => {
        if (err) throw err

        res.json({
          success: true,
          message: 'Admin berhasil login',
          token,
        })
      }
    )
  } catch (err) {
    console.log(err.message)

    if (err._message === 'Admin validation failed') {
      res.status(400).json({
        success: false,
        message: 'Silahkan isi seluruh field yang ada',
      })
    }
  }
}
