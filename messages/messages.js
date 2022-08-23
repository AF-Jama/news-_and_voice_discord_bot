const {readBannedWordFile} = require('../utils.js')
const {deleteMessagesInNewsChannel} = require('../news/news.js')

const prefix = '!'

const scan = async (msg)=>{
    const words = await readBannedWordFile()

    if(words.includes(msg.content)){
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

    if(msg.channel.name.includes('news') && !msg.author.bot){
        await deleteMessagesInNewsChannel(msg)
    }

}


module.exports = {
    scan
};



