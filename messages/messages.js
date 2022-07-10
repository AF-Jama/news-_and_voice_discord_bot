const {readBannedWordFile} = require('../utils.js')

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

    if(msg.channel.name === 'news-channel' && msg.author.bot !=true){
        msg.delete()
        .then(res=>console.log(`Succesfully deleted: ${res}`))
        .catch(err=>console.log(err))
    }

}


module.exports = {
    scan
};



