const {SlashCommandBuilder} = require('@discordjs/builders')
const {MessageEmbed} = require('discord.js')


module.exports = {
    name:"show",
    description:"Shows all songs present in music queue",
    data: new SlashCommandBuilder().setName('show').setDescription('Shows all songs present in music queue'),


    async execute(client,interaction){
        if(!interaction.channel.name.includes('music')){
            return await interaction.reply({content:"You must be music text channel to music commands"})
        }
        if(client.queue.size === 0){
            return await interaction.reply({content:`Queue is empty`,ephemeral:true})
        }
        client.queue.forEach((song,i)=>{
            console.log(song)
        })
        await interaction.reply({content:`${client.queue}`})
    }
}