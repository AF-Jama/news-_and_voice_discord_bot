const {SlashCommandBuilder} = require('@discordjs/builders')
const { VoiceConnectionStatus, AudioPlayerStatus } = require('@discordjs/voice');
const {player} = require('./play')

module.exports = {
    name:"pause",
    description:"Pauses current song playing in music channel",
    data: new SlashCommandBuilder().setName("pause").setDescription("Pauses music channel"),

    async execute(client,interaction){
        if(!player.playing){
            await interaction.reply("Cannot pause as nothing is playing")
            return;
        }
        player.pause()
        player.paused = true
        return await interaction.reply("Song has been paused.")
    }
}
