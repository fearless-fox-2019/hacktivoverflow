const Post = require('../models/post')
const Comment = require('../models/comment')

class PostController {
    static list(req, res, next) {
        Post.find({})
        .then(data => {
            res.status(200).json(data.sort(function(a,b){return b.createdAt - a.createdAt}))
        })
        .catch(next)
    }

    static findByPostId(req, res, next) {
        Post.findById(req.params.id).populate('userId')
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static findByUserId(req, res, next) {
        Post.find({userId : req.decoded.id})
        .then(data => {
            res.status(200).json(data.sort(function(a,b){return b.createdAt - a.createdAt}))
        })
        .catch(next)
    }

    static create(req, res, next) {
        let obj = {
            title: req.body.title,
            description: req.body.description,
            tags: req.body.tags,
            upvotes: [],
            downvotes: [],
            userId: req.decoded.id,
        }
        Post.create(obj)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static update(req, res, next) {
        let obj = {
            title: req.body.title,
            description: req.body.description,
            tags: req.body.tags,
            upvotes: req.body.upvotes,
            downvotes: req.body.downvotes,
            answer: req.body.answer,
            userId: req.decoded.id,
        }
        Post.findOneAndUpdate({_id: req.params.id}, obj, {new: true})
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'Not Found' })
            } else {
                res.status(200).json(data)
            }
        })
    }

    static addComment(req, res, next) {
        let id =req.params.id
        Post.findByIdAndUpdate(id, 
            {$push:
                {comments: req.body.idComment}
            },
            { new:true }
        )
        .then(updated => {
            res.status(200).json( { data: updated } )
        })
        .catch(next)
    }

    static upvotes(req, res, next) {
        Post.findOne({_id : req.params.id})
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'Not Found' })
            } else {
                let id = req.params.id
                let checkUpvotes = data.upvotes.includes(req.decoded.id)
                let checkDownvotes = data.downvotes.includes(req.decoded.id)

                if (checkUpvotes) {
                    Post.findByIdAndUpdate(id,
                        {$pull:
                            {upvotes: req.decoded.id}
                        },
                        {new:true}
                    )
                    .then( updated => {
                        res.status(200).json( { data: updated } )
                    })
                } else if (!checkUpvotes && checkDownvotes) {
                    Post.findByIdAndUpdate(req.params.id,
                        {$pull:
                            {downvotes: req.decoded.id}
                        },
                        {new:true}
                    )
                    .then( updated => {
                        // res.status(200).json( { data: updated } )
                        Post.findByIdAndUpdate(req.params.id,
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
                    Post.findByIdAndUpdate(req.params.id,
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
        Post.findOne({_id : req.params.id})
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'Not Found' })
            } else {
                let id = req.params.id
                let checkUpvotes = data.upvotes.includes(req.decoded.id)
                let checkDownvotes = data.downvotes.includes(req.decoded.id)

                if (checkDownvotes) {
                    Post.findByIdAndUpdate(id,
                        {$pull:
                            {downvotes: req.decoded.id}
                        },
                        {new:true}
                    )
                    .then( updated => {
                        res.status(200).json( { data: updated } )
                    })
                } else if (checkUpvotes && !checkDownvotes) {
                    Post.findByIdAndUpdate(req.params.id,
                        {$pull:
                            {upvotes: req.decoded.id}
                        },
                        {new:true}
                    )
                    .then( updated => {
                        // res.status(200).json( { data: updated } )
                        Post.findByIdAndUpdate(req.params.id,
                            {$push:
                                {downvotes: req.decoded.id}
                            },
                            {new:true}
                        )
                        .then( updated => {
                            res.status(200).json( { data: updated } )
                        })
                    })
                } else if (!checkUpvotes && !checkDownvotes) {
                    Post.findByIdAndUpdate(req.params.id,
                        {$push:
                            {downvotes: req.decoded.id}
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

    static delete(req, res, next) {
        Post.findById(req.params.id)
        .then(post => {
            if (post.comments.length === 0) {
                Post.findByIdAndDelete(req.params.id)
                .then(data => {
                    if (!data) res.status(404).json({ message: 'Not Found' })
                        else res.status(200).json(req.params.id)
                })
                .catch(next)
            } else {
                Post.findByIdAndDelete(req.params.id)
                .then(data => {
                    Comment.deleteMany({ postId : data._id})
                    .then(datas => {
                        console.log(datas)
                    })
                    .catch(next)
                }) 
                .catch(next)
            }
        })
        .catch(next)
    }
}
module.exports = PostController