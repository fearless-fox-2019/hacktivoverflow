const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
       user: `hackoverflow123@gmail.com`,
       pass: `hacktiv8Super`
   }
})

module.exports = (obj) => {
     // send email


    const emailCont = `
    Dear <strong>${obj.name}</strong>,
    <div>Today is your Birthday!! Happy birthday, we wish u all the best!,</div>
    <div>Stay healthy and don't forget to always grateful!!!</div>
    <br/>
    <div>Best regards,</div>
    <br>
    <br>
    <br>
    <div>HackOverflow.</div>`

    console.log(emailCont);
    
    const mailOptions = {
        from: 'admin@jfinder.com', // sender address
        to: obj.email, // list of receivers
        subject: 'Happy Birthday to you!!!!', // Subject line
        html: emailCont
    };
    // console.log(emailCont);
    transporter.sendMail(mailOptions, function (err, info) {
        if(err){
            console.log(err);
            console.log("gagal send");
            
        } else {
            console.log(info);
            console.log("ke send alhamdulillah");
        }
    })
    transporter.close();
}