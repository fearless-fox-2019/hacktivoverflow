if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const app = express()
const router = require('./routes')
const { errHandler } = require('./middlewares/errHandler')

const port = process.env.PORT
let DB = ''
if (process.env.NODE_ENV === 'development') {
  DB = process.env.DB_SERVER
}else {
  DB = process.env.DB_SERVER_ATLAS
}

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}, (err) => {
  if (err) console.log(err), console.log('Connection Error. ')
  else console.log('Success connect to mongoose. ')
})

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(morgan('dev'))

app.use('/', router)

app.use(errHandler)

app.listen(port, () => {
  console.log('Connection Success !!!')
})
