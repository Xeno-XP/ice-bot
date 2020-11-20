const {
    MessageEmbed
} = require("discord.js");
const db = require(`${process.cwd()}/modules/db.js`);
const {
    default_prefix,
    ownerid
} = require("../../config.json");
const {
    angry,
    yes,
    money,
    stupid,
    loading,
    no
} = require("../../emojis.json");

module.exports = {
    name: "auto-mod",
    aliases: ['automod'],
    usage: "auto-mod (auto toggles)",
    description: "Auto Moderation",
    category: "modules & plugins",
    run: async(client, message, args, lang) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${lang.en.general.errors.user_no_permission}${angry}`);

        let settings = db.get(`settings${message.guild.id}`);

        if (enable) {
            settings.autoMod = false;
            return message.channel.send(`${yes}${lang.en.general.success.disabled_plugin}`);
        };

        if (!enable) {
            settings.autoMod = true;
            return message.channel.send(`${yes}${lang.en.general.success.enabled_plugin}`);
        };

        db.set(`settings${message.guild.id}`, settings);
    }
};