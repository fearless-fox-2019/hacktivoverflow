const nodemailer = require('nodemailer')

// let obj = {
//     name : `${data.UserId.firstname} ${data.UserId.lastname}`,
//     email : data.UserId.email,
//     titleQuestion : data.title,
// }

module.exports =  {
     // send email
    sendNotification(obj){
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: `fancytodooomailer@gmail.com`,
                pass: process.env.NODE_MAILER_PASSWORD
            }
        })
    
        const emailCont = `
        Dear <strong>${obj.name}</strong>,
        <div>Someone just answered your question with title <strong>'${obj.titleQuestion}'<strong>,</div>
        <div>Don't forget to check!</div>
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
            subject: 'Someone answer your question!', // Subject line
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
    },
    sendBirthday(obj) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: `fancytodooomailer@gmail.com`,
                pass: process.env.NODE_MAILER_PASSWORD
            }
        })
    
        const emailCont = `
        Dear <strong>${obj.name}</strong>,
       
        <div>HackOverflow.</div>`
    
        console.log(emailCont);
        
        const mailOptions = {
            from: 'admin@jfinder.com', // sender address
            to: obj.email, // list of receivers
            subject: 'Someone answer your question!', // Subject line
            html: emailCont
        };
        console.log(mailOptions);
    
        // transporter.sendMail(mailOptions, function (err, info) {
        //     if(err){
        //         console.log(err);
        //         console.log("gagal send");
                
        //     } else {
        //         console.log(info);
        //         console.log("ke send alhamdulillah");
                
        //     }
        // })
    }

}