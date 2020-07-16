const Paket = require('../model/Paket')
const Provider = require('../model/Provider')

exports.getPakets = async (req, res) => {
  try {
    const pakets = await Paket.find().populate('provider', 'name')

    res.json({
      success: true,
      count: pakets.length,
      data: pakets,
    })
  } catch (err) {
    console.log(err.message)
  }
}

exports.getPaket = async (req, res) => {
  try {
    const paket = await Paket.findById(req.params.id).populate(
      'provider',
      'name'
    )

    if (!paket)
      return res.status(404).json({
        success: false,
        message: 'Paket tidak ditemukan',
      })

    res.json({
      success: true,
      data: paket,
    })
  } catch (err) {
    console.log(err.message)

    if (err.kind === 'ObjectId') {
      res.status(404).json({
        success: false,
        message: 'Paket tidak ditemukan',
      })
    }
  }
}

exports.createPaket = async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.providerId)

    if (!provider)
      return res.status(404).json({
        success: false,
        message: 'Provider tidak ditemukan',
      })

    const paket = await Paket.create({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description
        ? req.body.description.split(',')
        : undefined,
      provider: req.params.providerId,
    })

    res.status(201).json({
      success: true,
      message: 'Paket telah ditambahkan',
      data: paket,
    })
  } catch (err) {
    console.log(err.message)
  }
}

exports.updatePaket = async (req, res) => {
  try {
    let paket = await Paket.findById(req.params.id)

    if (!paket)
      return res.status(404).json({
        success: false,
        message: 'Paket tidak ditemukan',
      })

    paket = await Paket.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name ? req.body.name : paket.name,
          price: req.body.price ? req.body.price : paket.price,
          description: req.body.description
            ? req.body.description.split(',')
            : paket.description,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    )

    res.json({
      success: true,
      message: 'Paket berhasil diedit',
      data: paket,
    })
  } catch (err) {
    console.log(err.message)

    if (err.kind === 'ObjectId') {
      res.status(404).json({
        success: false,
        message: 'Paket tidak ditemukan',
      })
    }
  }
}

exports.deletePaket = async (req, res) => {
  try {
    let paket = await Paket.findById(req.params.id)

    if (!paket)
      return res.status(404).json({
        success: false,
        message: 'Paket tidak ditemukan',
      })

    await paket.remove()

    res.json({
      success: true,
      message: 'Paket berhasil dihapus',
    })
  } catch (err) {
    console.log(err.message)

    if (err.kind === 'ObjectId') {
      res.status(404).json({
        success: false,
        message: 'Paket tidak ditemukan',
      })
    }
  }
}

exports.getPaketByProvider = async (req, res) => {
  try {
    const paket = await Paket.find({ provider: req.params.providerId }).sort({
      price: 1,
    })
    const provider = await Provider.findById(req.params.providerId)

    if (!paket)
      return res.status(404).json({
        success: false,
        message: 'Paket tidak ditemukan',
      })

    if (!provider)
      return res.status(404).json({
        success: false,
        message: 'Provider tidak ditemukan',
      })

    res.json({
      success: true,
      provider,
      data: paket,
    })
  } catch (err) {
    console.log(err.message)

    if (err.kind === 'ObjectId') {
      res.status(404).json({
        success: false,
        message: 'Paket tidak ditemukan',
      })
    }
  }
}
