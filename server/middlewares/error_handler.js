const MongooseError = require('mongoose/lib/error')


module.exports = function(err, req, res, next){
    const errCode = err.code || 500;
    const errMessage = err.message || "Internal server error";

    console.log("=============================");
    console.log(err);
    console.log("=============================");
    
    res.status(errCode).json({message: errMessage});
}