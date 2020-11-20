const { canModifyQueue } = require("../../utils/musicUtil.js");


module.exports = {
  name: "stop",
  aliases: [],
  category: "music",
  description: "Stops the music",
  run (client, message, args, lang) {
    const queue = client.queue.get(message.guild.id);
    
    if (!queue) return message.reply("There is nothing playing.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.songs = [];
    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏹ stopped the music!`).catch(console.error);
  }
};
