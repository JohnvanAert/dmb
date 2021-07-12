const util = require('minecraft-server-util');
module.exports = {
    name: 'mineserver',
    description: 'get information about a minecraft server',
    execute(client, message, args, Discord){
        if(!args[0]) return message.channel.send('Please enter a minecraft server ip');
        if(!args[1]) return message.channel.send('Please enter a minecraft server port');
 
        util.status(args[0], {port: parseInt(args[1])}).then((response) =>{
            console.log(response);
            // const embed = new Discord.MessageEmbed()
            // .setColor('#BFCDEB')
            // .setTitle('Mc server status')
            // .addFields(
            //     {name: 'Server IP', value: Response.host},
            //     {name: 'Online Players', value: Response.onlinePlayers},
            //     {name: 'Max Players', value: Response.maxPlayers},
            //     {name: 'Version', value: Response.version}
            // )
            // .setFooter('Mc server util by CodeLyon');
 
            // message.channel.send(embed);
        })
        .catch ((error) =>{
            message.channel.send('there was an error finding this server');
            throw error;
        })
    }
}