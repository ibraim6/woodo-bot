import { TextChannel } from 'discord.js';
import { Command } from './../../structures/Command';
export default new Command({
  name: 'message',
  description: 'Message In Any Channel',
  userPermissions: ['MANAGE_MESSAGES'],
  options: [
    {
      name: 'channel',
      description: 'The Channel Which You Want to send a message',
      required: true,
      type: 'CHANNEL',
    },
    {
        name: 'message',
        description: 'Type Message To Send',
        required: true,
        type: 'STRING'
    }
  ],
  run: async ({ interaction }) => {
    const channel = interaction.options.getChannel('channel');
    const message = interaction.options.getString('message')
    const channelID = interaction.client.channels.cache.get(channel.id) as TextChannel
    if (!channelID.send) return interaction.followUp({content: 'Not A Valid **Channel**'})
    channelID.send({content: `${message}`}).then(()=> {
      interaction.followUp({content: "Message Send **Successfully**"})
    }).catch(()=> {
      interaction.followUp({content: 'Not Enough **Permissions**'})
    })
  },
});
