module.exports = (err, req, res, next) => {
  const message = err.message || `Internal Server Error`
  const status =  err.status || 500
  console.log(`\n\n---- Error Handler ----\n\n`, err);
  res.status(status).json({message})
}