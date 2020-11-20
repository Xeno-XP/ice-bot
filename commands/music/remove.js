const { canModifyQueue } = require("../../utils/musicUtil.js");

module.exports = {
  name: "remove",
  aliases: [],
  category: "music",
  description: "Remove song from the queue",
  run (client, message, args, lang) {
    const queue = client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("There is no queue.").catch(console.error);
    if (!canModifyQueue(message.member)) return;
    
    if (!args.length) return message.reply(`Usage: ${client.prefix}remove <Queue Number>`);
    if (isNaN(args[0])) return message.reply(`Usage: ${client.prefix}remove <Queue Number>`);

    const song = queue.songs.splice(args[0] - 1, 1);
    queue.textChannel.send(`${message.author} ❌ removed **${song[0].title}** from the queue.`);
  }
};
