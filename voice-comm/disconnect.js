import { VoiceConnectionDisconnectReason,getVoiceConnection } from "@discordjs/voice"
//disconnects voice channel

export const disconnect = async (interaction) =>{
    const voiceChannel = interaction.member.voice.channel;
    if(!voiceChannel) await interaction.channel.send("You are not in the voice channel and hence cannot use the disconnect command")

   await interaction.member.voice.disconnect()

}