import BlackListWordsSchema from '../../Schemas/BlackListWordsSchema';
import { Command } from '../../structures/Command';
export default new Command({
  name: 'blacklist',
  description: 'Add Blacklist ',
  userPermissions: ['MANAGE_MESSAGES'],
  options: [
    {
      name: 'add',
      description: 'Add Item To Blacklist',
      type: 'SUB_COMMAND',
      options: [
        {
          name: 'words',
          description: 'Blacklist words',
          type: 'STRING',
        },
      ],
    },
  ],
  run: async ({ interaction }) => {
    const subcmd = interaction.options.getSubcommand();
    if (subcmd === 'add') {
      interface sF {
        word: string
      }
      const sF = ({word}:sF) => {
        interaction.followUp({content: `**${word}** Have Been Added To The Blacklist `})
      };
      const word = interaction.options.getString('words');
      const allWords = await BlackListWordsSchema.find({
        guild: interaction.guild.id,
        words: word,
      });
      if (!allWords.length) {
        new BlackListWordsSchema({
          guild: interaction.guild.id,
          words: word,
        })
          .save()
          .then(()=> sF({word}));
      }
      else {
        interaction.followUp(`**${word}** Is Already In The Blacklist`)
      }
    }
  },
});
