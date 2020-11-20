const discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const moment = require("moment")
const { ownerid } = require("../../config.json")
const { defCol } = require("../../colors.json")
const { angry, yes, money, stupid, loading, no, timer } = require("../../emojis.json");
const db = require(`${process.cwd()}/modules/db.js`);
const usedCommandRecently = new Set();

module.exports= {
        name: "report",
        description: "Report User",
        usage: `report <@user> <reason>`,
        category: "utility",
    run: async (client, message, args, lang) => {
      if (usedCommandRecently.has(message.author.id)){
        message.channel.send(`${timer}${lang.en.reports.errors.wait_cooldown}`);
      } else {
  let chx = db.get(`defColreportchannel_${message.guild.id}`);

    if (chx === null) return message.channel.send(`${no}${lang.en.reports.errors.report_channel_not_setup}`)
    let target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!target) return message.channel.send(`${lang.en.general.errors.invalid_mentioned_user}${angry}`);
    if(target.hasPermission(["ADMINISTRATOR"])) return message.channel.send(`${lang.en.general.errors.cant_execute_on_staff}${stupid}`)
    if(target.id === message.author.id) return message.channel.send(`${lang.en.general.errors.cant_execute_on_self}${stupid}`);
    let reason = args.slice(1).join(" ")
    if(!reason) return message.channel.send(`${lang.en.general.errors.provide_a_valid_reason}${angry}`)
    let embed = new discord.MessageEmbed()
    .setTitle("Report")
    .setThumbnail(target.user.avatarURL)
    .addField("Reporter", `${message.author.tag} | <@${message.author.id}>`)
    .addField("Reported User", `${target.user.tag} | <@${target.user.id}>`);
    
    message.channel.send(`${yes}${lang.en.reports.success.report_filed}`).then(m => m.delete(15000))
  client.channels.cache.get(chx).send(embed).then(async msg => {
        await msg.react("741627828533198869")
        await msg.react("741627827924762676")
    })
        
        usedCommandRecently.add(message.author.id);
        setTimeout(() => {
          usedCommandRecently.delete(message.author.id)
        }, 7200000);
    }
}
}