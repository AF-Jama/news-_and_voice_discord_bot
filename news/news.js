export const getBreakingNews = async(baseURL)=>{
    let res = await fetch(baseURL) // returns response value in returned promise
    res = await res.json() //returns values from returned json promise
    
    return res; // returns value as a promise
}