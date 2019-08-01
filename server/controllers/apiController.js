const { jobModel } = require('../models');
const axios = require("axios")
const CronJob = require('cron').CronJob;
new CronJob('0 */5 * * * *', function () {
  jobModel.deleteMany({})
    .then(() => {
      let job = ['ruby', 'java', 'golang', 'php','javascript']
      let random = Math.floor(Math.random() * (job.length))
      return axios({
        method: 'get',
        url: `https://jobs.github.com/positions.json?description=${job[random]}`
      })
    })
    .then(({ data }) => {
      return jobModel.insertMany(data)
    })
    .then((data) => {
      console.log('success fetch new data');
    })
    .catch(err => {
      console.log(err);
    })
}, null, true, 'Asia/Jakarta');


class ApiController {
  static getJob(req, res, next) {
    jobModel.find()
    .then(data =>{
      res.status(200).json(data)
    })
    .catch(next)
  }
}
module.exports = ApiController