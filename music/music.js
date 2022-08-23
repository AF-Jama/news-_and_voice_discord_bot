const ytsearch = require('yt-search')


const search = async (query)=>{
    const result = await ytsearch(query)
    return result
}

const checkResultsForSearch = (result)=>{
    return (result.length>0 ? result = result[0] : null)
}


module.exports = {
    search,
    checkResultsForSearch
}