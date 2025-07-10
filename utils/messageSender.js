module.exports.messageSender = (member, number) => {
    const accountSid = process.env.AccountSID;
    const authToken = process.env.AuthToken;
    const client = require('twilio')(accountSid, authToken);

    client.messages
        .create({
            body: `Hi , 👋🏼

Please follow up with the customer below for payment collection:

Customer Name: ${member}
Phone: ${number}



Kindly remind them to complete the payment. Here’s the payment link you can share with them: 👇🏼`,
            from: 'whatsapp:+14155238886',
            to: `whatsapp:+919630297591`
        })
        .then(message => console.log(message.sid))

}