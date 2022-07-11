const {SlashCommandBuilder} = require('@discordjs/builders')
const {MessageEmbed} = require('discord.js')

module.exports = {
    name:"current",
    description:"Shows all songs within the queue",
    data: new SlashCommandBuilder().setName('current').setDescription("Shows current song to be in queue"),

    async execute(client,interaction){
        const queue = client.queue // queue represented by the set
        if (client.queue.size === 0){
            await interaction.reply("No songs in the queue to show. Use the add_song command to add songs to the queue")
            return;        
        }
        const [first] = client.queue // gets first element in set

        const exampleEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Music Queue')
        .setDescription("This shows the current music songs in the queue")
        .addFields(
            {name:"Current song in queue",value: first},
        )

        return await interaction.reply({ embeds: [exampleEmbed] });
        
	}

}