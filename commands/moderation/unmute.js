const discord = require("discord.js");
const ms = require("ms");
const config = require("../../config.json");

module.exports = {
  name: "unmute",
  description: "Un-mute people.",
  category: "moderation",
  usage: "unmute <@user>" ,
  run: async(client, message, args) => {
    
    if(!message.member.hasPermission("MANAGE_MESSAGES")) {
      let embed = new discord.MessageEmbed()
      .setColor(0xe80b30)
      .setDescription(":x: You need the Manage Messages permission to run this command!")
      return message.channel.send(embed)
    }

    if(!message.guild.me.hasPermission("MANAGE_ROLES")) {
      let embed = new discord.MessageEmbed()
      .setColor(0xe80b30)
      .setDescription(":x: I need the Manage Roles permission to run this command!")
      return message.channel.send(embed)
    }

    let user = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.user.username === args[0]);
    if(!user) {
      let embed = new discord.MessageEmbed()
      .setColor(0xe80b30)
      .setDescription(":x: Please mention a user to un-mute!")
      return message.channel.send(embed)
    }

    let mute = await message.guild.roles.cache.find(r => r.name == "Muted");
    if(!mute) {
        let embed = new discord.MessageEmbed()
        .setColor(0xe80b30)
        .setDescription("This user isn't muted!")
        return message.channel.send(embed);
    };

    if(user.roles.cache.has(mute.id)) {
      let embed = new discord.MessageEmbed()
        .setColor(0x2D2D2D)
        .setAuthor(`${user.user.tag} is now unmuted`, user.user.displayAvatarURL({ dynamic: true }))

      delete client[`mute${message.guild.id}${user.id}`];
      
      message.channel.send(embed)
      return user.roles.remove(mute.id)
    } else {
      let embed = new discord.MessageEmbed()
        .setColor(0xe80b30)
        .setDescription("This user isn't muted!")
        return message.channel.send(embed);
    }
  }
}