if(process.env.NODE_ENV === 'development' || !process.env.NODE_ENV){
    require('dotenv').config()
}
 

const express = require('express')
const mongoose = require('mongoose');
const route = require('./routes')
const cornJob = require('./helpers/cornJob')
const cors = require('cors')
const errHandler = require('./middleware/errHandler')
const app = express()
const port = process.env.PORT || 3000

mongoose.connect(`${process.env.DB_URL}`, {useNewUrlParser: true})
.then(() =>{
    console.log("connected to database");
})
.catch(err => {
    console.log("Can't connect to database, error!", err);
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false })); 



app.use('/', route)
cornJob()
app.use(errHandler)

app.listen(port, ()=>{
    console.log(`This app is listening in port ${port}`);
})
