const Job = require('../models/job');
const axios = require('axios');
const CronJob = require('cron').CronJob;

// Fetch Data Every Five Mins
new CronJob('0 */5 * * * *', function() {
  axios({
    method: 'GET',
    url: 'https://jobs.github.com/positions.json?search=',
  })
  .then(({ data }) => {
    const filtered = []
    for (let i = 0; i < 4;  i++) {
      const item = data[Math.floor(Math.random()*data.length)];
      const { 
        title, 
        location,
        type,
        company, 
        company_url,
        description,
        company_logo, 
        how_to_apply } = item
      const newJobOpening = { 
        title, 
        location,
        type,
        company, 
        company_url,
        description,
        company_logo, 
        how_to_apply } 
      filtered.unshift(newJobOpening)
    }
    return Promise.all([
      filtered,
      Job.deleteMany(),
    ])
  })
  .then((before) => {
    const jobList = before[0]
    return Job.insertMany(jobList)
  })
  .then((inserted) => {
    console.log(new Date(), '| Job List Fetched !')
  })
  .catch((err) => {
    console.log(err)
    throw {
      message: 'Error Fetching Data',
      status: 401
    }
  })
}, null, true, 'Asia/Jakarta')

class ControllerJob {
  static fetchJob(req, res, next) {
    Job.find()
    .then((found) => {
      res.status(200).json(found)
    })
    .catch(next)
  }
}

module.exports = ControllerJob
