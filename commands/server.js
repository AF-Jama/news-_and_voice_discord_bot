const {SlashCommandBuilder} = require('@discordjs/builders')

module.exports = {
    name:"server",
    description:'Returns server information',
    data: new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),

    async execute(interaction){
        await interaction.reply({content:`Server information is:\nname: ${interaction.guild.name.toUpperCase()}\nmembers: ${interaction.guild.memberCount}\ncreated on: ${interaction.guild.createdAt}`,
        ephemeral:true
    })
    }
}
