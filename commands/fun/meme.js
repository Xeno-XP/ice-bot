const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require(`${process.cwd()}/modules/db.js`);
const { default_prefix } = require("../../config.json");
const { defCol } = require("../../colors.json");
const { loading, no } = require("../../emojis.json");
const randomPuppy = require("random-puppy");

module.exports = {
        name: "meme",
        aliases: ["memem"],
        usage: `meme`,
        category: "fun",
    run: async (client, message, args, lang) => {
    const subReddits = ["dankmeme", "meme", "me_irl", 'memes', 'Discordmemes'];
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];
    const img = await randomPuppy(random);
    const embed = new discord.MessageEmbed()
      .setColor(`RANDOM`)
      .setTitle("r/"+random)
      .setImage(img)
      .setURL(`https://reddit.com/r/${random}`);
    message.channel.send(embed);
    }
}