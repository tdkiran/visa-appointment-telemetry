const accountSid = process.env.SID;
const authToken = process.env.TOKEN;
console.log(accountSid, authToken);

const client = require('twilio')(accountSid, authToken);
const { people } = require('./config');

async function triggerCalls() {
    try {

        const calls = people.map(contact => {
            return client.calls.create({
                url: 'http://demo.twilio.com/docs/voice.xml',
                from: '+17409266971',
                to: contact.phone
            })
        });

        return Promise.allSettled(calls);

    } catch (error) {
        console.log(error)
    }

}

module.exports = triggerCalls;