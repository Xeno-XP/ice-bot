const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require(`${process.cwd()}/modules/db.js`);
const { default_prefix } = require("../../config.json");
const { defCol } = require("../../colors.json");
const { loading, no, stupid } = require("../../emojis.json");

module.exports = {
        name: "slots",
        aliases: [],
        usage: `slots`,
        category: "fun",
        description: "Play a game of slots!",
    run: async (client, message, args, lang) => {
        const fruits = ["🍎", "🍊", "🍐", "🍋", "🍉", "🍇", "🍓", "🍒"];

        let slotMsg = "No matches, better luck next time! 😢";

        const slot1 = fruits[Math.floor(Math.random() * fruits.length)],
              slot2 = fruits[Math.floor(Math.random() * fruits.length)],
              slot3 = fruits[Math.floor(Math.random() * fruits.length)];

        if ((slot1 == slot2) && (slot1 == slot3) && (slot2 == slot3)) {
            slotMsg = "Congratulations, all 3 matched, you won! 🎉";
        } else if ((slot1 == slot2) || (slot1 == slot3) || (slot2 == slot3)) {
            slotMsg = "Congratulations, 2 matched, but you still won! 🎉";
        };

        const embed = new MessageEmbed();
            embed.setColor(0x00FF99);
            embed.setDescription(`**[ ${slot1} | ${slot2} | ${slot3} ]**\n\n **${slotMsg}**`);

        message.channel.send(embed);
    }
};