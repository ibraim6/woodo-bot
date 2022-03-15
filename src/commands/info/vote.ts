import { MessageEmbed } from 'discord.js';
import { Command } from './../../structures/Command';
export default new Command({
  name: 'vote',
  description: 'Vote For Woodo',
  run: async ({ interaction }) => {
    const embed = new MessageEmbed().setTitle('links').setDescription('[top.gg](https://top.gg/bot/947440107537969162/vote)')
    interaction.followUp({embeds: [embed]})
  },
});
