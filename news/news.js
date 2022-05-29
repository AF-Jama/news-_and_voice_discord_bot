import fetch from "node-fetch";
import * as c from 'node-schedule'


export const getBreakingNews = async(baseURL)=>{
    try{
        let res = await fetch(baseURL) // returns response value in returned promise
        res = await res.json() //returns values from returned json promise
        return res; // returns value as a promise
    }catch(e){
        console.log(`There was an error ${e}`)
    }
}

// const x = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=fc37270c8c2e4359aa876d56a659a346'

// getBreakingNews(`https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=fc37270c8c2e4359aa876d56a659a346`).then(res=>console.log(res))

// getBreakingNews('https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=fc37270c8c2e4359aa876d56a659a346')

export const getLastMessageInNewsChannel = async (client,channelId) =>{
    try {
        const channel = await client.channels.fetch(channelId) // returns promise value, in this case this returns the fetched channel
        let message = await channel.messages.fetch({ limit: 1 })
        return message.at(0).content        
    } catch (error) {
        console.error(error)
    }
}

export const deleteMessagesInNewsChannel = ()=>{
    //deletes message that is not sent by bot

}

export const postNewsArticle = async (client,channelId,res)=>{
    try{
        const channel = await client.channels.fetch(channelId)
        await channel.send({content: `${res.title}\n${res.url}` })
        return ;
    }catch(err){
        console.log(err)
    }
} 