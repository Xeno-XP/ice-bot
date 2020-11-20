const { angry } = require("../../emojis.json");

module.exports = {
        name: "say",
        usage: `say <message>`,
        category: "utility",
    run: async (client, message, args, lang) => {
      if (!args.join(" ")) return message.channel.send(`${lang.en.general.errors.enter_valid_text}${angry}`);
      let text = "";
      text = args.join(" ");

      if (!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) {
          text = text.replace(/@here/g, "@he--NOPE--");
          text = text.replace(/@everyone/g, "@every--NOPE--");
      };

      message.channel.send(text += `\n\n\n*-- ${message.author}*`);
      message.delete();
  }
}