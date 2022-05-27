import { SlashCommandBuilder } from "@discordjs/builders";
import {fs} from 'file-system'
// creation of slash commands here to be used and picked up by in the server the bot is in 


export const commands = [
    new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
    new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
    new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
    new SlashCommandBuilder().setName('add').setDescription("Adds number")
    .addNumberOption(option=>option
            .setName('num1')
            .setDescription('The first number')
            .setRequired(true))
            
    .addNumberOption(option=>option
        .setName('num2')
        .setDescription('Second number')
        .setRequired(true)),


    new SlashCommandBuilder().setName('leave').setDescription('Member leaves server'),
    new SlashCommandBuilder().setName('echo').setDescription("Echo's user input")
    .addStringOption(option=>option
        .setName('string1')
        .setDescription('string to be echoed')
        .setRequired(true)),

    new SlashCommandBuilder().setName('members').setDescription('Returns numbers of members in guild')
    
]
    .map(command => command.toJSON());

// async function that is triggered when an interaction is created (ie: /slashcommand)
export const CreateInteraction = async (interaction)=>{
    if(!interaction.isCommand()){
        return; // nothing is returned when a command that is not a slash command is typed
    }

    //triggered if slash command is typed
    else if(interaction.commandName === 'ping'){
       await interaction.reply({content:"Pongo!",ephemeral:true})
       .then(res=>console.log(`Succesful with the following message: ${res}`))
       .catch(err=>console.log(`Error with the following message: ${err}`))
    }

    else if(interaction.commandName === "server"){
        await interaction.reply({content:`Server information is:\nname: ${interaction.guild.name.toUpperCase()}\nmembers: ${interaction.guild.memberCount}\ncreated on: ${interaction.guild.createdAt}`,
        ephemeral:true
    })
    }

    else if (interaction.commandName === 'user'){
        await interaction.reply({content:`Your username is: ${interaction.user.username}\n Your user id: ${interaction.user.id}`,ephemeral:true})
    }

    else if(interaction.commandName === 'add'){
        const total = interaction.options.getNumber('num1') + interaction.options.getNumber('num2')
        console.log(`Total is ${total}`)
        await interaction.reply({content:total.toString(),ephemeral:true})
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
    }

    else if(interaction.commandName === 'echo'){
        await interaction.reply({content:interaction.options.getString('string1'),ephemeral:true})
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
    }

    else if(interaction.commandName === 'members'){
        await interaction.reply({content:interaction.client.toString(),ephemeral:true})
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
    }
}





