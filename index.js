const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client();
const prefix = '-';
const fs = require('fs');


client.commands = new Discord.Collection();
client.events = new Discord.Collection();



['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client,Discord);
})

client.on('guildMemberAdd', guildMember =>{
    let welcomeRole = guildMember.guild.roles.cache.find(role =>role.name === 'member');
    guildMember.roles.add(welcomeRole);
    guildMember.guild.channels.cache.get('774997601778008067').send(`<@${guildMember.user.id}>Добро пожаловать в качалку!`)
})

client.login(process.env.DISCORD_TOKEN);

