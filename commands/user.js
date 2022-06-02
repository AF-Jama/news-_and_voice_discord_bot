const {SlashCommandBuilder} = require('@discordjs/builders')
const { execute } = require('./ping')


module.exports = {
    name:"user",
    description:"returns user information",
    data: new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),

    async execute(interaction){
        await interaction.reply({content:`Your username is: ${interaction.user.username}\n Your user id: ${interaction.user.id}`,ephemeral:true})
    }

}