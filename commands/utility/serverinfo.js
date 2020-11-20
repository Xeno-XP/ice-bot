const discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const moment = require("moment")
const { ownerid } = require("../../config.json")
const { defCol } = require("../../colors.json")
const {   
  angry,
  yes,
  stupid,
  defCol_premium,
  loading,
  no,
  timer,
  win_loading,
  voice,
  channel,
  dnd,
  idle,
  offline,
  online,
  category,
  boost 
} = require("../../emojis.json");

const serverLevel = [
	'None',
	'Low',
	'Medium',
	'(╯°□°）╯︵ ┻━┻',
	'┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
];

const regions = {
	brazil: '🇧🇷 Brazil',
	europe: '🇪🇺 Europe',
	hongkong: '🇭🇰 Hong Kong',
	india: '🇮🇳 India',
	japan: '🇯🇵 Japan',
	russia: '🇷🇺 Russia',
	singapore: '🇸🇬 Singapore',
	southafrica: '🇿🇦 South Africa',
	sydeny: '🇦🇺 Sydeny',
	'us-central': '🇺🇸 US Central',
	'us-east': '🇺🇸 US East',
	'us-west': '🇺🇸 US West',
	'us-south': '🇺🇸 US South'
};

module.exports= {
        name: "serverinfo",
        usage: `serverinfo`,
        category: "utility",
        aliases: ["server-info", "server_info"],
    run: async (client, message, args, lang) => {
      let verlvl;
      if(message.guild.verificationLevel.toLowerCase() === "none") {
          verlvl = 0;
      }

      if(message.guild.verificationLevel.toLowerCase() === "low") {
          verlvl = 1;
      }

      if(message.guild.verificationLevel.toLowerCase() === "medium") {
        verlvl = 2;
      }
      
      if(message.guild.verificationLevel.toLowerCase() === "high") {
        verlvl = 3;
      }

      if(message.guild.verificationLevel.toLowerCase() === "very_high") {
        verlvl = 4;
      }

    let embed = new discord.MessageEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL)
      .setColor(defCol)
      .setThumbnail(message.guild.displayIconURL)
      .addField("Owner", `<@${message.guild.owner.id}>`, true)
      .addField("Roles", message.guild.roles.cache.size, true)
      .addField("Channels", message.guild.channels.cache.size, true)
      .addField("Region", regions[message.guild.region], true)
      .addField(`Emojis [${message.guild.emojis.cache.size}]`, `Normal: ${message.guild.emojis.cache.filter(emoji => !emoji.animated).size} | Animated: ${message.guild.emojis.cache.filter(emoji => emoji.animated === true).size}`, true)
      .addField(`Users [${message.guild.memberCount}]`, ` Humans: ${message.guild.members.cache.filter(member => !member.user.bot).size} | Bots: ${message.guild.members.cache.filter(members => members.user.bot === true).size}`, true)
      .addField(`Boosts:`, message.guild.premiumSubscriptionCount || '0', true)
      .addField("Verification **LVL**", serverLevel[verlvl] ? `${serverLevel[verlvl]}` : 'Failed to fetch.', true)
      .addField('Boost **LVL**', message.guild.premiumTier ? `${message.guild.premiumTier}` : 'None', true)
      .setFooter(`𝗜𝗗: ${message.guild.id} | 𝗖𝗿𝗲𝗮𝘁𝗲𝗱 𝗔𝘁: ${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} (${moment(message.guild.createdTimestamp).fromNow()})`)
    message.channel.send(embed);
  }
}