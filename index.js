require('dotenv').config();
const { TelegramClient } = require('telegram')
const { StringSession } = require('telegram/sessions')
const { keyWords, noOfMessages, timeFrequency } = require('./config');
const triggerSms = require('./triggerSms');
const triggerCalls = require('./triggerCalls');
const input = require('input'); // npm i input


async function checkMessageAndTriggerAction(client) {
    console.log('checkMessageAndTriggerAction')
    const msgs = await client.getMessages("@H1B_H4_Visa_Dropbox_slots", {
        limit: noOfMessages,
    });

    let requireAction = false;

    msgs.forEach(msgObj => {
        keyWords.forEach(key => {
            if (
                !(msgObj.message.toLowerCase().includes('group rules')) &&
                msgObj.message.toLowerCase().includes(key.toLowerCase() ||
                    msgObj?.photo?.className === 'Photo'
                )
            ) requireAction = true;
        });
    });

    if (requireAction) {
        console.log('sending sms & calling peeps' + (new Date).toTimeString())
        const voiceCallJob = triggerCalls();
        const smsJob = triggerSms();
        await Promise.allSettled([smsJob, voiceCallJob]);
    } else {
        console.log(
            `No message with required keywords ${(new Date).toTimeString()}`
        )
    }
}

// const apiId = 15924138
const apiId = 10290449


// const apiHash = 'c35151e556566cdf446a915e403a77b0';
const apiHash = process.env.HASH;

const stringSession = new StringSession(process.env.SECRET);

(async () => {
    console.log('Loading interactive example...')
    const client = new TelegramClient(stringSession, apiId, apiHash, { connectionRetries: 5 })
    await client.start({
        phoneNumber: async () => await input.text('phone number'),
        password: async () => await input.text('password?'),
        phoneCode: async () => await input.text('Code'),
        onError: (err) => console.log(err),
    });
    console.log('You should now be connected.')
    console.log(client.session.save()) // Save this string to avoid logging in again
    // await client.sendMessage('@H1B_H4_Visa_Dropbox_slots', { message: 'Hello!' });

    setInterval(checkMessageAndTriggerAction.bind(null, client), timeFrequency);

})()

