const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD
  }
})

function sendEmail (to, body) {
  console.log(process.env.NODEMAILER_EMAIL, process.env.NODEMAILER_PASSWORD)
  let mailOptions = {
    from: process.env.NNODEMAILER_EMAIL,
    to: to,
    subject: `welcome to hoverflow, a place where you cant get more knoledge by asking other people and answering peoples question`,
    html: body
  }

  transporter.sendMail(mailOptions, function (error, success) {
    if (error) {
      console.log(error)
    } else {
      console.log(success)
    }
  })
}

module.exports = sendEmail
