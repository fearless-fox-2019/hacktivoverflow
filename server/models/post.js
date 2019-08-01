const mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* Generate Post */
let PostSchema = new Schema({
  title : {
    type: String,
    required : [true, 'title can\'t be blank!']
  },
  content :  {
    type: String,
    required : [true, 'content can\'t be blank!']
  },
  UserId : {type : Schema.Types.ObjectId, ref : 'User'},
  UpVote : [{type : Schema.Types.ObjectId, ref : 'User'}],
  DownVote : [{type : Schema.Types.ObjectId, ref : 'User'}]
},{timestamps : true})

/* middlewares/hooks */

/* 
PostSchema.pre('save', function(next){
    Post.findOne({ uniqueField : this.getUpdate().uniqueField })
    .then(data => {
        if(data){
            next({status : 500, message : 'this uniqueField has been used!'})
        }
        else {
            next()
        }
    })
}) */

const Post = mongoose.model('Post', PostSchema)

module.exports = Post