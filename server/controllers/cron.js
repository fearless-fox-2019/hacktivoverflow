const CronJob = require('cron').CronJob;
const moment = require('moment')
let arr = []



const axios = require('axios')
let toDate = new Date(moment().format()).getTime().toString().slice(0, 10)
let fromDate =  new Date (moment().subtract(7,'d').format()).getTime().toString().slice(0, 10)
const url = `https://api.stackexchange.com/2.2/questions?page=1&fromdate=${fromDate}&todate=${toDate}&order=desc&sort=votes&site=stackoverflow`

new CronJob('0 0 0 * * *', function() {
  console.log('triggered')
  ControllerCron.fetchStack()
}, null, true, 'Asia/Jakarta');

class ControllerCron {
  static fetchStack () {
    axios.get(url)
    .then(({data}) => {
      const { items } = data
      items.forEach(el => {
        el.inserted = false
      });
      for(let i = 0; i < 5; i++ ) {
        let random = Math.floor(Math.random() * items.length)
        if(!items[random].inserted) {
          arr.push(items[random])
        } else {
          i--
        }
      }
    })
  }

  static getStack (req, res, next) {
    if(arr.length > 0) {
      res.status(200).json(arr)
    } else {
      axios.get(url)
      .then(({data}) => {
        const { items } = data
        items.forEach(el => {
          el.inserted = false
        });
        for(let i = 0; i < 5; i++ ) {
          let random = Math.floor(Math.random() * items.length)
          if(!items[random].inserted) {
            arr.push(items[random])
          } else {
            i--
          }
        }
        res.status(200).json(arr)
      })
    }
  }
}

module.exports = ControllerCron


