const weather = require('weather-js');
const discord = require('discord.js');
const {
    defCol
} = require('../../colors.json');
const {
    stupid,
    angry
} = require('../../emojis.json');

module.exports = {
    name: "weather",
    description: "Get the weather of anywhere with ease.",
    category: "info",
    usage: "weather <location>",
    run: async(client, message, args, lang) => {

        if (!args.length) {
            return message.channel.send(`Please give the weather location${angry}`)
        }

        weather.find({
            search: args.join(" "),
            degreeType: 'C'
        }, function(err, result) {
            try {

                let embed = new discord.MessageEmbed()
                    .setTitle(result[0].location.name)
                    .setColor(defCol)
                    .addField("Temperature", `${result[0].current.temperature} Celcius`, true)
                    .addField("Sky Text", result[0].current.skytext, true)
                    .addField("Humidity", result[0].current.humidity, true)
                    .addField("Wind Speed", result[0].current.windspeed, true)
                    .addField("Time", result[0].current.observationtime, true)
                    .addField("Wind Display", result[0].current.winddisplay, true)
                    .setThumbnail(result[0].current.imageUrl);
                message.channel.send(embed)
            } catch (err) {
                return message.channel.send(`${lang.en.general.errors.provide_a_valid_location}${stupid}`)
            }
        });
    }
};