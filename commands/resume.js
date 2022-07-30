const {SlashCommandBuilder} = require('@discordjs/builders')
const { VoiceConnectionStatus, AudioPlayerStatus } = require('@discordjs/voice');
const {player} = require('./play')

module.exports = {
    name:"resume",
    description:"resume current song playing in music channel",
    data: new SlashCommandBuilder().setName("resume").setDescription("Resumes music that has previosely been paused"),

    async execute(client,interaction){
        if(!player.paused){
            await interaction.reply("Cannot resume as nothing has been paused")
            return;
        }
        player.unpause() 
        player.paused = false // paused boolean becomes false
        return await interaction.reply("Song has been resumed.")
    }
}
