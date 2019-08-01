module.exports = {
    errHandler: function (err, req, res, next) {
        console.log(err, '==== ini err')
        if (err.name == 'ValidationError') {
            res.json(err.errors)
        } else if (!err.code) {
            if (err.message.includes('Cast to ObjectId failed')) {
                res.status(404).json({
                    message: 'Bad request'
                })
            } else {
                res.status(500).json({
                    message: 'Internal server error'
                })
            }
        } else {
            if (err.name == 'MongoError') {
                res.status(500).json({
                    message: err.errmsg
                })
            } else {
                res.status(err.code).json({
                    message: err.message
                })
            }
        }
    }
}