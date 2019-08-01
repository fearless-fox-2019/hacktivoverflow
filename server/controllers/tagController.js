const tagModel = require('../models/tagModel')

class TagController {
    static findAll (rq,res,next) {
        tagModel
            .find()
            .then(allTag => {
                res.status(200).json(allTag)
            }) .catch(next)
    }
    static findByBag (rq,res,next) {

    }
    static findByWatcher (rq,res,next) {

    }
    static create (rq,res,next) {

    }
    static update (rq,res,next) {

    }
    static delete (rq,res,next) {

    }
}

module.exports = TagController