if (process.env.NODE_ENV == 'development') {
    require('dotenv').config()
}

const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hacktiv-overflow', {
    useNewUrlParser: true
});

const cors = require('cors')

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

const userRoute = require('./routes/user-route')
const questionRoute = require('./routes/question-route')
const answerRoute = require('./routes/answer-route')

app.use('/users', userRoute)
app.use('/questions', questionRoute)
app.use('/answers', answerRoute)

app.use((err, req, res, next) => {
    console.log(err.message)
    res.status(err.status || 500).json(err)
})

// app.listen(port, () => console.log(`Example app listening on port ${port}`))

module.exports = app