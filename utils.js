const {readFile} = require('fs/promises')

const readBannedWordFile = async ()=>{
    try {
    let data = await readFile('./banned_words.txt',{encoding:'utf-8'})
    data = data.split('\n')
    return data   
    } catch (error) {
        
    }
}

// module.exports = {
//     name:"Read",
//     description:"Read banned words file",

//     async run(){
//         try {
//             let data = await readFile('./banned_words.txt',{encoding:'utf-8'})
//             data = data.split('\n')
//             return data   
//             } catch (error) {
                
//             }   
//     }
// }

module.exports = {
    readBannedWordFile
}