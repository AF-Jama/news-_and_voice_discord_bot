const {SlashCommandBuilder} = require('@discordjs/builders')
module.exports = {
    name:"ping",
    description:"Replies with pong when slash command ping is used",
    data: new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),

    async execute(interaction){
        await interaction.reply('Pongo!')   
    }
}

