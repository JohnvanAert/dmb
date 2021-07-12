module.exports = {
    name: 'kick',
    aliases: ['kk', 'kck'],
    permissions: ["KICK_MEMBERS"],
    description: "kick the users",
    execute(message,args, cmd, client, Discord) {
        const memb = message.mentions.users.first();
        // if (message.member.roles.cache.has('856114655302909983')) return message.channel.send('ты не можешь кикнуть этого человека');
        if (memb) {
            const memberTarger = message.guild.members.cache.get(memb.id);
            memberTarger.kick();
            message.channel.send(`<@${memb.id}> был кикнут`);

        } else {
            message.channel.send('ты не можешь кикнуть этого человека');
        }
    }
}