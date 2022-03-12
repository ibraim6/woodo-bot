import BlackListWordsSchema from '../Schemas/BlackListWordsSchema';
import Levels from 'discord-xp'
import { Event } from '../structures/Event';
Levels.setURL(process.env.mongoUri);
export default new Event ('messageCreate', async (message) => {
    const words = await BlackListWordsSchema.find({guild: message.guild.id});
    if (message.author.bot) return;
    if (!message.guild) return;
    const xp = Math.floor(Math.random() * 9) + 1;
    const newLevel = await Levels.appendXp(message.author.id, message.guild.id, xp)
    words.map(word => {
        if (message.content.toLowerCase().includes(word.word)) return message.delete()
    })
});
