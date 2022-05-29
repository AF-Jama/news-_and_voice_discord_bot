import { Client, Intents, Collection, Guild } from 'discord.js'
import {REST} from '@discordjs/rest'
import {Routes} from 'discord-api-types/v9'
import 'dotenv/config'
import {readBannedWordFile} from './utils.js' 
import { commands,CreateInteraction } from './commands/commands.js'
import { getBreakingNews,getLastMessageInNewsChannel,postNewsArticle } from './news/news.js'
import { fs, rmdirSync } from 'file-system'
import { channelMention, createComponentBuilder, SlashCommandBuilder } from '@discordjs/builders'
import { VoiceConnection,AudioPlayerStatus, VoiceConnectionStatus } from '@discordjs/voice'
import fetch from 'node-fetch'
import * as cron from 'node-schedule'
import { ConnectionVisibility } from 'discord-api-types/v10'

const prefix = '!'



const newsApiKey = process.env.NEWS_API_KEY // constant authorisation API key that is used to make requests to news api
const URL = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${newsApiKey}`
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

    if(msg.content.startsWith(`${prefix}createtextchannel`) && msg.member.roles.cache.some(role=>role.name === 'workers')){
        const name = msg.content.replace('!createtextchannel ','')
        msg.guild.channels.create(name, {
            type: 'GUILD_TEXT',
    })


    }

    if(msg.channel.name === 'news-channel' && msg.author.bot !=true){
        msg.delete()
        .then(res=>console.log(`Succesfully deleted: ${res}`))
        .catch(err=>console.log(err))
    }

})

// client.on('ready',async ()=>{
//     const news_channel_id = process.env.NEWS_CHANNEL_ID
//     client.channels.fetch(news_channel_id)
//     const res = await getBreakingNews(URL)
//     const text = res.status
//     client.channels.fetch(news_channel_id).then(channel=>channel.send("SENT TO NEWS CHANNEL"))
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

cron.scheduleJob('*/20 * * * *',async ()=>{
    try {
        let res = await getBreakingNews(URL) // return response
        res = res.articles // returns array of news objects
        res = res[0] // returns news object as index 0 -> ie: most recent news article
        let lastMessage = await getLastMessageInNewsChannel(client,process.env.NEWS_CHANNEL_ID)
        lastMessage = lastMessage.split('\n')[0]
        // compare 
        if(!(lastMessage === res.title)) await postNewsArticle(client,process.env.NEWS_CHANNEL_ID,res)
        console.log("Nope")
    } catch (error) {
        console.log(`There was an error during the execution of the job: ${error}`)
    }
})

// setTimeout(()=>getLastMessageInNewsChannel(client,'979797391353991188'),3000)
