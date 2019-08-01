if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const cron = require('node-cron')
const kue = require('kue')
const queue = kue.createQueue()
const User = require('./models/user')
const Question = require('./models/question')
const sendEmail = require('./helpers/sendEmail')
const port = process.env.PORT || 3000
const route = require('./routes')
const mongoose = require('mongoose')

const cronMonth = '0 7 1 * *'
// const cronMonth = '*/1 * * * *'
cron.schedule(cronMonth, () => {
    User
        .find({})
        .then(users => {
            users.forEach(user => {
                Question
                    .find({owner: user._id})
                    .then(questions => {
                        queue.create('question-contribution', {
                            email: user.email,
                            questionsCount: questions.length
                        })
                        .save()  
                })
        })
    })
    .catch(err => {
        console.log(err)
    })
});
  
queue.process('question-contribution', (job, done) => {
    sendEmail({
        email: job.data.email, 
        count: job.data.questionsCount})
    done()
})

app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({ extended:false }))
app.use(express.json())

mongoose.connect(process.env.DB_URL, {useNewUrlParser : true}, (err) => {
    if(err) console.log('mongoose connection failed')
    else console.log('mongoose connection success')
})

app.use('/', route)

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})