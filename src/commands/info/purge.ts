import { MessageEmbed } from 'discord.js';
import { Command } from "../../structures/Command";
import ms from 'ms'
export default new Command({
    name: "purge",
    description: "Delete messages with just a command",
    userPermissions: ['MANAGE_MESSAGES'],
    options: [{
        name: 'amount',
        description: 'The amount of messages needs to be deleted',
        type: 'INTEGER',
        required: true
    }],
    run: async ({ interaction }) => {
        // Define Variables
        const amount  = interaction.options.getInteger('amount')
        const messages = await interaction.channel.messages.fetch({limit: amount + 1})
        const filtered = messages.filter(message => Date.now() - message.createdTimestamp < ms('30 days'))
        // Functions
        const errFunct = (title: string, description:string, ephemeral: boolean ) => {
            const embed = new MessageEmbed().setTitle(`Error - ${title}`).setDescription(`${description}`).setAuthor({name: 'Woodo', iconURL: 'https://res.cloudinary.com/woodhouse-vercel-app/image/upload/v1642965474/wood-house/profile_wbrv4u.png'})
            interaction.followUp({embeds: [embed], ephemeral: ephemeral})
        }
        // If Commands
        if (amount > 100) return errFunct('Maximum Amount Reached', 'You have reached the maximum amount of deleting messages, please lower your amount', true)
        if (interaction.channel?.type === undefined || interaction.channel?.type === 'DM') return errFunct('Unknown Method', 'Command Cannot be used in direct messages', false)
        // Executing Commands
        await interaction.channel.bulkDelete(filtered).then(()=> {
            interaction.channel.send({content: `*Deleted **${filtered.size - 1}** Messages*`}).then(msg => {
                setTimeout(()=> msg.delete(), ms('3 seconds'))
            })
        })
}
});
