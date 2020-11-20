// const fs = require("fs");
// const chalk = require('chalk');
// const giveawayPath = "../storage/giveaways.json";
// const giveawayPathForFS = "./storage/giveaways.json";

// try {
//     require(giveawayPath);
// } catch (e) {
//     if (e) {
//         writeFile("[]");
//     };
// };

// let giveaways = require(giveawayPath);

// module.exports = {
//     load: true,
//     init: async (client) => {
//         async function update () {
//             giveaways = require(giveawayPath);

//             for (let i = 0; i < giveaways.length; i++) {
//                 try {
//                     client.channels.cache.get(giveaways[i].channel).messages.fetch("701574160211771462");
//                 } catch (e) {
//                     if (e) {
//                         continue;
//                     };
//                 };

//                 let msg = client.channels.cache.get(giveaways[i].channel).messages.fetch("701574160211771462");

//                 if (giveaways[i].endsAt >= Date.now()) {
//                     giveaways[i].ended = true;
//                 };

//                 if (giveaways[i].ended) {
//                     msg.edit(msg.setDescription(
//                         `React with ${emoji.tada} to enter!\n` +
//                         `Time remaning: **${ms(ms(args[0])-secondsPassed*1000, { long: true })}**\n` +
//                         `Hosted by: ${message.author}`
//                     ));
//                 };
//             };

//             updateFile(giveaways);
//         };

//         setInterval(async () => {
//             await update();
//         }, 0);
//     }
// };

// function writeFile (data) {
//     fs.writeFile(giveawayPathForFS, data, (e) => {
//         if (e) {
//             console.warn(chalk.orange(e));    
//         };
//     });
// };

// function updateFile (obj) {
//     fs.writeFile(giveawayPathForFS, JSON.stringify(obj, null, 4), (e) => {
//         if (e) {
//             console.warn(chalk.yellow(e));    
//         };
//     });
// };

// function endedEmbed (prize, winner, host, endsAt) {
//     let Embed = new MessageEmbed()
//         .setTitle(prize)
//         .setDescription(
//             `Winner: ${winner}\n` +
//             `Hosted by: ${host}`
//         )
//         .setFooter("Ended at")
//         .setTimestamp(endsAt)
//         .setColor(0x202225);

//     return Embed;
// }