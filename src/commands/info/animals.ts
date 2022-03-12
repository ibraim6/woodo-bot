import { MessageEmbed } from 'discord.js';
import axios from 'axios'
import { Command } from './../../structures/Command';
export default new Command({
    name: 'animals',
    description: 'For Animal Lovers',
    options: [{
        name: 'cat',
        description: 'i love panda uwu',
        type: 'SUB_COMMAND_GROUP',
        options: [{
            name: 'random',
            description: 'random pic',
            type: 'SUB_COMMAND'
        },{
            name: 'fact',
            description: 'random pic',
            type: 'SUB_COMMAND'
        }]
    },{
        name: 'panda',
        description: 'i love panda uwu',
        type: 'SUB_COMMAND_GROUP',
        options: [{
            name: 'random',
            description: 'random pic',
            type: 'SUB_COMMAND'
        },{
            name: 'fact',
            description: 'random pic',
            type: 'SUB_COMMAND'
        }]
    },{
        name: 'fox',
        description: 'i love panda uwu',
        type: 'SUB_COMMAND_GROUP',
        options: [{
            name: 'random',
            description: 'random pic',
            type: 'SUB_COMMAND'
        },{
            name: 'fact',
            description: 'random pic',
            type: 'SUB_COMMAND'
        }]
    },{
        name: 'dog',
        description: 'i love panda uwu',
        type: 'SUB_COMMAND_GROUP',
        options: [{
            name: 'random',
            description: 'random pic',
            type: 'SUB_COMMAND'
        },{
            name: 'fact',
            description: 'random pic',
            type: 'SUB_COMMAND'
        }]
    },],
    run: async ({interaction}) => {
        const subcmd = interaction.options.getSubcommand()
        const subcmdg = interaction.options.getSubcommandGroup()
        if (subcmdg === 'panda') {
        if (subcmd === 'random') {
            const pic = await axios.get('https://some-random-api.ml/img/panda');
            const data = pic.data
            const embed = new MessageEmbed().setImage(`${data.link}`);
            interaction.followUp({embeds: [embed]})
        } }
        else if (subcmdg === 'cat') {
        if (subcmd === 'random') {
            const pic = await axios.get('https://some-random-api.ml/img/cat');
            const data = pic.data
            const embed = new MessageEmbed().setImage(`${data.link}`);
            interaction.followUp({embeds: [embed]})
        } }
        else if (subcmdg === 'cat') {
        if (subcmd === 'random') {
            const pic = await axios.get('https://some-random-api.ml/img/cat');
            const data = pic.data
            const embed = new MessageEmbed().setImage(`${data.link}`);
            interaction.followUp({embeds: [embed]})
        } }
        else if (subcmdg === 'fox') {
        if (subcmd === 'random') {
            const pic = await axios.get('https://some-random-api.ml/img/fox');
            const data = pic.data
            const embed = new MessageEmbed().setImage(`${data.link}`);
            interaction.followUp({embeds: [embed]})
        } }
        else if (subcmdg === 'dog') {
        if (subcmd === 'random') {
            const pic = await axios.get('https://some-random-api.ml/img/dog');
            const data = pic.data
            const embed = new MessageEmbed().setImage(`${data.link}`);
            interaction.followUp({embeds: [embed]})
        } }
    }
})