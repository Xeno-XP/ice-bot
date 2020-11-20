const { MessageEmbed } = require("discord.js");
const db = require(`${process.cwd()}/modules/db.js`);
const { default_prefix, ownerid } = require("../../config.json");
const { angry, yes, money, stupid, loading, no } = require("../../emojis.json");

module.exports = {
        name: "auto-mod",
        aliases: ['automod'],
        usage: "auto-mod (auto toggles)",
        description: "Auto Moderation",
        category: "modules & plugins",
    run: async (client, message, args, lang) => {

    if(!message.member.hasPermission("ADMINISTRATOR") && message.author.id != ownerid) return message.channel.send(`${lang.en.general.errors.user_no_permission}${angry}`)
 
      let enable = db.get(`ragemod${message.guild.id}`)
      
      if(enable) { await db.delete(`ragemod${message.guild.id}`); return message.channel.send(`${yes}${lang.en.general.success.disabled_plugin}`) }
      
      if(!enable) { await db.set(`ragemod${message.guild.id}`, 'yes'); return message.channel.send(`${yes}${lang.en.general.success.enabled_plugin}`) }
    }
}