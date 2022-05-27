import { getVoiceConnection,joinVoiceChannel } from '@discordjs/voice'

export const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
 });
