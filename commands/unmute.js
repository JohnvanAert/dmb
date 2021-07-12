module.exports = {
    name: 'unmute',
    description: 'unmute users',
    permissions: ["MUTE_MEMBERS"],
    execute(message,args, cmd, client, Discord) {
        const target = message.mentions.users.first();
        if (target) {
            let mainRole = message.guild.roles.cache.find(role => role.name === 'member')
            let muteRole = message.guild.roles.cache.find(role => role.name === 'mute')
            
            let memberTarget = message.guild.members.cache.get(target.id);

            memberTarget.roles.remove(muteRole.id);
            memberTarget.roles.add(mainRole.id);
            message.channel.send(`<@${memberTarget.user.id}> has been muted`);
        } if (!member.hasPermission('KICK_MEMBERS')) return message.channel.send('У тебя недостаточно прав!');
         else {
            message.channel.send('Не могу найти данного пользователя!')
        }
    }
}