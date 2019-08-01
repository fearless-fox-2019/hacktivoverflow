const CronJob = require('cron').CronJob;
module.exports = (req, res, next) => {
    console.log('Before job instantiation');
    const job = new CronJob('* 10 * * * *', function () {
        let random = Math.floor(Math.random() * 4) + 1
        let categories = ['coding','job','business','learn','future']
        req.headers.job = categories[random]
        // console.log(req.headers.job)
    });
    console.log('After job instantiation');
    job.start();
    next()
}