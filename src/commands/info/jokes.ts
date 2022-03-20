import { Command } from './../../structures/Command';
import fetch from 'node-fetch';
export default new Command({
  name: 'joke',
  description: 'Get A Random Joke',
  options: [
    {
      name: 'search',
      description: 'Search For A Joke',
      type: 'STRING',
    },
  ],
  run: async ({ interaction }) => {
    const search = interaction.options.getString('search');
    if (search) {
      const res = await fetch(
        `https://icanhazdadjoke.com/search?term=${search}`,
        {
          headers: {
            Accept: 'application/json',
          },
        }
      ).then(async (res)=> {
        const data = await res.json();
        const randomInt = (int: number) => {
          return Math.floor(Math.random() * int)
        }
        const random = randomInt(data.results.length)
        const result = data.results[random]
        if (!data.results.length) return interaction.followUp({content: '**Joke Not Found**'})
        else return interaction.followUp({content: `**Joke**: ${result.joke}`})
      });
    } else {
      const res = await fetch('https://icanhazdadjoke.com', {
        headers: {
          Accept: 'application/json',
        },
      });
      const data = await res.json();
      interaction.followUp({ content: `**Joke**: *${data.joke}*` });
    }
  },
});
