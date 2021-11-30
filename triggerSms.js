const { people } = require('./config');

const accountSid = process.env.SID;
const authToken = process.env.TOKEN;
const client = require('twilio')(accountSid, authToken);

async function triggerSms() {
    try {
        const dateStr = (new Date()).toTimeString();
        const smsJobs = people.map(contact => {
            return client.messages.create({
                body: `Please check visa appointment ${dateStr}`,
                from: '+17409266971',
                to: contact.phone
            });
        })

        return Promise.allSettled(smsJobs);

    } catch (error) {
        console.log(error)
    }

}

module.exports = triggerSms;