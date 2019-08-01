const cron = require("node-cron");
const Question = require("../models/question");

module.exports = cron.schedule("0 0 * * * *", function(){
  Question.find()
      .then((questions) => {
          questions.forEach((question) => {
              const isMinus = countVote(question.votes) < 0;

              if(isMinus){
                  Question.findByIdAndDelete(question._id)
                      .then((deleted) => {
                          console.log(deleted);
                      })
                      .catch((err) => {
                          console.log(err);
                      })
              }
          });
      })
      .catch((err) => {
          console.log(err);
      })
}, {
  scheduled: false
});


function countVote(votes){
  let total = 0;
  votes.forEach((vote) => {
      total += vote.voteNumb;
  })

  return total;
}