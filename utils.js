import fetch from 'node-fetch'
import { SlashCommandBuilder } from '@discordjs/builders'
import {readFile} from 'fs/promises'
import {REST} from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import 'dotenv/config'
import { fs } from 'file-system'

export const getBreakingNews = async(baseURL)=>{
    let res = await fetch(baseURL) // returns response value in returned promise
    res = await res.json() //returns values from returned json promise
    
    return res; // returns value as a promise
}


export const readBannedWordFile = async ()=>{
    try {
    let data = await readFile('./banned_words.txt',{encoding:'utf-8'})
    data = data.split('\n')
    return data   
    } catch (error) {
        
    }
}
