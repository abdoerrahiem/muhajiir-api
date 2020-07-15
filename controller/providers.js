const Provider = require('../model/Provider')
const Paket = require('../model/Paket')

exports.getProviders = async (req, res) => {
  try {
    const providers = await Provider.find().populate('pakets')

    res.json({
      success: true,
      count: providers.length,
      data: providers,
    })
  } catch (err) {
    console.log(err.message)
  }
}

exports.getProvider = async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id)

    if (!provider)
      return res.status(404).json({
        success: false,
        message: 'Provider tidak ditemukan',
      })

    res.json({
      success: true,
      data: provider,
    })
  } catch (err) {
    console.log(err.message)

    if (err.kind === 'ObjectId') {
      res.status(404).json({
        success: false,
        message: 'Provider tidak ditemukan',
      })
    }
  }
}

exports.createProvider = async (req, res) => {
  try {
    const provider = await Provider.create(req.body)

    res.status(201).json({
      success: true,
      message: 'Provider berhasil dibuat',
      data: provider,
    })
  } catch (err) {
    console.log(err.message)

    if (err.code === 11000) {
      res.status(400).json({
        success: false,
        message: `Provider ${err.keyValue.name} telah digunakan`,
      })
    }
  }
}

exports.updateProvider = async (req, res) => {
  try {
    let provider = await Provider.findById(req.params.id)

    if (!provider)
      return res.status(404).json({
        success: false,
        message: 'Provider tidak ditemukan',
      })

    provider = await Provider.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    provider.name =
      provider.name.trim()[0].toUpperCase() +
      provider.name.slice(1).toLowerCase()

    provider.save()

    res.json({
      success: true,
      message: 'Provider berhasil diedit',
      data: provider,
    })
  } catch (err) {
    console.log(err.message)

    if (err.kind === 'ObjectId') {
      res.status(404).json({
        success: false,
        message: 'Provider tidak ditemukan',
      })
    }
  }
}

exports.deleteProvider = async (req, res) => {
  try {
    let provider = await Provider.findById(req.params.id)

    if (!provider)
      return res.status(404).json({
        success: false,
        message: 'Provider tidak ditemukan',
      })

    await provider.remove()
    await Paket.deleteMany({ provider: req.params.id })

    res.json({
      success: true,
      message: 'Provider berhasil dihapus',
    })
  } catch (err) {
    console.log(err.message)

    if (err.kind === 'ObjectId') {
      res.status(404).json({
        success: false,
        message: 'Provider tidak ditemukan',
      })
    }
  }
}
