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
        if(client.queue.size<=5){
            const search = interaction.options.getString('search')
            client.queue.add(search)
            console.log(client.queue)
            return await interaction.reply({content:`The search term - ${search} has been added to the queue`,ephemeral:true})
        }
        return await interaction.reply({content:`Cannot add song as there is already 5 songs in the queue`,ephemeral:true})
    }

}