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
const apiHash = 'd834f091d8fe613e2b96515075d4ebb2';

const stringSession = new StringSession('1BQANOTEuMTA4LjU2LjExMAG7RMJUcZcH9NmXXlkH04pAc5qhG4A4CedkNitPskG1ZREFZI6H8bNF+ko38AWJKNTefEgecnk7u7mq8PgpUGStuudX/BShQ6v3Y6Ybr8W72linQACY3wRGSpALyFDjT0YRHAWeC+9et2Lb9g0EWRPrATegXIgmcG1PVJKuZqtnxK/QmVm8t5yVjlIS9x7gRLktHwkRaYM/pq4am8FRQPQP056pSbUFNw5AW1GB75cCXjbYWQc7Ln0XFqYdMwiVQufO1qhAy+MgRUFGk+FEwphMKuaUMIR/aHejAsFF5srLlKBAJJSiN8cE8bg/XV2VwekbDvulA8QiEkJbMhr0jF5pyg==');
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

