const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require(`${process.cwd()}/modules/db.js`);
const { default_prefix } = require("../../config.json");
const { defCol } = require("../../colors.json");
const { loading, no, stupid } = require("../../emojis.json");

module.exports = {
        name: "snipe",
        aliases: ["sniep"],
        usage: `snipe`,
        category: "fun",
        description: "Snipes the last deleted message.",
    run: async (client, message, args, lang) => {
        const msg = client.snipes.get(message.channel.id)
        if(!msg)return message.channel.send(`${lang.en.general.errors.no_recently_deleted_messages}${stupid}`)
        const embed = new MessageEmbed()
        .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
        .setDescription(msg.content)
        .setColor("RANDOM")
        .setTimestamp();
        if (msg.image) { embed.setImage(msg.image) };
        message.channel.send(embed);
    }
}