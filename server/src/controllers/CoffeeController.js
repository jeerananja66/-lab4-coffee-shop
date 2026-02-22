const { Coffee } = require('../models')

module.exports = {

  // ===============================
  // ดึงรายการกาแฟทั้งหมด
  // ===============================
  async index (req, res) {
    try {
      const coffees = await Coffee.findAll()
      res.send(coffees)
    } catch (err) {
      res.status(500).send(err)
    }
  },

  // ===============================
  // ดูรายละเอียดกาแฟ
  // ===============================
  async show (req, res) {
    try {
      const coffee = await Coffee.findByPk(req.params.coffeeId)

      if (!coffee) {
        return res.status(404).send({ message: 'Coffee not found' })
      }

      res.send(coffee)
    } catch (err) {
      res.status(500).send(err)
    }
  },

  // ===============================
  // เพิ่มเมนูกาแฟใหม่ (รองรับ thumbnail)
  // ===============================
  async create (req, res) {
    try {
      const {
        name,
        price,
        type,
        status,
        description
      } = req.body

      const coffee = await Coffee.create({
        name,
        price,
        type,
        status,
        description,
        thumbnail: req.file ? req.file.filename : null
      })

      res.send(coffee)
    } catch (err) {
      res.status(400).send(err)
    }
  },

  // ===============================
  // แก้ไขข้อมูลกาแฟ (รองรับ thumbnail)
  // ===============================
  async update (req, res) {
    try {
      const coffee = await Coffee.findByPk(req.params.coffeeId)

      if (!coffee) {
        return res.status(404).send({ message: 'Coffee not found' })
      }

      const {
        name,
        price,
        type,
        status,
        description
      } = req.body

      await coffee.update({
        name,
        price,
        type,
        status,
        description,
        thumbnail: req.file
          ? req.file.filename
          : coffee.thumbnail
      })

      res.send({ message: 'Coffee updated successfully' })
    } catch (err) {
      res.status(400).send(err)
    }
  },

  // ===============================
  // ลบเมนูกาแฟ
  // ===============================
  async delete (req, res) {
    try {
      const coffee = await Coffee.findByPk(req.params.coffeeId)

      if (!coffee) {
        return res.status(404).send({ message: 'Coffee not found' })
      }

      await coffee.destroy()

      res.send({ message: 'Coffee deleted successfully' })
    } catch (err) {
      res.status(400).send(err)
    }
  }

}