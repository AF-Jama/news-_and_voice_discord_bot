const {SlashCommandBuilder} = require('@discordjs/builders')

module.exports = {
    name:"pin",
    description:"Pins a message to the top of the channel",
    data: new SlashCommandBuilder().setName('pin').setDescription('Pins a message to the top of the channel')
    .addStringOption(option=>option
        .setName('pin-text')
            .setDescription('Text to pin')
            .setRequired(true)), // required

    async execute(client,interaction){
        const pinMessage = interaction.options.getString('pin-text')
        await interaction.reply(pinMessage)
        await interaction.channel.messages.pin({content:pinMessage, ephemeral:true})
    }
}
