import BlackListWordsSchema from '../Schemas/BlackListWordsSchema';
import { Event } from '../structures/Event';
export default new Event ('messageCreate', async (message) => {
    const words = await BlackListWordsSchema.find({guild: message.guild.id});
    words.map(word => {
        if (message.content.toLowerCase().includes(word.words)) return message.delete()
    })
});
