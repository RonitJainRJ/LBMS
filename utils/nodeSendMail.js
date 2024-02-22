const nodemailer = require('nodemailer');
var nodeoutlook = require('nodejs-nodemailer-outlook')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAILPASSWORD
    }
});  //creating a transporter or intiliazing ...

  
//function for sending the mail via api/sendMails
async function sendMails(fromEmail, toEmail, sub, details, attachment) {
    return new Promise(async (resolve, reject) => {
        try{
            mailOption = {
                from: fromEmail,
                to: toEmail,
                subject: sub,
                html: details,
                attachments: attachment
            }
            transporter.sendMail(mailOption, function (err, info) {
                if (err) {
                    console.log(err)
                    resolve({ code: 404, message: err });
                }
                else {
                    resolve({ code: 200, message: 'Mail Delievered' });
                }
            });                        
        }catch(err){
            reject(err.message)
        }
    })
}

module.exports = sendMails;