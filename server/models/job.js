const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  title:  {
    type : String,
  },
  location: {
    type : String,
  },
  type: {
    type: String,
  },
  company: {
    type : String,
  },
  company_url: {
    type : String,
  },
  description: {
    type: String,
  },
  company_logo: {
    type: String
  },
  how_to_apply: {
    type: String
  }
}, {
  versionKey : false
});


let Job = mongoose.model('job', jobSchema)

module.exports = Job
