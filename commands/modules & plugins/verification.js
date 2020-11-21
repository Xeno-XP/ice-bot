const { MessageEmbed, MessageFlags } = require("discord.js");
const db = require(`${require(`${process.cwd()}/config.json`).custom_db ? `${process.cwd()}/modules/db.js` : `quick.db`}`);
const { default_prefix, ownerid } = require("../../config.json");
const { angry, yes, money, stupid, loading, no } = require("../../emojis.json");
const { arg } = require("mathjs");

module.exports = {
        name: "verification",
        aliases: ['verify'],
        usage: "verification <#channel> <@role> [embed color (hex or word)]",
        description: "Enable/Disable the verification plugin.",
        category: "modules & plugins",
    run: async (client, message, args, lang) => {

      message.reply("This feature is still in developement.");

        /*function getEmojiName (emojiPlain) {
            if(emojiPlain.startsWith("<a:")){
                emojiPlain = emojiPlain.split(":")
                return emojiPlain[1].toString();
            } else if(emojiPlain.startsWith("<:")) {
                emojiPlain = emojiPlain.split(":")
                return emojiPlain[1].toString();
            }
        }

        function getEmojiId (emojiPlain) {
            if(emojiPlain.startsWith("<a:")){
                emojiPlain = emojiPlain.split(":")
                return parseInt(emojiPlain[2]).toString();
            } else if(emojiPlain.startsWith("<:")) {
                emojiPlain = emojiPlain.split(":")
                return parseInt(emojiPlain[2]).toString();
            }
        }

        async function isEmoji(emojiToTest) {
            let emojis = /[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug;

            if (!emojis.test(emojiToTest) && !emojiToTest.startsWith("<a:") && !emojiToTest.startsWith("<:")) {
                    return message.channel.send(lang.en.general.errors.enter_a_valid_emoji)
            } else if (!emojis.test(emojiToTest) && !emojiToTest.startsWith("<a:") && !emojiToTest.startsWith("<:")) {
                console.log(getEmojiId(args[1]))

                let emojiObj = await message.guild.emojis.cache.find(emoji => emoji.name == getEmojiName(args[1]));

                console.log(emojiObj)

                if(emojiObj.id !== getEmojiId(args[1])) {
                    return message.channel.send(lang.en.general.errors.invalid_selected_emoji)
                }
            }
            return emojiToTest;
        }

        await console.log(message.content)

      async  function getChannelFromMention(mention) {
        if (!mention) {
          return message.channel.send(lang.en.general.errors.invalid_mentioned_channel);
        }; 
        if (mention.startsWith('<#') && mention.endsWith('>')) {
          mention = mention.slice(2, -1);
          if (mention.startsWith('!')) {
            mention = mention.slice(1);
          }
          return await client.channels.cache.get(mention);
          }
      }*/

    //let verificationEmoji  = isEmoji(args[1]);

      /*function getRoleFromMention (mention) {
        if (!mention) {
          return message.channel.send(lang.en.general.errors.invalid_selected_role);
        };
        if (mention.startsWith('<@&') && mention.endsWith('>')) {
            mention = mention.split("<@&")
            mention = mention[1].split(">")
            if (!message.guild.roles.cache.get(mention[0])) {
              return message.channel.send(lang.en.general.errors.invalid_selected_role);
            };
            return mention[0]
          } else {
            return message.channel.send(lang.en.general.errors.invalid_selected_role);
          }
      }

      function getChannelFromMention (mention) {
        if (!mention) {
          return message.channel.send(lang.en.general.errors.invalid_mentioned_channel);
        };
        if (mention.startsWith('<#') && mention.endsWith('>')) {
            mention = mention.split("<#")
            mention = mention[1].split(">")
            if (!message.guild.channels.cache.get(mention[0])) {
              return message.channel.send(lang.en.general.errors.invalid_mentioned_channel);
            };
            return mention[0]
          } else {
            return message.channel.send(lang.en.general.errors.invalid_mentioned_channel);
          }
      }

      if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${lang.en.general.errors.user_no_permission}${angry}`)
      let verificationChannel = getChannelFromMention(args[0]);

      let enabled = db.get(`iceverification${message.guild.id}`)

     if(enabled) {
          await db.delete(`iceverification${message.guild.id}`)
          await db.delete(`iceverificationchid${message.guild.id}`)
          await db.delete(`iceverificationrlid${message.guild.id}`)
          await db.delete(`iceverificationrlid${message.guild.id}`)
          await db.delete(`iceverificationmsgid${message.guild.id}`)
          return await message.channel.send(`${yes}${lang.en.general.success.disabled_plugin}`)
      }

      if(!enabled){
          let verEmbed = new MessageEmbed()
            .setColor(args[2].toString().toUpperCase())
            .setTitle("Oh hey,")
            .setDescription(`Welcome!\n\nIn order to get access to the full version of this server, you need to prove, you're a human!\nTo do that you must react to the \"<:yes:741627828533198869>\" emoji.\n\n**BY CLICKING ON \"<:yes:741627828533198869>\", YOU PROVE THAT YOU AGREE TO ALL THE TERMS AND RULES TO THIS GUILD!**`)

          await db.set(`iceverification${message.guild.id}`, true)
          await db.set(`iceverificationchid${message.guild.id}`, verificationChannel)
          await db.set(`iceverificationrlid${message.guild.id}`, getRoleFromMention(args[1]))

          let sendCh = client.channels.cache.get(getChannelFromMention(args[0]))
          try {
            await sendCh.send(verEmbed)
            .then(async m => {
                await db.set(`iceverificationmsgid${message.guild.id}`, m.id)
                await m.react("741627828533198869")
            })
          } catch (e) {
            message.channel.send(lang.en.general.errors.default_error_short)
          }
          return await message.channel.send(`${yes}${lang.en.general.success.enabled_plugin}`)
        }*/
    }
}