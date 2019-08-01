module.exports = (err, req, res, next) => {res.status(err.status || 500).json(err.message || 'Internal Server Error')}
// module.exports = (err, req, res, next) => {
  // if (err.code === 404) {
  //   res.status(404).json('Data not found');
  // } 
  // else if (err.name === 'ValidationError') {
  //   res.status(400).json(err.message);
  // } 
  // else {
  //   res.status(500).json('Internal server error');
  // }
// }