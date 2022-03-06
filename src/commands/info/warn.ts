import { MessageEmbed } from 'discord.js';
import { Command } from '../../structures/Command';
import WarnSchema from '../../Schemas/Warn';
export default new Command({
  // Name
  name: 'warn',
  // Description
  description: 'Warn a user',
  //  * Permissions Needed
  userPermissions: ['MANAGE_MESSAGES'],
  options: [
    {
      name: 'user',
      description: 'The user you want to warn',
      type: 'USER',
      required: true,
    },
    {
      name: 'reason',
      description: 'reason for the warn',
      type: 'STRING',
      required: true,
    },
  ],
  run: async ({ interaction }) => {
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason');
    interface sergs {
      user: string;
      reason: string;
      moderator: string;
      warnings: number;
    }
    const warnings = await WarnSchema.find({
        guild: interaction.guild.id,
        user: user.id,
      });
    const wFunct = async ({ user, reason, moderator, warnings }: sergs) => {      
      const embed = new MessageEmbed()
        .setTitle(`Warned ${user}`)
        .addField('Moderator', `<@${moderator}>`)
        .addField('Reason', reason)
        .addField('Warnings', `${warnings + 1}`)
        .setAuthor({
          name: 'Woodo',
          iconURL:
            'https://res.cloudinary.com/woodhouse-vercel-app/image/upload/v1642965474/wood-house/profile_wbrv4u.png',
        });
      interaction.followUp({ embeds: [embed] });
    };

    new WarnSchema({
      user: user.id,
      guild: interaction.guild.id,
      reason,
      moderator: interaction.user.id,
    })
      .save()
      .then(() => wFunct({ user: user.tag, reason: reason, moderator: interaction.user.id, warnings: warnings.length}));
  },
});
