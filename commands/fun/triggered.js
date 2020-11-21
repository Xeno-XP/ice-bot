const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require(`${require(`${process.cwd()}/config.json`).custom_db ? `${process.cwd()}/modules/db.js` : `quick.db`}`);
const config = require(`${process.cwd()}/config.json`);
const { defCol } = require("../../colors.json");
const { loading, no } = require("../../emojis.json");
const AmeClient = require("amethyste-api");
const AmeAPI = new AmeClient(config.amethyste_api_key);

module.exports = {
        name: "trigger",
        aliases: ["triggered"],
        usage: `trigger | trigger <@user>`,
        category: "fun",
    run: async (client, message, args, lang) => {
    let user = message.mentions.users.first() || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.get(args[0]);
    if (!user) user = message.author;
    if (user.displayAvatarURL({ dynamic: true }) === undefined || user.displayAvatarURL({ dynamic: true }) == null) return message.channel.send(`${no}${lang.en.general.errors.unable_to_fetch_user}`)
    let m = message.channel
      .send(loading)
      .then(m => { setTimeout(() => { m.delete( )}, 3000)} );
    let buffer = await AmeAPI.generate("triggered", {
      url: user.displayAvatarURL({ dynamic: true, format: 'png', size: 256 })
    });
    message.channel.send({
      files: [
        {
          attachment: buffer,
          name: `${user.username}_tiggered.gif`
        }
      ]
    });
  }
}