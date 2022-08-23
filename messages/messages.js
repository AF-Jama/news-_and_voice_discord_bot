<<<<<<< HEAD
const {readBannedWordFile} = require('../utils.js')
=======
const { MessageFlags } = require('discord.js')
const {readBannedWordFile} = require('../utils.js')
const {deleteMessagesInNewsChannel} = require('../news/news.js') 
>>>>>>> 9aa20fe (Refactored code base to create more modularity)

const prefix = '!'

const scan = async (msg)=>{
    const words = await readBannedWordFile()

<<<<<<< HEAD
    // if(words.includes(msg.content)){
    //     msg.delete()
    //     .then(res=>console.log(`Succesfully deleted: ${res}`))
    //     .catch(err=>console.log(err))

    // }
=======
    if(words.includes(msg.content)){
        msg.delete()
        .then(res=>console.log(`Succesfully deleted: ${res}`))
        .catch(err=>console.log(err))

    }

    if(msg.channel.name.includes('news') && !msg.author.bot){
        // block trigggered if message is sent by a non bot and in channel that includes news or music in name
        await deleteMessagesInNewsChannel(msg)
    }
>>>>>>> 9aa20fe (Refactored code base to create more modularity)

    if(msg.content.startsWith(`${prefix}createtextchannel`) && msg.member.roles.cache.some(role=>role.name === 'workers')){
        const name = msg.content.replace('!createtextchannel ','')
        msg.guild.channels.create(name, {
            type: 'GUILD_TEXT',
    })


    }

    // if(msg.channel.name === 'news-channel' && !msg.author.bot){
    //     msg.delete()
    //     .then(res=>console.log(`Succesfully deleted: ${res}`))
    //     .catch(err=>console.log(err))
    // }

}


module.exports = {
    scan
};



