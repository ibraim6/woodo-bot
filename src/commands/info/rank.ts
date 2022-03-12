import { Command } from '../../structures/Command';
import canvacord from 'canvacord';
import Levels from 'discord-xp';
import { MessageAttachment } from 'discord.js';
export default new Command({
  name: 'rank',
  description: 'Your Rank',
  options: [
    {
      name: 'user',
      description: 'Enter A User',
      type: 'USER',
    },
  ],
  run: async ({ interaction }) => {
    if (interaction.options.data.length) {
      const member = interaction.options.getUser('user');
      const user = await Levels.fetch(member.id, interaction.guild.id);
      if (user) {
        const requiredXp = Levels.xpFor(user.level + 1);
        const rank = new canvacord.Rank()
          .setAvatar(
            interaction.member.displayAvatarURL({
              dynamic: false,
              format: 'png',
            })
          )
          .setCurrentXP(user.xp)
          .setLevelColor('#00acff').setLevel(user.level)
          .setRequiredXP(requiredXp)
          .setProgressBar(`#00acff`, 'COLOR')
          .setUsername(member.username)
          .setDiscriminator(member.discriminator);
        rank.build({}).then((data) => {
          const attachment = new MessageAttachment(data, 'rank.png');
          interaction.followUp({ files: [attachment] });
        });
      } else {
        interaction.followUp({ content: 'User Have **No** Level' });
      }
    } else {
      const user = await Levels.fetch(
        interaction.member.user.id,
        interaction.guild.id
      );
      if (!user) return interaction.followUp({content: 'User Have **No** Level'})
      const requiredXp = Levels.xpFor(user.level + 1);
      const rank = new canvacord.Rank()
        .setAvatar(
          interaction.member.displayAvatarURL({ dynamic: false, format: 'png' })
        )
        .setCurrentXP(user.xp)
        .setLevel(user.level)
        .setRequiredXP(requiredXp)
        .setProgressBar("#00acff", 'COLOR')
        .setUsername(interaction.user.username).setLevelColor('#00acff')
        .setDiscriminator(interaction.user.discriminator);
      rank.build({}).then((data) => {
        const attachment = new MessageAttachment(data, 'rank.png');
        interaction.followUp({ files: [attachment] });
      });
    }
  },
});
