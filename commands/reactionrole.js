module.exports = {
    name: 'reactionrole',
    aliases: ['rc', 'role', 'choose'],
    cooldown: 220,
    permissions: ["MANAGE_MESSAGES","MANAGE_ROLES"],
    description: "Sets up a reaction role message!",
    async execute(message,args, cmd, client, Discord) {
        const channel = '856599658083385354';
        const darkSide = message.guild.roles.cache.find(role => role.name === "dark side");
        const lightSIde = message.guild.roles.cache.find(role => role.name === "light side");
 
        const darkSideEmoji = '🔴';
        const lightSIdeEmoji = '🔵';
 
        let embed = new Discord.MessageEmbed()
            .setColor('#fff')
            .setTitle('Выбери сторону силы!')
            .setDescription('выбор стороны силы окажет влияние на твою жизнь!\n\n'
                + `${darkSideEmoji} темная сторона силы\n`
                + `${lightSIdeEmoji} светлая сторона силы`);
 
        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(darkSideEmoji);
        messageEmbed.react(lightSIdeEmoji);
 
        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
 
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === darkSideEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(darkSide);
                }
                if (reaction.emoji.name === lightSIdeEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(lightSIde);
                }

            } else {
                return;
            }
 
        });
 
        client.on('messageReactionRemove', async (reaction, user) => {
 
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
 
 
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === darkSideEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(darkSide);
                }
                if (reaction.emoji.name === lightSIdeEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(lightSIde);
                }
            } else {
                return;
            }
        });
    }
 
}   