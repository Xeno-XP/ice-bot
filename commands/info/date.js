const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require(`${require(`${process.cwd()}/config.json`).custom_db ? `${process.cwd()}/modules/db.js` : `quick.db`}`);
const { stripIndents } = require("common-tags");
const { readdirSync } = require("fs");
const { default_prefix } = require("../../config.json");
const { defCol } = require("../../colors.json");

module.exports = {
        name: "date",
        category: "info",
        description: "Shows the date.",
    run: async (client, message, args, lang) => {
    let date = new Date();

    let day = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let days = day[date.getDay()];

    let month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let months = month[date.getMonth()];

    const embed = new discord.MessageEmbed()
      .setColor(defCol)
      .addField("Day", days, true)
      .addField("Month", months, true)
      .addField("Year", `${date.getFullYear()}`, true);
    message.channel.send(embed);
  }
}