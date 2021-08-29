const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const queue = new Map();

module.exports = {
    name: 'play',
    aliases: ['skip','stop','pause','resume','up','down'],
    permissions: ["CONNECT","SPEAK"],
    cooldown: 1,
    description: 'Музыкальный Бот',
    async execute(message,args, cmd, client, Discord){
    const voice_channel = message.member.voice.channel;
        if (!voice_channel)return message.channel.send('Тебе нужно быть на голосовом канале!');
        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('У тебя недостаточно прав!');
        if (!permissions.has('SPEAK')) return message.channel.send('У тебя недостаточно прав!');

        const server_queue = queue.get(message.guild.id);


        if(cmd === 'play'){
            if (!args.length) return message.channel.send('Нужно второе значение!');
            let song = {};

            if (ytdl.validateURL(args[0])) {
                const song_info = await ytdl.getInfo(args[0]);
                song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url }
            } else {
                const video_finder = async (query) =>{
                    const video_result = await ytSearch(query);
                    return (video_result.videos.length > 1) ? video_result.videos[0] : null;
                }
                const video = await video_finder(args.join(''));
                if (video) {
                    song = {title: video.title, url: video.url}
                } else {
                    message.channel.send('Ошибка, не нашли видео');
                }
            }
            if (!server_queue) {
                const queue_constructor = {
                    voice_channel: voice_channel,
                    text_channel: message.channel,
                    connection: null,
                    songs: []
                }
                queue.set(message.guild.id, queue_constructor);
                queue_constructor.songs.push(song);
    
                try {
                    const connection = await voice_channel.join();
                    queue_constructor.connection = connection;
                    video_player(message.guild, queue_constructor.songs[0]);
                } catch (err) {
                    queue.delete(message.guild.id);
                    message.channel.send('Ошибка соединения!');
                    throw err;
                }
            } else {
                    server_queue.songs.push(song);
                    return message.channel.send(`🎵 **${song.title}** добавлена в очередь`);
                }
            }
            
            else if(cmd === 'skip') skip_song(message, server_queue);
            else if(cmd === 'stop') stop_song(message,server_queue);
            else if(cmd === 'pause') pause_song(message,server_queue);
            else if(cmd === 'resume') resume_song(message,server_queue);
            else if(cmd === 'up') volume_up(message,server_queue);
            else if(cmd === 'down') volume_down(message,server_queue);
        }
    }
const video_player = async (guild, song) => {
    const song_queue = queue.get(guild.id);

    if(!song) {
        song_queue.voice_channel.leave();
        queue.delete(guild.id);
        return;
    }
    const stream = ytdl(song.url, {filter: 'audioonly'});
    song_queue.connection.play(stream, {seek: 0, volume: 1})
    .on('finish', () => {
        song_queue.songs.shift();
        video_player(guild, song_queue.songs[0]);
    });
    await song_queue.text_channel.send(`🎵 сейчас играет **${song.title}**`);
}

const skip_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('Тебе нужно быть на канале что бы использовать эту комманду');
    if (!server_queue) {
        return message.channel.send(`нету песен на очереди `);
    }
    server_queue.connection.dispatcher.end();
}
const stop_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('Тебе нужно быть на канале что бы использовать эту комманду');
    server_queue.songs = [];
    server_queue.connection.dispatcher.end();
}

const pause_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('Тебе нужно быть на канале что бы использовать эту комманду');
    server_queue.connection.dispatcher.pause();
    message.channel.send('Песня на паузе');
}

const resume_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('Тебе нужно быть на канале что бы использовать эту комманду');
    server_queue.connection.dispatcher.resume();
    message.channel.send('Песня возобновлена');
}

const volume_up = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('Тебе нужно быть на канале что бы использовать эту комманду');
    server_queue.connection.dispatcher.setVolume(1);
    message.channel.send('Звук увеличен');
}

const volume_down = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('Тебе нужно быть на канале что бы использовать эту комманду');
    server_queue.connection.dispatcher.setVolume(0.25);
    message.channel.send('Звук уменьшен');
}

