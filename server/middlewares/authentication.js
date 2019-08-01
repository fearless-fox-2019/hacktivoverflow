const {verify} = require('../helpers/jwt')
const secret = process.env.JWT_SECRET || "RAHASIA"

module.exports = {
  authentication : function (req,res,next){
    // console.log('masuk authentication', req.headers.token)
    if(req.headers.token) {
      try {
          let decode = verify(req.headers.token, secret)
          req.user = decode
          next()
      } 
      catch(err) {
          next(err)
      }

    }else {
      next({code: 401, message: "Login First"})
    }
  }
}