import { MessageEmbed } from 'discord.js';
import { Command } from '../../structures/Command';
import ms from 'ms';

export default new Command({
  name: 'purge',
  description: 'Delete messages with just a command',
  userPermissions: ['MANAGE_MESSAGES'],
  options: [
    {
      name: 'amount',
      description: 'The amount of messages needs to be deleted',
      type: 'INTEGER',
      required: true,
    },
  ],
  run: async ({ interaction }) => {
    const amount = interaction.options.getInteger('amount');
    interface ergs {
      title: string;
      descr?: string;
      hide?: boolean;
    }
    const errFunct = ({ title, descr, hide }: ergs) => {
      const embed = new MessageEmbed()
        .setTitle(`Error - ${title}`)
        .setDescription(`${descr}`)
        .setAuthor({
          name: 'Woodo',
          iconURL:
            'https://res.cloudinary.com/woodhouse-vercel-app/image/upload/v1642965474/wood-house/profile_wbrv4u.png',
        });
      interaction.followUp({ embeds: [embed], ephemeral: hide ? hide : false });
    };
    if (amount >= 100) {
      errFunct({
        title: 'Maximum Amount Reached',
        descr: 'Maximum Amount Have Been Reached, Please Lower Your Counts',
        hide: false,
      });
    } else {
      const messages = await interaction.channel.messages.fetch({
        limit: amount + 1,
      });
      const filtered = messages.filter(
        (message) => Date.now() - message.createdTimestamp < ms('30 days')
      );

      if (
        interaction.channel?.type === undefined ||
        interaction.channel?.type === 'DM'
      )
        return errFunct({
          title: 'Unknown Method',
          descr: 'Command Cannot be used in direct messages',
          hide: false,
        });
      await interaction.channel.bulkDelete(filtered).then(() => {
        interaction.channel
          .send({ content: `*Deleted **${filtered.size - 1}** Messages*` })
          .then((msg) => {
            setTimeout(() => msg.delete(), ms('3 seconds'));
          });
      });
    }
  },
});
