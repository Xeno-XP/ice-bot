const { MessageEmbed } = require("discord.js");
const db = require(`${process.cwd()}/modules/db.js`);
const { default_prefix, ownerid } = require("../../config.json");
const { angry, yes, money, stupid, loading, no } = require("../../emojis.json");

module.exports = {
        name: "deleteChannel",
        aliases: ['deletechannel'],
        usage: `deleteChannel <channel name>`,
        category: "admin",
        description: "Deletes a channel, you tag.",
    run: async (client, message, args, lang) => {
    if(!message.guild.me.hasPermission("MANAGE_CHANNELS") && !message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send(`${lang.en.general.errors.bot_no_permission}${angry}`)
    if(!message.member.hasPermission("MANAGE_CHANNELS") && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${lang.en.general.errors.user_no_permission}${angry}`)
 
    let channel = message.mentions.channels.first();
    if (!channel) return message.channel.send(`${lang.en.channels.errors.select_a_valid_channel}${angry}`);
    message.channel.send(`${yes}${lang.en.channels.success.deleted_channel}\`${channel.name}\``);
    channel.delete();
  }
}