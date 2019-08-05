require('dotenv').config()
const nodemailer = require("nodemailer");

function sendEmail(data) {
  console.log(process.env.EMAIL)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  const mailOptions = {
    from: "tanya-jawab@mail.com",
    to: data.email,
    subject: "Thank You",
    html:
      `Thank you for all your contributions during this month. ${data.count === 0 ? 'You never ask question to community. Ask something to contribute.' : 'You already ask ' + data.count + ' questions. Keep asking as community become bigger. Thank you.'}
       Tanya-Jawab`
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('success')
    }
  });
}

module.exports = sendEmail