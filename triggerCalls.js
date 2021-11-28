const accountSid = 'AC73f08504c3665ec4e1e96f4a4ed2119c';
const authToken = 'e92b9ad2de95f5d1e8d1f82ad7f734e3';
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

        Promise.allSettled(calls);

    } catch (error) {
        console.log(error)
    }

}

module.exports = triggerCalls;