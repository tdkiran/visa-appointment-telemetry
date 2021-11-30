const { people } = require('./config');

const accountSid = 'AC73f08504c3665ec4e1e96f4a4ed2119c';
const authToken = '2fcde83059fb06be1bd396cb0ac7dc60';
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