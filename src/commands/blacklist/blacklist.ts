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
          name: 'word',
          description: 'Blacklist A Word',
          type: 'STRING',
        },
      ],
    },
    {
      name: 'remove',
      description: 'Remove An Item From The Blacklist',
      type: 'SUB_COMMAND',
      options: [
        {
          name: 'word',
          description: 'Remove A Blacklist',
          type: 'STRING',
        },
      ],
    },
  ],
  run: async ({ interaction }) => {
    const subcmd = interaction.options.getSubcommand();
    if (subcmd === 'add') {
      interface sF {
        word: string;
      }
      const sF = ({ word }: sF) => {
        interaction.followUp({
          content: `**${word}** Have Been Added To The Blacklist `,
        });
      };
      const word = interaction.options.getString('word');
      const allWords = await BlackListWordsSchema.find({
        guild: interaction.guild.id,
        word: word,
      });
      if (!allWords.length) {
        new BlackListWordsSchema({
          guild: interaction.guild.id,
          word: word,
        })
          .save()
          .then(() => sF({ word }));
      } else {
        interaction.followUp(`**${word}** Is Already In The Blacklist`);
      }
    } else if (subcmd === 'remove') {
      interface sF {
        word: string;
      }
      const sF = ({ word }: sF) => {
        interaction.followUp({
          content: `**${word}** Have Been Removed From The Blacklist `,
        });
      };
      const word = interaction.options.getString('word');
      const allWords = await BlackListWordsSchema.find({
        guild: interaction.guild.id,
        word: word,
      });
      if (!allWords.length)
        return interaction.followUp({
          content: 'There Are No Items In The Blacklist',
        });
      else {
        BlackListWordsSchema.deleteOne({
          guild: interaction.guild.id,
          word: word,
        }).then(()=> sF({word}));
      }
    }
  },
});
