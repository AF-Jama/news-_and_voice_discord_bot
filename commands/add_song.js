const {SlashCommandBuilder} = require('@discordjs/builders')


module.exports = {
    name:"add_song",
    description:"add search to queue",
    data: new SlashCommandBuilder().setName('add_song').setDescription("Add search to queue")
    .addStringOption(option=>option
        .setName('search')
        .setDescription('search')
        .setRequired(true)),

    async execute(client,interaction){
        const search = interaction.options.getString('search')
        console.log(search)
        client.queue.add(search)
        console.log(client.queue)
        await interaction.reply({content:`The search term - ${search} has been added to the queue`,ephemeral:true})
    }

}