const {verifyToken} = require('../helpers/jwt')
const Todo = require('../models/todos')

function authorization(req,res,next) {
    Todo.findById(req.params.id)
        .then((todo => {
            if(todo) {
                if(todo.userId == req.decoded._id) {
                    next()
                } else {
                    throw {status:403, message:'Unauthorized'}
                }
            } else {
                throw {status:404, message: 'Todo not found'}
            }
        }))
        .catch(next)
}

module.exports = authorization