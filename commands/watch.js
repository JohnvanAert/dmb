const Discord = require('discord.js');
const client = new Discord.Client();
const { DiscordTogether } = require('discord-together');
const botToken = process.env.DISCORD_TOKEN;

module.exports = {
    name: 'watch',
    aliases: ['stream'],
    permissions: ["CONNECT","SPEAK"],
    cooldown: 1,
    description: 'Ютуб Бот',
    async execute(message,args, cmd, client, Discord) {

        client.discordTogether = new DiscordTogether(client);
        client.on('message', async message => {
            if (message.content === 'start') {
                if(message.member.voice.channel) {
                    client.discordTogether.createTogetherCode(message.member.voice.channelID, 'youtube').then(async invite => {
                        return message.channel.send(`${invite.code}`);
                    });
                };
            };
        });
        client.login(botToken);
    }
}