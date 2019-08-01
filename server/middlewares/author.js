const { questionModel } = require('../models/index')
module.exports = (req, res, next) => {

  questionModel.findById(req.params.id)
    .then(data => {
      if (data) {
        if (data.userId == req.decoded._id) {
          next()
        }
        else {
          throw {
            status: 401,
            message: 'Unauthorized'
          }
        }
      } else {
        throw {
          status: 404,
          message: 'Data not Found'
        }
      }
    })
    .catch(next)
}