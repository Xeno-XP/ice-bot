const { MessageEmbed } = require("discord.js");
const db = require(`${process.cwd()}/modules/db.js`);
const { default_prefix, ownerid } = require("../../config.json");
const { angry, yes, money, stupid, loading, no } = require("../../emojis.json");

module.exports = {
        name: "removeRole",
        aliases: ["removerole", "remRole", "remrole"],
        usage: `removeRole <@user> <@role>`,
        category: "admin",
    run: async (client, message, args, lang) => {
    if(!message.guild.me.hasPermission("MANAGE_ROLES") && !message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send(`${lang.en.general.errors.bot_no_permission}${angry}`)
    if(!message.member.hasPermission("MANAGE_ROLES") && !message.member.hasPermission("ADMINISTRATOR") && message.author.id != ownerid) return message.channel.send(`${lang.en.general.errors.user_no_permission}${angry}`)
 
    let rMember = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.get(args[0])
    if(!rMember) return message.channel.send(`${lang.en.general.errors.invalid_mentioned_user}${angry}`)
    if(rMember.id === message.author.id) return message.channel.send(`${lang.en.roles.errors.cant_remove_role_from_you}${stupid}`);
    let role = message.guild.roles.cache.find(r => r.name == args[1]) || message.guild.roles.cache.find(r => r.id == args[1]) || message.mentions.roles.first()
    if(!role) return message.channel.send(`${lang.en.roles.errors.invalid_mentioned_role}${angry}`) 
            let reason = args.slice(1).join(" ");
            if (!reason) reason = "No reason";
    if(!rMember.roles.cache.has(role.id)) {
        return message.channel.send(`**${rMember.user.tag}** ${lang.en.roles.errors.doesnt_have_role}${stupid}`)
    } else {
        rMember.roles.remove(role.id).catch(e => console.log(e.message))
        message.channel.send(`${yes}**${role.name}** ${lang.en.roles.success.removed_role} **${rMember.user.tag}**`)
    }
  }
}