const twilio = require('twilio');
const sendMessageTwilio = (body, to) => {

    return new Promise((resolve, reject) => {
        var client = new twilio(config("twilio").twilio_account_sid, config("twilio").twilio_auth_token);
        client.messages.create({
            body: body,
            to: to, // Text this number
            from: config("twilio").twilio_phone_number // From a valid Twilio number
        }, (err, message) => {
            if (err) {
                reject(err)
            } else {
                resolve(message.sid)
            }
        });
    })
};
module.exports.sendMessageTwilio = sendMessageTwilio;