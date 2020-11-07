const Vonage = require('@vonage/server-sdk')

const VONAGE_API_KEY = '',
    VONAGE_API_SECRET = '',
    from = 'VONAGE_BRAND_NAME', // * name provided by Vonage
    to = '+919830822334'

const vonage = new Vonage({
    apiKey: VONAGE_API_KEY,
    apiSecret: VONAGE_API_SECRET
})

exports.sendSMS = async(user) => {

    let text = `Name:${user.name},
                  Email: ${user.email}, 
                  Phone: ${user.phone},
                  message: ${user.message}`

    return vonage.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
            // ! SMS will fail since creds not wired
            console.log("SMS failed:", err)

        } else {
            if (responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    })
}