const { MessageEmbed } = require("discord.js");
const { arg } = require("mathjs");
const db = require(`${process.cwd()}/modules/db.js`);
const { default_prefix, ownerid } = require("../../config.json");
const fs = require("fs");
const { angry, yes, money, stupid, loading, no } = require("../../emojis.json");
const { defCol } = require("../../colors.json");
const ms = require("ms");
const { duration } = require("moment");

module.exports = {
        name: "prime",
        aliases: ["premium", "prime", "claimPremium", "redeemPremium", "claimPrime", "redeemPrime"],
        usage: `prime <claim | check> [code]`,
        category: "admin",
        description: "Claims/checks prime status of the guild.",
    run: async (client, message, args, lang) => {
        return message.channel.send("Prime is still in development, please check back later.");

        if (!message.member.hasPermission("ADMINISTRATOR") && message.author.id !== ownerid) {
            return message.channel.send(`${lang.en.general.errors.user_no_permission}${angry}`);
        };

        let settings = db.get(`settings${message.guild.id}`);

        if (!args[0]) {
            return message.channel.send(`${no} Please enter a valid argument, usage: \`prime <claim | check> [code]\`.`);
        };

        if (args[0].toLowerCase() !== "check" && args[0].toLowerCase() !== "claim") {
            return message.channel.send(`${no} Invalid argument: \`${args[0]}\`, usage: \`prime <claim | check> [code]\`.`);
        };

        if (args[0].toLowerCase() == "check") {
            return checkPrime();
        } else if (args[0].toLowerCase() == "claim") {
            return claimPrime(args[1]);
        };

        function checkPrime () {
            if (!settings.premiumStatus) {
                let embed = new MessageEmbed().setColor(defCol).setDescription(`${no} Oh, what a pitty you don't have ${client.user.username} prime!`);

                return message.channel.send(embed);
            };
        };

        function claimPrime (code) {
            if (!code) {
                let embed = new MessageEmbed().setColor(defCol).setDescription(`${no} Invalid argument: \`${"code"}\`, usage: \`prime claim [code]\`.`);

                return message.channel.send(embed);
            };

            let codes = require(`${process.cwd()}/storage/premiumCodes.json`);
            let codeProperties;

            if (client.mapCodes(codes).includes(args[1])) {
                for (let i = 0; i < codes.length; i++) {
                    if (codes[i].code == args[1]) {
                        codeProperties = codes[i];

                        codes.splice(i, 1);
                    };
                };
                
                fs.writeFile(`${process.cwd()}/storage/premiumCodes.json`, JSON.stringify(codes, null, 4), "UTF-8", (err) => {
                    if (err) throw err;
                });

                if (!this.premiumEndsAt) {
                    let embed = new MessageEmbed().setColor(defCol).setDescription(`${yes} Congratulations, you have activated ${client.user.username} prime for ${getCodeDurationInWords(codeProperties.duration)}.`);

                    return message.channel.send(embed);
                } else {
                    let embed = new MessageEmbed().setColor(defCol).setDescription(`${yes} You have added ... more to your subscription of ${client.user.username} prime, for a total of ${getTotalDurationInWords(settings.premiumEndsAt - new Date().getTime(), getCodeDurationInMS(codeProperties.duration))}.`);

                    return message.channel.send(embed);
                };
            } else {
                let embed = new MessageEmbed().setColor(defCol).setDescription(`${no} Invalid code provided.`);

                return message.channel.send(embed);
            };
        };

        function getCodeDurationInWords (duration) {
            if (duration == null) {
                return "null";
            };

            if (duration == 1) {
                return "1 month";
            };

            if (duration == 2) {
                return "3 months";
            };

            if (duration == 3) {
                return "6 months";
            };

            return "none";
        };

        function getCodeDurationInMS (duration) {
            if (duration == null) {
                return null;
            };

            if (duration == 1) {
                return ms("30d");
            };

            if (duration == 2) {
                return ms("90d");
            };

            if (duration == 3) {
                return ms("180d");
            };

            return null;
        };

        function getTotalDurationInWords (duration1, duration2) {
            if (duration1 == null) { duration1 = Infinity; };
            if (duration2 == null) { duration2 = Infinity; };

            try {
                return ms(duration1 + duration2, { long: true });
            } catch (e) {
                if (e){
                    return "null";
                }
            }
        };
    }
};