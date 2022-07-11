const {SlashCommandBuilder} = require('@discordjs/builders')
const {execute} = require('./play.js')


module.exports = {
    name:"skip",
    description:"Skips to next song if there is one",
    data: new SlashCommandBuilder().setName("skip").setDescription("Skips to next song if there is one"),

    async execute(client,interaction){
        if(client.queue.size ===0){
            return await interaction.reply("Cannot use this command as there is nothing else in the queue")
        }
        const [first] = client.queue // gets first element in set
        client.queue.delete(first)
        await execute(client,interaction) // executes play controller
    }
};
