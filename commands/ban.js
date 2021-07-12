module.exports = {
    name: 'ban',
    permissions: ["BAN_MEMBERS"],
    description: 'ban the users',
    execute(message,args, cmd, client, Discord) {
        const member = message.mentions.users.first();
        if (member) {
            const memberTarger = message.guild.members.cache.get(member.id)
            memberTarger.ban();
            message.channel.send(`<@${member.id}>has been banned`);
        }else{
            message.channel.send('You could not ban that member');
        }
    }
}