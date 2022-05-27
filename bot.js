import { Client, Intents, Collection } from 'discord.js'
import {REST} from '@discordjs/rest'
import {Routes} from 'discord-api-types/v9'
import 'dotenv/config'
import { getBreakingNews,readBannedWordFile} from './utils.js' 
import { commands,CreateInteraction } from './commands/commands.js'
import { fs, rmdirSync } from 'file-system'
import { channelMention, SlashCommandBuilder } from '@discordjs/builders'
import { VoiceConnection,AudioPlayerStatus, VoiceConnectionStatus } from '@discordjs/voice'
import fetch from 'node-fetch'
import { ConnectionVisibility } from 'discord-api-types/v10'

const newsApiKey = process.env.NEWS_API_KEY // constant authorisation API key that is used to make requests to news api
const URL = `https://newsdata.io/api/1/news?apikey=${newsApiKey}&country=gb,us&category=world,entertainment,politics,technology,environment&language=en&page=1` // BASE URL TO REQUEST TO
const client = new Client({ intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.DIRECT_MESSAGES] }) //creates clients object with intents

// need to create function that reads the banned-word.txt file which can then be used to prevent messages containing banned words

client.login(process.env.APP_TOKEN) //bots logs in

// const parseNews = async()=>{
//     const res = await getBreakingNews(URL)

//     return res;
// }

// parseNews()
// .then(res=>console.log(res.results[0].category))
// .catch((err)=>console.log(`There was an error: ${err}`))

client.on('ready',()=>{
    console.log('ready')
})

client.on('messageCreate',async (msg)=>{
    const words = await readBannedWordFile()
    if(msg.content.toLowerCase()==="pinme"){
        msg.pin()
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
    }
    else if(words.includes(msg.content)){
        msg.delete()
        .then(res=>console.log(`Succesfully deleted: ${res}`))
        .catch(err=>console.log(err))

    }
})

// client.on("messageDelete",msg=>{

// })

client.once('ready',()=>{
    console.log("Bot has woken up to play")
    
    const rest = new REST({ version: '9' }).setToken(process.env.APP_TOKEN);
    
    rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, '972303938751721502'), { body: commands })
        .then(() => console.log('Successfully registered application commands.'))
        .catch(console.error);
})


client.on('interactionCreate',CreateInteraction)

client.on(VoiceConnectionStatus.Ready,(oldState,newState)=>{
    console.log("Connection is in the ready state!")
})