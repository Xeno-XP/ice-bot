const db = require(`${require(`${process.cwd()}/config.json`).custom_db ? `${process.cwd()}/modules/db.js` : `quick.db`}`);
const discord = require("discord.js");

module.exports = (client, oldChannel, newChannel) => {
    let settings = db.get(`settings${oldChannel.guild.id}`);

    try {
        settings.auditLog
    } catch (e) {
        if (e) {
            settings = {};
            settings.auditLog = null;

            db.set(`settings${oldChannel.guild.id}`, settings);
            settings = db.get(`settings${oldChannel.guild.id}`);
        };
    };

    let auditLogChannel = client.channels.cache.get(settings.auditLog);

    if (!auditLogChannel) return;

    if (oldChannel.type === 'voice') return;

    if (oldChannel.type === 'dm') return;

    if (oldChannel.type === 'category') return;

    let old_nsfw = oldChannel.nsfw ? 'Yes' : 'No';

    let new_nsfw = newChannel.nsfw ? 'Yes' : 'No';

    let old_parent = oldChannel.parent ? oldChannel.parent : 'No Category';

    let new_parent = newChannel.parent ? newChannel.parent : 'No Category';

    let old_topic = oldChannel.topic ? oldChannel.topic : 'None';

    let new_topic = newChannel.topic ? newChannel.topic : 'None'

    let embed = new discord.MessageEmbed()
        .setAuthor("Channel Updated")
        .setColor("#fcba03")
        .addField('Old Channel', `\`Name:\` ${oldChannel.name}\n\`NSFW:\` ${old_nsfw}\n\`Slowmode:\` ${oldChannel.rateLimitPerUser}s\n\`Category:\` ${old_parent}\n\`Topic:\` ${old_topic}`, true)
        .addField('New Channel', `\`Name:\` ${newChannel.name}\n\`NSFW:\` ${new_nsfw}\n\`Slowmode:\` ${newChannel.rateLimitPerUser}s\n\`Category:\` ${new_parent}\n\`Topic:\` ${new_topic}`, true)
        .setFooter(`Created:`)
        .setTimestamp(oldChannel.createdTimestamp)
        try {
            auditLogChannel.send(embed);
        } catch (e) {
            if (e) {
                return 1+1;
            } else {
                return 1+1;
            };
        };
}