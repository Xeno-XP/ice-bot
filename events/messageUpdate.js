const db = require(`${require(`${process.cwd()}/config.json`).custom_db ? `${process.cwd()}/modules/db.js` : `quick.db`}`);
const discord = require("discord.js");

module.exports = (client, oldMessage, newMessage) => {
    //sniping

    if (!oldMessage.author.bot && !oldMessage.author.bot) {
        client.editSnipes.set(oldMessage.channel.id, {
            content: oldMessage.content,
            author: oldMessage.author,
            image: oldMessage.attachments.first() ? `${oldMessage.attachments.first().proxyURL}` : null
        });
    };

    //audit log

    let settings = db.get(`settings${oldMessage.guild.id}`);

    try {
        settings.auditLog
    } catch (e) {
        if (e) {
            settings = {};
            settings.auditLog = null;

            db.set(`settings${oldMessage.guild.id}`, settings);
            settings = db.get(`settings${oldMessage.guild.id}`);
        };
    };

    let auditLogChannel = client.channels.cache.get(settings.auditLog);
  
    if (!auditLogChannel) return;

    if (newMessage.content === oldMessage.content) return;
  
    let embed = new discord.MessageEmbed()
        .setAuthor(`Message Edited`)
        .setTimestamp()
        .setColor("#f05454")
        .setDescription(`**Channel:** <#${oldMessage.channel.id}>\n**[Link for the Message](https://discord.com/channels/${oldMessage.guild.id}/${oldMessage.channel.id}/${oldMessage.id})**`)
        .addField("Old Message Content", oldMessage.content, true)
        .addField('New Message Content', newMessage.content, true)
        .addField("Message Author", oldMessage.author, true);
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