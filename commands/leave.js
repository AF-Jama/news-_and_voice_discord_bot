const {SlashCommandBuilder} = require('@discordjs/builders')


module.exports = {
    name:'leave',
    description:'Kicks user out of guild',
    data: new SlashCommandBuilder().setName('leave').setDescription('Member leaves server'),

    async execute(interaction){
        await interaction.member.kick(`Used-leave slash command so ${interaction.member.user.username} has left the server`)
    }


}