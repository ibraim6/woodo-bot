import type { TextChannel, ColorResolvable } from 'discord.js';
import { MessageEmbed } from 'discord.js';
import { Command } from './../../structures/Command';
export default new Command({
  name: 'send',
  description: 'Send Messages',
  userPermissions: ['MANAGE_MESSAGES'],
  options: [
    {
      name: 'embed',
      description: 'send embed',
      type: 'SUB_COMMAND',
      options: [
        {
          name: 'in',
          description: 'enter a channel',
          type: 'CHANNEL',
          required: true,
        },
        {
          name: 'title',
          description: 'The title for the embed',
          type: 'STRING',
          required: true,
        },
        {
          name: 'description',
          description: 'Description for your embed',
          type: 'STRING',
          required: true,
        },
      ],
    },
    {
      name: 'message',
      description: 'Just a message',
      type: 'SUB_COMMAND',
      options: [
        {
          name: 'in',
          description: 'The Channel Which You Want to send a message',
          type: 'CHANNEL',
          required: true,
        },
        {
          name: 'message',
          description: 'Type Message To Send',
          type: 'STRING',
          required: true,
        },
      ],
    },
  ],
  run: async ({ interaction }) => {
    const channel = interaction.options.getChannel('in');
    const subcmd = interaction.options.getSubcommand();
    if (subcmd === 'message') {
      const message = interaction.options.getString('message');
      const channelID = interaction.client.channels.cache.get(
        channel.id
      ) as TextChannel;
      if (!channelID.send)
        return interaction.followUp({ content: 'Not A Valid **Channel**' });
      channelID
        .send({ content: `${message}` })
        .then(async () => {
          await interaction.followUp({
            content: 'Message Send **Successfully**',
          });
        })
        .catch(() => {
          interaction.followUp({ content: 'Not Enough **Permissions**' });
        });
    } else if (subcmd === 'embed') {
      const title = interaction.options.getString('title');
      const description = interaction.options.getString('description');
      const embed = new MessageEmbed()
        .setTitle(`${title}`).setFooter({text: `Requested by ${interaction.member.user.tag}`})
        .setColor('#00acff')
        .setDescription(`${description}`);
      const channelID = interaction.client.channels.cache.get(
        channel.id
      ) as TextChannel;
      if (!channelID.send)
        return interaction.followUp({ content: 'Not A Valid **Channel**' });
      channelID
        .send({ embeds: [embed] })
        .then(async () => {
          await interaction.followUp({
            content: 'Embed Send **Successfully**',
          });
        })
        .catch(() => {
          interaction.followUp({ content: 'Not Enough **Permissions**' });
        });
    }
  },
});
