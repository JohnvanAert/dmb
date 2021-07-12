module.exports = {
    name: 'ping',
    description: 'this is a ping command',
    permissions: ["MANAGE_MESSAGES"],
    execute(message,args, cmd, client, Discord) {
        message.channel.send('pong!');
    }
}