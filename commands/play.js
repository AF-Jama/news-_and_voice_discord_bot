const {joinVoiceChannel} = require('@discordjs/voice')
const ytdl = require('ytdl-core');
const {SlashCommandBuilder} = require('@discordjs/builders')
const { createAudioPlayer,createAudioResource,NoSubscriberBehavior,VoiceConnectionStatus,AudioPlayerStatus } = require('@discordjs/voice');
<<<<<<< HEAD
const ytsearch = require('yt-search')
=======
const {search,checkResultsForSearch} = require('../music/music.js')
>>>>>>> 9aa20fe (Refactored code base to create more modularity)


const player = createAudioPlayer({
    behaviors: {
        noSubscriber: NoSubscriberBehavior.Pause,
	},
});

<<<<<<< HEAD
const search = async (query)=>{
    const result = await ytsearch(query)
    return result
}

const checkResultsForSearch = (result)=>{
    return (result.length>0 ? result = result[0] : null)
}
=======

>>>>>>> 9aa20fe (Refactored code base to create more modularity)

module.exports = {
    name:"play",
    description: "Connects and Plays music",
    data: new SlashCommandBuilder().setName('play').setDescription('Connects and plays audio'),

    async execute(client,interaction){
        const voiceChannel = interaction.member.voice.channel;
        if(!voiceChannel){
            await interaction.reply("You must be in a voice channel to use this command") // triggered if interaction is used when user is not in a voice channel
            return;
<<<<<<< HEAD
        } 
=======
        }
        if(!voiceChannel.name.includes('music')){
            await interaction.reply({content:'You must be in a music channel to play music'})
            return;
        }

>>>>>>> 9aa20fe (Refactored code base to create more modularity)

        if (client.queue.size === 0){
            await interaction.reply("Please add song to the queue to be played")
            return;
        }
        const [first] = client.queue // gets first element in set
        
        try{
            const connection  = joinVoiceChannel({
                guildId: interaction.guild.id,
                channelId: voiceChannel.id,
                adapterCreator: voiceChannel.guild.voiceAdapterCreator,
                selfDeaf:false,
                selfMute:false,
            })
            const result = await search(first) // queuries search term in set 
            let {all} = result // dereference results   
            const video = checkResultsForSearch(all)
            if(!video) {
                // triggerd when video returns when search array is 0
                await interaction.reply("No matches for video, this search will now be removed")
                client.queue.delete(first) // removes search term from queue
                return;
            }      
            console.log(video)
            const {url,title} = video // destrucuture url from video object
            const youtubeVid = ytdl(url,{filter: 'audioonly'}) // returns internal.readable 
            const resource = createAudioResource(youtubeVid); // creating resource that can be played
            player.play(resource) // plays audio resource 
            connection.subscribe(player) // connection to subcribes to audio player
            player.playing = true // playing set to true
            interaction.reply({content:`Now playing -  ${title}`})
        }catch(err){
            interaction.reply(`There was an-error during the connection and playing of music ${err}`)
        }
        
    },
    player
}


