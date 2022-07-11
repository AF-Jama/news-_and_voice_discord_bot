const {SlashCommandBuilder} = require('@discordjs/builders')
const { VoiceConnectionStatus, AudioPlayerStatus } = require('@discordjs/voice');
const {player} = require('./play')

module.exports = {
    name:"clear",
    description:"Clears queue",
    data: new SlashCommandBuilder().setName("clear").setDescription("Clears queue"),

    async execute(client,interaction){
        if(client.queue.size ===0){
            return await interaction.reply("Cannot clear queue as it is already empty")
        }
        client.queue.clear()
        return await interaction.reply("Queue has been sized")
    }
};
