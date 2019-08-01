module.exports = function(err,req,res,next){
  console.log('Masuk error handler');
  console.log(JSON.stringify(err))
  console.log(err.message)
  
  const status = err.code || 500
  const message = err.message || 'internal server error'
  res.status(status).json({
    message : message
  })
}