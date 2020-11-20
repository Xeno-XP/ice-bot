const discord = require("discord.js");
const {
    MessageEmbed
} = require("discord.js");
const db = require(`${process.cwd()}/modules/db.js`);
const {
    stripIndents
} = require("common-tags");
const fs = require("fs");
const {
    default_prefix,
    ownerid
} = require("../../config.json");
const {
    defCol
} = require("../../colors.json");
const emoji = require("../../emojis.json")
const ms = require("ms");
const randomColor = require("randomcolor");

module.exports = {
    name: "reroll",
    category: "giveaway",
    aliases: [],
    description: "Re-rolls a giveaway.",
    run: async(client, message, args, lang) => {
        if(!message.member.hasPermission("MANAGE_MESSAGES") &&
            !message.member.hasPermission("ADMINISTRATOR") &&
            !message.member.roles.cache.has(message.guild.roles.cache.find(r => r.name.toLowerCase().includes("giveaways")).id)) return message.channel.send(`${lang.en.general.errors.user_no_permission} Nor the \`Giveaways\` role.${emoji.angry}`);
            
        let stor = require("../../storage/giveaways.json");

        if (!args[0]) {
            return message.reply("please specify a giveaway id (message id).");
        };

        let giveaway = null;
        let giveawayIndex = null;

        for (let i = 0 ; i < stor.length ; i++) {
            if (stor[i].id == args[0]) {
                giveaway = stor[0];
                giveawayIndex = i;
            };
        };

        if (!giveaway) {
            return message.reply("this giveaway was not found.");
        };

        if (!giveaway.isEnded) {
            return message.reply("this giveaway hasn't ended.");
        };

        giveaway.forReroll = true;

        stor[giveawayIndex] = giveaway;

        client.modules.writeData(JSON.stringify(stor, null, 4));
    }
};