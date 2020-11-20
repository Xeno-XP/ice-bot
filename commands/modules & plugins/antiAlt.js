const { MessageEmbed } = require("discord.js");
const db = require(`${process.cwd()}/modules/db.js`);
const { default_prefix, ownerid } = require("../../config.json");
const { angry, yes, money, stupid, loading, no } = require("../../emojis.json");

module.exports = {
        name: "antialt",
        aliases: ['anti-alt'],
        usage: "antialt (auto toggles)",
        description: "Enable/Disable the anti-alt plugin.",
        category: "modules & plugins",
    run: async (client, message, args, lang) => {

      message.reply("This feature is still in developement.");

      /*if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${lang.en.general.errors.user_no_permission}${angry}`)
 
      let enable = db.get(`iceantialt${message.guild.id}`)
      
      if(enable) { await db.delete(`iceantialt${message.guild.id}`); return message.channel.send(`${yes}${lang.en.general.success.disabled_plugin}`) }
      
      if(!enable) { await db.set(`iceantialt${message.guild.id}`, 'yes'); return message.channel.send(`${yes}${lang.en.general.success.enabled_plugin}`) }*/
    }
}