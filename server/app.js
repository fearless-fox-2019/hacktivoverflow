if(!process.env.NODE_ENV || process.env.NODE_ENV === 'dev'){
    require('dotenv').config();
}
const kue = require('kue')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const route = require('./routes')
const mongoose = require('mongoose')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

mongoose.connect(process.env.DB_PATH, {useNewUrlParser : true, useCreateIndex : true}, (err) => {
    if(err) console.log('mongoose connection failed');
    else console.log('mongoose connection success');
});

app.use('/', route)

app.use('/kue', kue.app)

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
