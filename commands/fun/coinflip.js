const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require(`${process.cwd()}/modules/db.js`);
const { default_prefix } = require("../../config.json");
const { defCol } = require("../../colors.json");
const { loading, no, stupid } = require("../../emojis.json");

module.exports = {
        name: "coinflip",
        aliases: ["coin"],
        usage: `coinflip`,
        category: "fun",
        description: "Flip a coin!",
    run: async (client, message, args, lang) => {
        const embed = new MessageEmbed();
            embed.setColor(0x00FF99);
            embed.setDescription(`The coin landed on... **${["HEADS", "TAILS"][Math.floor(Math.random() * 2)]}**.`);

        message.channel.send(embed);
    }
};