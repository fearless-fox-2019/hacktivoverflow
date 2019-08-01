const Comment = require('../models/comment')

class CommentController {
    static create(req, res, next) {
        let obj = {
            title: req.body.title,
            description: req.body.description,
            upvotes: [],
            downvotes: [],
            userId: req.decoded.id,
            postId: req.body.postId
        }
        Comment.create(obj)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static findByUserId(req, res, next) {
        Comment.find({userId : req.decoded.id})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static findByPostId(req, res, next) {
        Comment.find({postId : req.params.id})
        .then(data => {
            res.status(200).json(data.sort(function(a,b){return b.createdAt - a.createdAt}))
        })
        .catch(next)
    }

    static update(req, res, next) {
        let obj = {
            title: req.body.title,
            description: req.body.description,
            upvotes: 0,
            downvotes: 0,
            userId: req.decoded.id,
            postId: req.body.postId
        }
        Comment.findOne({_id : req.params.id})
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'Not Found' })
            } else {
                data.set(obj)
                return data.save()
            }
        }) 
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static upvotes(req, res, next) {
        Comment.findOne({_id : req.params.id})
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'Not Found' })
            } else {
                let id = req.params.id
                let checkUpvotes = data.upvotes.includes(req.decoded.id)
                let checkDownvotes = data.downvotes.includes(req.decoded.id)
                if (checkUpvotes) {
                    Comment.findByIdAndUpdate(id,
                        {$pull:
                            {upvotes: req.decoded.id}
                        },
                        {new:true}
                    )
                    .then( updated => {
                        res.status(200).json( { data: updated } )
                    })
                } else if (!checkUpvotes && checkDownvotes) {
                    Comment.findByIdAndUpdate(req.params.id,
                        {$pull:
                            {downvotes: req.decoded.id}
                        },
                        {new:true}
                    )
                    .then( updated => {
                        // res.status(200).json( { data: updated } )
                        Comment.findByIdAndUpdate(req.params.id,
                            {$push:
                                {upvotes: req.decoded.id}
                            },
                            {new:true}
                        )
                        .then( updated => {
                            res.status(200).json( { data: updated } )
                        })
                    })
                } else if (!checkUpvotes && !checkDownvotes) {
                    Comment.findByIdAndUpdate(req.params.id,
                        {$push:
                            {upvotes: req.decoded.id}
                        },
                        {new:true}
                    )
                    .then( updated => {
                        res.status(200).json( { data: updated } )
                    })
                }
            }
        })
        .catch(next)
    }

    static downvotes(req, res, next) {
        Comment.findOne({_id : req.params.id})
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'Not Found' })
            } else {
                let id = req.params.id
                let checkUpvotes = data.upvotes.includes(req.decoded.id)
                let checkDownvotes = data.downvotes.includes(req.decoded.id)

                if (checkDownvotes) {
                    Comment.findByIdAndUpdate(id,
                        {$pull:
                            {downvotes: req.decoded.id}
                        },
                        {new:true}
                    )
                    .then( updated => {
                        res.status(200).json(updated)
                    })
                } else if (checkUpvotes && !checkDownvotes) {
                    Comment.findByIdAndUpdate(req.params.id,
                        {$pull:
                            {upvotes: req.decoded.id}
                        },
                        {new:true}
                    )
                    .then( updated => {
                        // res.status(200).json( { data: updated } )
                        Comment.findByIdAndUpdate(req.params.id,
                            {$push:
                                {downvotes: req.decoded.id}
                            },
                            {new:true}
                        )
                        .then( updated => {
                            res.status(200).json(updated)
                        })
                    })
                } else if (!checkUpvotes && !checkDownvotes) {
                    Comment.findByIdAndUpdate(req.params.id,
                        {$push:
                            {downvotes: req.decoded.id}
                        },
                        {new:true}
                    )
                    .then( updated => {
                        res.status(200).json(updated)
                    })
                }
            }
        })
        .catch(next)
    }
}
module.exports = CommentController