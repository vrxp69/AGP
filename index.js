const { Client } = require('discord.js');
const client = new Client({ disableEveryone: true});
const { promisify } = require('util');
const readdir = promisify(require("fs").readdir);
const klaw = require('klaw');
const path = require('path');
require('dotenv').config();
const daddy = require('express')
const web = daddy();
const port = 3000

web.get('/', (req, res) => res.send('ver: 1.2 | CorruptedBytes | AGP'))

web.listen(port, () =>
console.log(`Your app is listening to http://localhost:${port}`)
);
client.login(process.env.TOKEN);

const init = async () => {
    const evtFiles = await readdir("./events/");
    console.log(`Loading a total of ${evtFiles.length} events`);
    evtFiles.forEach(file => {
        const eventName = file.split(".")[0];
        console.log(`Loaded the event ${eventName}`);
        const event = new (require(`./events/${file}`))(client);
        client.on(eventName, (...args) => event.run(...args));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
};

init();