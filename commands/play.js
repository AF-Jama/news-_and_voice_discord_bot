const {joinVoiceChannel} = require('@discordjs/voice')
const ytdl = require('ytdl-core');
const {SlashCommandBuilder} = require('@discordjs/builders')
const { createAudioPlayer,createAudioResource,NoSubscriberBehavior } = require('@discordjs/voice');

const player = createAudioPlayer({
	behaviors: {
		noSubscriber: NoSubscriberBehavior.Pause,
	},
});

module.exports = {
    name:"play",
    description: "Connects and Plays music",
    data: new SlashCommandBuilder().setName('play').setDescription('Connects and plays audio')
        .addStringOption(option=>option
            .setName('query')
            .setDescription('string that is the youtube url')
            .setRequired(true)),

    async execute(interaction){
        const voiceChannel = interaction.member.voice.channel;
        if(!voiceChannel){
            await interaction.reply("You must be in a voice channel to use this command") // triggered if interaction is used when user is not in a voice channel
            return;
        } 

        try{
            const connection  = joinVoiceChannel({
                guildId: interaction.guild.id,
                channelId: voiceChannel.id,
                adapterCreator: voiceChannel.guild.voiceAdapterCreator,
                selfDeaf:false,
                selfMute:false,
            })
            const youtubeVid = ytdl( interaction.options.getString('query'),{filter: 'audioonly'}) // returns internal.readable format
            const resource = createAudioResource(youtubeVid);
            player.play(resource)
            connection.subscribe(player)
        }catch(err){
            interaction.reply(`There was an-error during the connection and playing of music ${err}`)
        }

    },
}