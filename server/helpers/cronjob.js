const CronJob = require('cron').CronJob;
const Question = require('../models/question')
const User = require('../models/user')
let nodemailer = require("nodemailer");

module.exports = function () {
    // 0 18 * * *
    console.log('masuk');
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'yamadaviu@gmail.com',
            pass: process.env.PASSWORD
        }
    });

    new CronJob('0 30 19 * * *', function () {
        console.log('running cronjob');
        let questions = []
        Question.find().populate('user_id').sort({ upvotes: -1, createdAt: -1 }).limit(3)
            .then((data) => {
                questions = data
                console.log('ini cronjob');
                var content = data.reduce(function (a, b) {
                    return a + '<ul><h3>' + b.title + '</a></h3><li>' + b.description + '</li><li>' + b.upvotes.length + ' upvotes' + '</li></ul>';
                }, '');

                User.find()
                    .then(data => {
                        data.forEach(user => {
                            console.log(user);
                            console.log(content);
                            
                            
                            var mailOptions = {
                                from: 'yamadaviu@gmail.com',
                                to: `${user.email}`,
                                subject: 'Checkout the latest and the most popular question On HacktivOverFlow!',
                                html: `
                    <div class="container"> 
            <div class="row">
                    <div class="col-sm-4 offset-sm-4" style="border-left: 6px solid red;">
                        
            <h1><img src="https://s3.amazonaws.com/wgvs-inbound-prod/avatars/default/avatar5.png"></h1>
            <h1>Hello, this is from HacktivOverFlow.</h1><br>
            <p>Here the popular and the latest Question for you to check!</p>
            <div>${content}</div>
            <p>
                <br>Go Check it Now! <br>
                <b>Thank You ^^</b>
            </p>
        </div>
        </div>
        </div>
        
                    `
                            };

                            transporter.sendMail(mailOptions, (err, info) => {
                                if (err) throw err;
                                console.log('Email sent: ' + info.response);
                            });
                        });
                    })
                    .catch(err => {
                        console.log(err);

                    })

            })
            .catch(err => {
                console.log(err);

            })




    }, null, true, 'Asia/Jakarta');
}

