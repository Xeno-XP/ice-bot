const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require(`${process.cwd()}/modules/db.js`);
const { default_prefix } = require("../../config.json");
const { defCol } = require("../../colors.json");
const { loading, no } = require("../../emojis.json");

module.exports = {
    name: "love",
    aliases: ["affinity", "ship"],
    category: "fun",
    description: "Calculates the love affinity you have for another person.",
    run: async (client, message, args, lang) => {
 
        let person = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.get(args[0]);

        if (!person || message.author.id === person.id) {
            person = message.guild.members.cache
                .filter(m => !m.user.bot)
                .random();
        };

        const love = Math.random() * 100;
        const loveIndex = Math.round(love / 10);
        const loveLevel = "<a:bar_full:742028001486700617>".repeat(loveIndex*2) + "<a:bar_empty:743140223768068297>".repeat(20 - loveIndex*2);

        const embed = new MessageEmbed()
            .setColor(defCol)
            .addField(`**${message.author.tag}** loves **${person.user.tag}** this much:`,
            `\n💟 ${Math.floor(love)}%\n\n${loveLevel}`);

        message.channel.send(embed);
    }
};