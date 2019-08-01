const mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* Generate Answer */
let AnswerSchema = new Schema({
  title :{
    type : String,
    required : [true, "title can't be blank!"]
  },
  content : {
    type : String,
    required : [true, "content can't be blank!"]
  },
  UserId : {type : Schema.Types.ObjectId, ref : 'User'},
  PostId : [{type : Schema.Types.ObjectId, ref : 'Post'}],
  UpVote : [{type : Schema.Types.ObjectId, ref : 'User'}],
  DownVote : [{type : Schema.Types.ObjectId, ref : 'User'}]
}, {timestamps : true})

/* middlewares/hooks */

/* 
AnswerSchema.pre('save', function(next){
    Answer.findOne({ uniqueField : this.getUpdate().uniqueField })
    .then(data => {
        if(data){
            next({status : 500, message : 'this uniqueField has been used!'})
        }
        else {
            next()
        }
    })
}) */

const Answer = mongoose.model('Answer', AnswerSchema)

module.exports = Answer