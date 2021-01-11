const Discord = require('discord.js');
const discordToken = process.env.discordToken;
const client = new Discord.Client();

const WolframAlphaAPI = require('wolfram-alpha-api');
const waAPIKey = process.env.waAPI;
const waApi = WolframAlphaAPI(waAPIKey);

// Discord bot
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', msg => {
    if (!msg.author.bot && msg.content.startsWith('!ask ')) {
        const question = msg.content.substring(5);

        waApi.getSimple({
            i: question,
            width: 320,
            background: '224466',
            foreground: 'white'
        }).then((url) => {
            var message = new Discord.MessageEmbed(data);

            const image = url;
            const imageStream = Buffer.from(image, 'base64');
            const attachment = new MessageAttachment(imageStream);
            richEmbed.attachFile(attachment);

            msg.channel.send(`${message.author}`, message);
        }).catch(() => {
            console.error;
            msg.channel.send('Oops! Something went wrong.');
        });
    }
});

client.login(discordToken);
