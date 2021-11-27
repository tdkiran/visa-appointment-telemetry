const { TelegramClient } = require('telegram')
const { StringSession } = require('telegram/sessions')
const triggerSms = require('./triggerSms');
const triggerCalls = require('./triggerCalls');
const input = require('input'); // npm i input
const keywords = 'na,iw,available,avail';

async function checkMessageAndTriggerAction(client) {
    console.log('checkMessageAndTriggerAction')
    const msgs = await client.getMessages("@H1B_H4_Visa_Dropbox_slots", {
        limit: 50,
    });

    let requireAction = false;

    msgs.forEach(msgObj => {
        keywords.split(',').forEach(key => {
            if(msgObj.message.toLowerCase().includes(key.toLowerCase())) requireAction = true;
        });
    });

    if(requireAction) {
        console.log('sendign sms')
        await triggerSms();
        console.log('call our army')
        await triggerCalls();


    } else {
        console.log('No message with required keywords')
    }
}

const apiId = 15924138

const apiHash = 'c35151e556566cdf446a915e403a77b0';

const stringSession = new StringSession('1AQAOMTQ5LjE1NC4xNzUuNTIBu2pOWk/BfI/oUQZ2OR/68dUTa8xMwrvOtGhz4wgtxRBX8/Jj/Gll2lrYkrIXtHZ5hHql79XHgEkzHad7Vja4MUFe/cGYYGvP7yoj1knINzIOXluLof7k16n+NP9Gswf/hQ2tuw5DL80+PYAPlUvMxOWcoc6M3QnPE0Q051rtq6RtKwBcaN2UGaYB63Fpwh4BWHhaiOAj/o1gf6AZfdULDg6nPEXwxRvW62dKjFSN8niGH4OOMZM08oGOMHtP4yZeudE1KimFByasIng17qG5v5d11mLIUwQ62hqI8sUwAIvlYirOiydtpm0n+oDurBGfBF0s9l1ibEL53gReQrT231w=');
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

    setInterval(checkMessageAndTriggerAction.bind(null, client), 60000);

})()

