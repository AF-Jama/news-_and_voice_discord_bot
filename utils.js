const {readFile} = require('fs/promises')

const readBannedWordFile = async ()=>{
    try {
    let data = await readFile('./banned_words.txt',{encoding:'utf-8'})
    data = data.split('\n')
    return data   
    } catch (error) {
<<<<<<< HEAD
        
=======
        return ;
>>>>>>> 9aa20fe (Refactored code base to create more modularity)
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