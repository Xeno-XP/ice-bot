const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require(`${require(`${process.cwd()}/config.json`).custom_db ? `${process.cwd()}/modules/db.js` : `quick.db`}`);
const { stripIndents } = require("common-tags");
const { readdirSync } = require("fs");
const { default_prefix, ownerid } = require("../../config.json");
const { defCol } = require("../../colors.json");
const devIdArr = require("../../partners.json");
let arrayOfUsernamesAndTags = [];
const moment = require("moment");
let tempuserObj;

module.exports = {
        name: "botinfo",
        category: "info",
        aliases: ["bot", "botstats", "bot-stats", "stats"],
        description: "Shows my statistics.",
    run: async (client, message, args, lang) => {
        const client2 = new discord.Client();
        tempuserObj = await client.users.cache.get(ownerid);
        arrayOfUsernamesAndTags.push(`${tempuserObj.tag}`)
for(let i = 0 ; i < devIdArr.length ; i++) {
    tempuserObj = await client.users.cache.get(devIdArr[i]);
    arrayOfUsernamesAndTags.push(`${tempuserObj.user.username}#${tempuserObj.discriminator}`)
}
      
  let prefix = db.get(`settings${message.guild.id}`).prefix;
  if (!prefix) prefix = default_prefix;
      
    function duration(ms) {
        const sec = Math.floor((ms / 1000) % 60).toString()
        const min = Math.floor((ms / (1000 * 60)) % 60).toString()
        const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
        const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
        return `${days.padStart(1, '0')}d ${hrs.padStart(2, '0')}h ${min.padStart(2, '0')}m ${sec.padStart(2, '0')}s`
    }
      
   message.channel.send({
        embed: {
            "title": "Pinging...",
            "timestamp": new Date(),
            "description": "<a:loading:735266475652153368>",
            "color": 2105893
        }
    }).then( async m => {
        let ping = m.createdTimestamp - message.createdTimestamp
    let ang = new discord.MessageEmbed()
    .setAuthor(`${client.user.username} info`, client.user.avatarURL)
    .setThumbnail(client.user.avatarURL)
    .setColor(defCol)
    .setDescription(`**Developers:** ${arrayOfUsernamesAndTags.join(", ") ? arrayOfUsernamesAndTags.join(", ") : "Failed to fetch bot developers :/"}.`)
    .addField('Ping', `\`${ping}ms\``, true)
    .addField('Uptime', `\`${duration(client.uptime)}\``, true)
    .addField('Servers', `\`${client.guilds.cache.size}\``, true)
    .addField("Users", `\`${client.users.cache.size}\``, true)
    .addField("Channels", `\`${client.channels.cache.size}\``, true)
    .addField("Default Prefix", `\`${default_prefix}\``, true)
    .addField("Prefix in this server", `\`${prefix}\``, true)
    .addField("Name", `\`${client.user.tag}\``, true)
    .addField("Bot Version", `\`${client.config.version}\``, true)
    .addField("Library", `\`\`Discord.js V${require("discord.js").version.toString()}\`\``, true)
    .setFooter(`𝗖𝗿𝗲𝗮𝘁𝗲𝗱 𝗔𝘁: ${moment(client.user.createdTimestamp).format('LT')} ${moment(client.user.createdTimestamp).format('LL')} (${moment(client.user.createdTimestamp).fromNow()})`, client.user.displayAvatarURL);
    await m.edit(ang);
    setTimeout(() => {
        arrayOfUsernamesAndTags = [];
    }, Math.round(client.ping) || m.createdTimestamp - message.createdTimestamp)
    })
    
    }
}