const Tag = require('../models/tags')

class ControllerTag {

  static async findAll (req, res, next) {
    try {
      const tags = await Tag.find()
      res.status(200).json(tags)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ControllerTag