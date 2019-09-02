const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const sendWelcomeEmail = (name, email)=>{
    sgMail.send({
        to: email,
        from: 'jamesmungai.code@gmail.com',
        subject: 'welcome',
        text: `Hello ${name}, welcome to taskManager.com. How may we be of assist to you?`
    })
}  
const sendCancellationEmail = (name, email)=>{
        sgMail.send({
            to: email,
            from: 'jamesmungai.code@gmail.com',
            subject: 'welcome',
            text: `Hello ${name}, Please help us know how we can serve you better next time`
        })
}


module.exports = {sendWelcomeEmail, sendCancellationEmail}
