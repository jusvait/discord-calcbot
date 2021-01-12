require('dotenv').config();

const Discord = require('discord.js');
const discordToken = process.env.DISCORDTOKEN;
const client = new Discord.Client();

const WolframAlphaAPI = require('wolfram-alpha-api');
const waAPIKey = process.env.WAKEY;
const waApi = WolframAlphaAPI(waAPIKey);

// Discord bot
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', msg => {
    if (!msg.author.bot && msg.content.startsWith('!ask ')) {
        const question = msg.content.substring(5);

        waApi.getShort(question).then((response) => {
            msg.channel.send(response);
        }).catch((error) => {
            console.log(error);
            msg.channel.send("I couldn't understand that");
        });
    }
});

client.login(discordToken);
