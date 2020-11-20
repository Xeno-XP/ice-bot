const discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const moment = require("moment")
const { ownerid } = require("../../config.json")
const { defCol } = require("../../colors.json")
const { angry, yes, money, stupid, loading, no } = require("../../emojis.json");

module.exports = {
        name: "userinfo",
        description: "Userinfo for user",
        usage: `userinfo | userinfo <@user>`,
        category: "utility",
        aliases: ["info", "whois", "user-info", "user_info", "profile"],
    run: async (client, message, args, lang) => {
    let user = message.mentions.users.first() || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.get(args[0]);
    if (!user) user = message.author;
    if (user.displayAvatarURL({ dynamic: true }) === undefined || user.displayAvatarURL() == null) return message.channel.send(`${no}${lang.en.general.errors.unable_to_fetch_user}`)

    const getAllRoles = (gMem) => {
        let rArr = [];
        let output;

        gMem.roles.cache.forEach((role) => {
            if (role.name.toLowerCase() !== "@everyone")
              rArr.push(role.id);
        });

        output = "<@&" + rArr.join(">, <@&") + ">, @everyone.";

        if (output == "<@&>, @everyone.") {
            output = "@everyone."
        };

        return output;
    };

    const getAllActivities = (mem) => {
        let aArr = [];
        let output;

        for (let i = 0; i < mem.presence.activities.length; i++) {
            aArr.push(mem.presence.activities[i]);
        };

        output = aArr.join(", ") + ".";

        if (output == ".") {
            output = "Nothing."
        };

        return output;
    };

    let embed = new discord.MessageEmbed()
      .setColor(defCol)
      .setThumbnail(user.displayAvatarURL())
      .setAuthor(user.username, user.displayAvatarURL({ dynamic: true }))
      .addField("Username", user.tag, true)
      .addField("Status", user.presence.status.toLowerCase(), true)
      .addField("Playing", getAllActivities(user), true)
      .addField("Joined **Server**", `${moment.utc(user.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`)
      .addField("Joined **Discord**", `${moment.utc(user.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`)
      .addField("Roles", `${getAllRoles(message.guild.members.cache.find(m => m.user.tag === user.tag))}`)
      .addField("Key permissions", `${message.guild.members.cache.find(m => m.user.tag === user.tag).permissions.toArray().join(", ").toLowerCase().replace(/_/g, " ")}`)
      .setTimestamp()
      .setFooter(`𝗜𝗗: ${user.id}`, client.user.displayAvatarURL({ dynamic: true }));
    if (user.bot) embed.setDescription("🤖 **BOT**")
    message.channel.send(embed);
    }
}