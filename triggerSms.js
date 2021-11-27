const accountSid = 'AC73f08504c3665ec4e1e96f4a4ed2119c';
const authToken = 'ce2ce422bb06537dc912dbae896b8a8e';
const client = require('twilio')(accountSid, authToken);

async function triggerSms() {
    try {
        const dateStr = (new Date()).toTimeString();
        await client.messages.create({
            body: `Please check visa appointment ${dateStr}`,
            from: '+17409266971',
            to: '+919486437010'
        });
        await client.messages.create({
            body: `Please check visa appointment ${dateStr}`,
            from: '+17409266971',
            to: '+919443246445'
        });
        await client.messages.create({
            body: `Please check visa appointment ${dateStr}`,
            from: '+17409266971',
            to: '+919626031816'
        });

        await client.messages.create({
            body: `Please check visa appointment ${dateStr}`,
            from: '+17409266971',
            to: '+16825602347'
        });
    } catch (error) {
        console.log(error)
    }

}

module.exports = triggerSms;