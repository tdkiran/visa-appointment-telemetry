const { people } = require('./config');

const accountSid = 'AC73f08504c3665ec4e1e96f4a4ed2119c';
const authToken = 'ce2ce422bb06537dc912dbae896b8a8e';
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

        await Promise.allSettled(smsJobs);

    } catch (error) {
        console.log(error)
    }

}

module.exports = triggerSms;