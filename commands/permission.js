module.exports = {
    name: 'youtube',
    description: 'this is a youtube command',
    permissions: ["MANAGE_MESSAGES"],
    execute(message,args, cmd, client, Discord) {
        if (message.member.roles.cache.has('856114655302909983')) {
            message.channel.send('https://www.youtube.com');
            
        }
        else {
            message.channel.send('now you dont have permission');
            // message.member.roles.add('856114655302909983').catch(console.error);
            // message.member.roles.remove('856114655302909983').catch(console.error);
        }
    }
}