module.exports = {
  canModifyQueue(member) {
    const { channel } = member.voice;
    const botChannel = member.guild.me.voice.channel;

    if (channel !== botChannel) {
      try {
        member.send("You need to join the voice channel first!").catch(console.error);
      } catch (e) {
        if (e) {
          e.stack
        }
      }
      return false;
    }

    return true;
  }
};