const CronJob = require('cron').CronJob;
const User = require('../models/user.js')
const mailer = require('../helpers/sendBirthdayMailer.js')


module.exports = function(){
    User.find({})
    .then(data => {
        data.forEach(element => {
            let birthdayString = element.birthday.toISOString()
            let day = birthdayString.substring(8,10)
            let month = birthdayString.substring(5,7)
            // let day = `1`
            // let month = `7`

            let timeCron = `* * * ${day} ${month} *`
            // console.log(data);
            
            new CronJob(timeCron, function() {
              console.log('You will see this message every second');
              mailer({
                  name : `${element.firstname} ${element.lastname}`,
                  email : element.email,
                  birthday : element.birthday
              })

            console.log("berhasil ga!!!!!!!!!!!!!!!!");              
            }, null, true, 'Asia/Jakarta');
        });
    })
    .catch(err => {
        console.log(err);
    })
}