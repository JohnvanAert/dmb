module.exports = {
    name: 'command',
    aliases: ['embeds', 'embd'],
    permissions: ["MANAGE_MESSAGES"],
    description: 'Embeds',
    execute(message,args, cmd, client, Discord) {
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#304281')
        .setTitle('Правила!')
        .setURL('https://youtube.com')
        .setDescription('Это правила сервера')
        .addFields(
            {name: 'Rule 1', value: 'Будь натуралом'},
            {name: 'Rule 2', value: 'Без оскорбления Аскара'},
            {name: 'Rule 3', value: 'Слушать Аскара'}
        )
    
        .setImage('https://i.natgeofe.com/n/9135ca87-0115-4a22-8caf-d1bdef97a814/75552.jpg?w=636&h=424')
        .setFooter('make sure to out the rules channel');

        message.channel.send(newEmbed)
    }
}