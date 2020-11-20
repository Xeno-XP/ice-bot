const { MessageEmbed } = require("discord.js");
const db = require(`${process.cwd()}/modules/db.js`);
const { default_prefix, ownerid } = require("../../config.json");
const { angry, yes, money, stupid, loading, no } = require("../../emojis.json");

module.exports = {
        name: "setLeave",
        aliases: ["setleave", "setLea"],
        usage: `setLeave <#Leave Channel>`,
        category: "modules & plugins",
        description: "Setup a Leave Channel",
    run: async (client, message, args, lang) => {
    if (!message.member.hasPermission("ADMINISTRATOR") && message.author.id != ownerid)
      return message.channel.send(`${lang.en.general.errors.user_no_permission}${angry}`);

    let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

    if (!channel) {
      return message.channel.send(
        `${lang.en.channels.errors.select_a_valid_channel}${angry}`
      );
    }
    
    db.set(`leachannel_${message.guild.id}`, channel.id);

    message.channel.send(`${yes}${lang.en.general.success.set_channel} \`${channel}\``);
    }
}