const { canModifyQueue } = require("../../utils/musicUtil.js");

module.exports = {
  name: "loop",
  aliases: ['l'],
  category: "music",
  description: "Toggle music loop",
  run (client, message, args, lang) {
    const queue = client.queue.get(message.guild.id);
    if (!queue) return message.reply("There is nothing playing.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    // toggle from false to true and reverse
    queue.loop = !queue.loop;
    return queue.textChannel
      .send(`Loop is now ${queue.loop ? "**on**" : "**off**"}.`)
      .catch(console.error);
  }
};
