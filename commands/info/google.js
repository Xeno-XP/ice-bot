const { MessageEmbed, Attachment } = require("discord.js");
const { angry } = require("../../emojis.json");
const { defCol } = require("../../colors.json");

module.exports = {
  name: "google",
  description: "Search google.",
  example: 'google Brawl Stars',
  category: "info",
  run: async (client, message, args, lang) => {
    let l = new Attachment("https://cdn.discordapp.com/attachments/712696367927263232/719898532185899089/nsfw.gif", 'enable nsfw.gif')
    if(!message.channel.nsfw) return message.channel.send(l)
    if(!args.join(" ")) return message.channel.send(`${lang.en.general.errors.enter_a_valid_message}${angry}`)
    let embed = new MessageEmbed()
    .setDescription(`${lang.en.google.info.searching} \`${args.join(' ')}\`...`)
    .setColor(defCol);
    
    let embeds = new MessageEmbed()
    .setDescription(`Link for [${args.join(" ")}](https://google.com/search?q=${args.join(' ').replace(/ /g, "%20")})`)
    .setColor(defCol);
    
    message.channel.send(embed).then(m =>
    setTimeout(()=>{
      m.edit(embeds)
    },3000 ))
  }
}