const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require(`${require(`${process.cwd()}/config.json`).custom_db ? `${process.cwd()}/modules/db.js` : `quick.db`}`);
const { default_prefix } = require("../../config.json");
const { defCol } = require("../../colors.json");
const { loading, no, stupid } = require("../../emojis.json");

module.exports = {
        name: "editsnipe",
        aliases: ["editsniep"],
        usage: `editsnipe`,
        category: "fun",
        description: "Snipes the last edited message.",
    run: async (client, message, args, lang) => {
        const msg = client.editSnipes.get(message.channel.id)
        if(!msg)return message.channel.send(`${lang.en.general.errors.no_recently_edited_messages}${stupid}`)
        const embed = new MessageEmbed()
        .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
        .setDescription(msg.content)
        .setColor("RANDOM")
        .setTimestamp();
        if (msg.image) { embed.setImage(msg.image) };
        message.channel.send(embed);
    }
}