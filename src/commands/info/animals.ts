import { MessageEmbed } from 'discord.js';
import axios from 'axios';
import { Command } from './../../structures/Command';
export default new Command({
  name: 'animals',
  description: 'For Animal Lovers',
  options: [
    {
      name: 'cat',
      description: 'cats are adorable',
      type: 'SUB_COMMAND_GROUP',
      options: [
        {
          name: 'random',
          description: 'random pic',
          type: 'SUB_COMMAND',
        },
        {
          name: 'facts',
          description: 'random pic',
          type: 'SUB_COMMAND',
        },
      ],
    },
    {
      name: 'panda',
      description: 'i love panda uwu',
      type: 'SUB_COMMAND_GROUP',
      options: [
        {
          name: 'random',
          description: 'random pic',
          type: 'SUB_COMMAND',
        },
        {
          name: 'facts',
          description: 'random pic',
          type: 'SUB_COMMAND',
        },
      ],
    },
    {
      name: 'fox',
      description: 'fox are so cute',
      type: 'SUB_COMMAND_GROUP',
      options: [
        {
          name: 'random',
          description: 'random pic',
          type: 'SUB_COMMAND',
        },
        {
          name: 'facts',
          description: 'random pic',
          type: 'SUB_COMMAND',
        },
      ],
    },
    {
      name: 'dog',
      description: 'level of loyalty',
      type: 'SUB_COMMAND_GROUP',
      options: [
        {
          name: 'random',
          description: 'random pic',
          type: 'SUB_COMMAND',
          options: [
            {
              name: 'breed',
              description: 'Breed Name',
              type: 'STRING',
            },
          ],
        },
        {
          name: 'facts',
          description: 'random pic',
          type: 'SUB_COMMAND',
        },
      ],
    },
  ],
  run: async ({ interaction }) => {
    const subcmd = interaction.options.getSubcommand();
    const subcmdg = interaction.options.getSubcommandGroup();
    if (subcmdg === 'panda') {
      if (subcmd === 'random') {
        const pic = await axios.get('https://some-random-api.ml/img/panda');
        const data = pic.data;
        const embed = new MessageEmbed().setImage(`${data.link}`);
        interaction.followUp({ embeds: [embed] });
      }
      else if (subcmd === 'facts') {
          const fact = await axios.get("https://some-random-api.ml/facts/panda")
          const data = fact.data
          interaction.followUp({content: `*Did You Know That*: **${data.fact}**`})
      }
    } else if (subcmdg === 'cat') {
      if (subcmd === 'random') {
        const pic = await axios.get('https://some-random-api.ml/img/cat');
        const data = pic.data;
        const embed = new MessageEmbed().setImage(`${data.link}`);
        interaction.followUp({ embeds: [embed] });
      } else if (subcmd === 'facts') {
        const fact = await axios.get('https://catfact.ninja/fact');
        const data = fact.data;
        interaction.followUp({content: `*Did You Know That*: **${data.fact}**`})
      }
    } else if (subcmdg === 'cat') {
      if (subcmd === 'random') {
        const pic = await axios.get('https://some-random-api.ml/img/cat');
        const data = pic.data;
        const embed = new MessageEmbed().setImage(`${data.link}`);
        interaction.followUp({ embeds: [embed] });
      }
    } else if (subcmdg === 'fox') {
      if (subcmd === 'random') {
        const pic = await axios.get('https://some-random-api.ml/img/fox');
        const data = pic.data;
        const embed = new MessageEmbed().setImage(`${data.link}`);
        interaction.followUp({ embeds: [embed] });
      }
      else if (subcmd === 'facts') {
        const fact = await axios.get("https://some-random-api.ml/facts/fox")
        const data = fact.data
        interaction.followUp({content: `*Did You Know That*: **${data.fact}**`})
    }
    } else if (subcmdg === 'dog') {
      if (subcmd === 'random') {
        const breed = interaction.options.getString('breed');
        const pic = await axios
          .get(
            `${
              breed
                ? `https://dog.ceo/api/breed/${breed}/images/random`
                : 'https://dog.ceo/api/breeds/image/random'
            }`
          )
          .then((fetched) => {
            const data = fetched.data;
            const embed = new MessageEmbed().setImage(`${data.message}`);
            interaction.followUp({ embeds: [embed] });
          })
          .catch(() => interaction.followUp({ content: 'Unknown Breed' }));
      }
      else if (subcmd === 'facts') {
          const fact = await axios.get("https://dog-facts-api.herokuapp.com/api/v1/resources/dogs?number=1")
          const data = fact.data[0]
          interaction.followUp({content: `*Did You Know That*: **${data.fact}**`})
      }
    }
  },
});
