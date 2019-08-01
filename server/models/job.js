const mongoose = require('mongoose')
const Schema = mongoose.Schema

let jobSchema = new Schema({
    title : String,
    company : String,
    location : String,
    description : String,
    how_to_apply : String,
    company_logo : String
}, { versionKey: false, timestamps: true })

let Job = mongoose.model('job', jobSchema)

module.exports = Job