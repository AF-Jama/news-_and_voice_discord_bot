const {SlashCommandBuilder} = require('@discordjs/builders')
const { description } = require('../utils')


module.exports = {
    name:"echo",
    description:'Echos string',
    data: new SlashCommandBuilder().setName('echo').setDescription("Echo's user input")
        .addStringOption(option=>option
            .setName('string1')
            .setDescription('string to be echoed')
            .setRequired(true)),

    async execute(client,interaction){
        await interaction.reply({content:interaction.options.getString('string1'),ephemeral:true})
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
    }
}