const {SlashCommandBuilder} = require('@discordjs/builders')


module.exports = {
    name:"skip",
    description:"Skips to next song if there is one",
    data: new SlashCommandBuilder().setName("skip").setDescription("Skips to next song if there is one"),

    async execute(client,interaction){
        
    }
};
