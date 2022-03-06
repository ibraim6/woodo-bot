import { Client, CommandInteraction, MessageEmbed } from 'discord.js';
import WarnSchema from '../../Schemas/WarnSchema';
import { Command } from '../../structures/Command';
export default new Command({
  name: 'warnings',
  description: 'Display Warnings',
  options: [
    {
      name: 'user',
      description: 'The User Which You Want To See Warnings Of',
      type: 'USER',
      required: true
    },
  ],
  run: async ({ interaction }) => {
    const user = interaction.options.getUser('user');
    const warnings = await WarnSchema.find({
      guild: interaction.guild.id,
      user: user.id,
    });
    interface warning {
      user: string;
      warnings: number;
    }
    const warnF = ({ user, warnings }: warning) => {
      interaction.followUp({ content: `<@${user}> Have **${warnings}** Warnings` });
    };
    if (!warnings?.length) return warnF({ user: user.id, warnings: 0 });
    else return warnF({user: user.id, warnings: warnings.length})
  },
});
