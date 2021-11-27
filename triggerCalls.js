const accountSid = 'AC73f08504c3665ec4e1e96f4a4ed2119c';
const authToken = 'e92b9ad2de95f5d1e8d1f82ad7f734e3';
const client = require('twilio')(accountSid, authToken);

async function triggerCalls() {
    try {

        await client.calls.create({
            url: 'http://demo.twilio.com/docs/voice.xml',
            from: '+17409266971',
            to: '+919443246445'
        });

        await client.calls.create({
            url: 'http://demo.twilio.com/docs/voice.xml',
            from: '+17409266971',
            to: '+919626031816'
        });

        await client.calls.create({
            url: 'http://demo.twilio.com/docs/voice.xml',
            from: '+17409266971',
            to: '+919486437010'
        });

        await client.calls.create({
            url: 'http://demo.twilio.com/docs/voice.xml',
            from: '+17409266971',
            to: '+16825602347'
        });

        await client.calls.create({
            url: 'http://demo.twilio.com/docs/voice.xml',
            from: '+17409266971',
            to: '+919842283476'
        });

    } catch (error) {
        console.log(error)
    }

}

module.exports = triggerCalls;