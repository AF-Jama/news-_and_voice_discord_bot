const { Client, Intents, Collection, Guild } =  require('discord.js') 
const  {REST} = require('@discordjs/rest')
const {Routes} = require('discord-api-types/v9')
require('dotenv').config()
const {readBannedWordFile} = require('./utils.js') 
const {getLastMessageInNewsChannel,deleteMessagesInNewsChannel,postNewsArticle,getBreakingNews} =  require('./news/news.js')
// const { fs, rmdirSync,readdirSync } = require('file-system')
const {readdirSync} = require('fs')
const { VoiceConnection,AudioPlayerStatus, VoiceConnectionStatus } = require('@discordjs/voice')
const cron = require('node-schedule')
const { ConnectionVisibility } = require('discord-api-types/v10')
const { readdir } = require('fs.promises')
const { isInteractionButton } = require('discord-api-types/utils/v10')

const prefix = '!'


const newsApiKey = process.env.NEWS_API_KEY // constant authorisation API key that is used to make requests to news api
const URL = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${newsApiKey}`
const client = new Client({ intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.DIRECT_MESSAGES] }) //creates clients object with intents

client.commands = new Collection() // store 

const commandsList = [] // storage of commands
const commandFiles = readdirSync("./commands").filter(file=>file.endsWith('.js')) // returns all files in command directory that end with js

for(const file of commandFiles){
    const command = require(`./commands/${file}`) // returns module.exports object for particular file

    client.commands.set(command.name,command) // sets each file into a set with a key with its name and the exported module
    commandsList.push(command.data.toJSON())
}

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

// client.on('messageCreate',async (msg)=>{
//     const words = await readBannedWordFile()
//     if(msg.content.toLowerCase()==="pinme"){
//         msg.pin()
//         .then(res=>console.log(res))
//         .catch(err=>console.log(err))
//     }
//     else if(words.includes(msg.content)){
//         msg.delete()
//         .then(res=>console.log(`Succesfully deleted: ${res}`))
//         .catch(err=>console.log(err))

//     }

//     if(msg.content.startsWith(`${prefix}createtextchannel`) && msg.member.roles.cache.some(role=>role.name === 'workers')){
//         const name = msg.content.replace('!createtextchannel ','')
//         msg.guild.channels.create(name, {
//             type: 'GUILD_TEXT',
//     })


//     }

    // if(msg.channel.name === 'news-channel' && msg.author.bot !=true){
    //     msg.delete()
    //     .then(res=>console.log(`Succesfully deleted: ${res}`))
    //     .catch(err=>console.log(err))
    // }

// })



client.once('ready',()=>{
    console.log("Bot has woken up to play")

    const rest = new REST({ version: '9' }).setToken(process.env.APP_TOKEN);
    
    rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),{ body: commandsList })
        .then(() => console.log('Successfully registered application commands.'))
        .catch(`ERROR HERE`,console.error);
})


client.on('interactionCreate', async(interaction)=>{
    if(!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName) // returns command from set collection

    if(!command) return ; // if not in set then command does not exist
    try {
        await command.execute(interaction)
    } catch (error) {
        console.log(`Error has been triggered when excuting slash command`)
        await interaction.reply({content:'Unable to execute slash command'})
    }
})

// client.on(VoiceConnectionStatus.Ready,(oldState,newState)=>{
//     console.log("Connection is in the ready state!")
// })

// cron.scheduleJob('*/1 * * * *',async ()=>{
//     try {
//         let res = await getBreakingNews(URL) // return response
//         res = res.articles // returns array of news objects
//         res = res[0] // returns news object as index 0 -> ie: most recent news article
//         let lastMessage = await getLastMessageInNewsChannel(client,process.env.NEWS_CHANNEL_ID)
//         lastMessage = lastMessage.split('\n')[0]
//         // compare 
//         if(!(lastMessage === res.title)) await postNewsArticle(client,process.env.NEWS_CHANNEL_ID,res)
//         console.log("Nope")
//     } catch (error) {
//         console.log(`There was an error during the execution of the job: ${error}`)
//     }
// })

// setTimeout(()=>getLastMessageInNewsChannel(client,'979797391353991188'),3000)
