const nodemailer = require('nodemailer')
const sendGrid = require('nodemailer-sendgrid-transport')

const SENDGRID_USERNAME = '',
    SENDGRID_PASSWORD = ''

const transporter = nodemailer.createTransport(sendGrid({
    auth: {
        api_user: SENDGRID_USERNAME,
        api_key: SENDGRID_PASSWORD,
    }
}))

exports.sendMail = async(user) => {

    return transporter.sendMail({
            to: 'debottom.bhatt@webspiders.com',
            from: 'sampleuser@gmail.com',
            html: `<div>
                    <h1>name: ${user.name}</h1>
                    <h2>name: ${user.phone}</h2> 
                    <h2>name: ${user.email}</h2> 
                    <p>name: ${user.message}</p> 
                  </div>`
        }).then((res) => { console.log(res) })
        .catch(err => {
            // ! email will fail since cred not wired
            console.log("error from mailer:", err)
        })
}