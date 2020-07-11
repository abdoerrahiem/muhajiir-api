const jwt = require('jsonwebtoken')

exports.authentication = (req, res, next) => {
  const token = req.header('token')

  if (!token)
    return res.status(401).json({
      success: false,
      message: 'Authorization ditolak',
    })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.admin = decoded.admin

    next()
  } catch (err) {
    res.status(401).json({
      success: false,
      message: 'Token tidak valid',
    })
  }
}
