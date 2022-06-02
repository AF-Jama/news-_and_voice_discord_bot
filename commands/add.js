const {SlashCommandBuilder} = require('@discordjs/builders')


module.exports = {
    name:'add',
    description:"Adds two numbers togethor",
    data: new SlashCommandBuilder().setName('add').setDescription("Adds number")
        .addNumberOption(option=>option
                .setName('num1')
                .setDescription('The first number')
                .setRequired(true))
                
        .addNumberOption(option=>option
            .setName('num2')
            .setDescription('Second number')
            .setRequired(true)),

    async execute(interaction){
        const total = interaction.options.getNumber('num1') + interaction.options.getNumber('num2')
        console.log(`Total is ${total}`)
        await interaction.reply({content:total.toString(),ephemeral:true})
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
    }
}