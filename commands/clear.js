module.exports = {
    name: 'clear',
    aliases: ['cl', 'clr'],
    cooldown: 5,
    permissions: ["MANAGE_MESSAGES"],
    description: 'Clear the messages',
    async execute(message,args, cmd, client, Discord) {
        if (!args[0]) return message.reply("Напиши количество сообщений для очистки");
        if(isNaN(args[0])) return message.reply("Нужно написать цифру");
        if (args[0] > 100) return message.reply("ты не можешь удалить более 100 сообщений");
        if (args[0] < 1) return message.reply("ты должен удалить хотя-бы одно сообщение");
        
        await message.channel.messages.fetch({limit: args[0]}).then(messages => {
            message.channel.bulkDelete(messages);
        })
    }
}