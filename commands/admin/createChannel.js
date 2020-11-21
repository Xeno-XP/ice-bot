const { MessageEmbed } = require("discord.js");
const db = require(`${require(`${process.cwd()}/config.json`).custom_db ? `${process.cwd()}/modules/db.js` : `quick.db`}`);
const { default_prefix, ownerid } = require("../../config.json");
const { angry, yes, money, stupid, loading, no } = require("../../emojis.json");

module.exports = {
        name: "createChannel",
        aliases: ['createchannel'],
        usage: `createChannel <channel name>`,
        category: "admin",
        description: "Create channel in the server",
    run: async (client, message, args, lang) => {
    if(!message.guild.me.hasPermission("MANAGE_CHANNELS") && !message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send(`${lang.en.general.errors.bot_no_permission}${angry}`)
    if(!message.member.hasPermission("MANAGE_CHANNELS") && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${lang.en.general.errors.user_no_permission}${angry}`)
      if (!args.join(" ")) return message.channel.send(`${lang.en.channels.errors.invalid_name}${angry}`);
      
      let m = message.channel.send(`${yes}${lang.en.channels.success.created_channel}\`#${args.join(" ")}\``)
      
      message.guild.channels.create(args.join("-"), { type: 'text', reason: '' }).catch(e => message.channel.send(`${lang.en.general.errors.default_error}${e}`) && m.delete)
      
    }
}