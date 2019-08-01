"use strict";

const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: false,
    auth: {
      type: 'login',
      user: process.env.GOOGLE_EMAIL_USER, // generated ethereal user
      pass: process.env.GOOGLE_EMAIL_PASS // generated ethereal password
    },
    tls: { rejectUnauthorized: false }
});


module.exports = transporter