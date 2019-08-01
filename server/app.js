if(!process.env.NODE_ENV || process.env.NODE_ENV == "development"){
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");
const errorHandler = require("./middlewares/error_handler");
const port = process.env.PORT || 3000;
const cronTask = require("./helpers/cron")

mongoose.connect(`mongodb+srv://${process.env.MONGODB_ATLAS_USERNAME}:${process.env.MONGODB_ATLAS_PASSWORD}@hendrixsilaen-pkgui.mongodb.net/${process.env.MONGODB_ATLAS_DATABASE}?retryWrites=true&w=majority`, {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false}, function(err){
    if(err){
        console.log(err);
    }else{
        console.log("database OK");
    }
});

cronTask.start();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/", routes);
app.use(errorHandler);

app.listen(port, () => {
    console.log("server is running on port", port);
})

