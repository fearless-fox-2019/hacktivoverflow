if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();

  //     "development": "NODE_ENV=development nodemon app.js"

}

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose');
const errHandler = require('./middlewares/err');
// Routes Main
const routesIndex = require('./routes/index.js');


// Encode From Url
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
mongoose.connect(process.env.DB_MONGOOSE, {
  useNewUrlParser: true
}, function(err) {
  if (err) console.log(err);
});
mongoose.set('useCreateIndex', true)

app.use(cors())
app.use(morgan('tiny'))

//  Home Page
app.use('/', routesIndex)
app.use(errHandler)

app.listen(port, () => console.log(`Hello from port : ${port}! 😙`))