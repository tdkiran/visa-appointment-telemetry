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
                msgObj.message.toLowerCase().includes(key.toLowerCase())
            ) requireAction = true;
        });
    });

    if (requireAction) {
        console.log('sending sms & calling peeps' + (new Date).toTimeString)
        const voiceCallJob = triggerCalls();
        const smsJob = triggerSms();
        await Promise.allSettled(smsJob, voiceCallJob);
    } else {
        console.log('No message with required keywords')
    }
}

// const apiId = 15924138
const apiId = 10290449


// const apiHash = 'c35151e556566cdf446a915e403a77b0';
const apiHash = 'd834f091d8fe613e2b96515075d4ebb2';

const stringSession = new StringSession('1BQANOTEuMTA4LjU2LjExMAG7oQeOOC67Mf7seXj7+GmTEBtgIIxM58zW+enzse2DE56Ku9Yl9vLejJ9+65zcwIbG/Xi/AUQR+2yiTdVzqdcWvaSe4Ex6nM/4xadxbPyJWfng1qHl1W/bQ7c8b+so1esTdAZMOt99vBCueDRkPLRRvZ7jCYBCoU7ZgjVBXvK56NmjstsBVE757bnp0wV/jz8/Jhwz0Rvc0/QJg8dodeuXLQc8NCikhSVCIe4qnQsp0Z7Ru1q1yOuJasAt5Q8sKicGr+rDG5eDiCZiiZ3Pbq1y438r0ZX+QkeIRAXTHaarrQKZLFjZH15IsocGonavXTH0R+CImga6q4b/YP5Hw3TS9g==');
(async () => {
    console.log('Loading interactive example...')
    const client = new TelegramClient(stringSession, apiId, apiHash, { connectionRetries: 5 })
    await client.start({
        phoneNumber: async () => await input.text('+17033991806'),
        password: async () => await input.text('password?'),
        phoneCode: async () => await input.text('Code'),
        onError: (err) => console.log(err),
    });
    console.log('You should now be connected.')
    console.log(client.session.save()) // Save this string to avoid logging in again
    // await client.sendMessage('@H1B_H4_Visa_Dropbox_slots', { message: 'Hello!' });

    setInterval(checkMessageAndTriggerAction.bind(null, client), timeFrequency);

})()

