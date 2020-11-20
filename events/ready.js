module.exports = async (client) => {
    const {
        default_prefix,
        ownerid,
        owner_channel
    } = client.config;

    require("../api/api.js")(client);

    let currentStatus = 0;
    /*setInterval(async() => {
        let statusOpt = [
            `${client.config.default_prefix}help`,
            `on ${client.guilds.cache.size} servers!`,
            `with ${client.users.cache.size} Users!`,
            `tag for prefix.`,
            `at ${client.config.main_url}`
        ];

        if (currentStatus >= statusOpt.length) {
            currentStatus = 0;
        }

        let status = statusOpt[currentStatus];
        await client.user.setStatus('dnd')
        await client.user.setPresence({
            activity: {
                name: status.toString(),
                type: 'STREAMING',
                url: 'https://www.twitch.tv/search?term=you%20are%20not%20supposed%20to%20be%20here%20lol/'
            },
            status: 'dnd'
        });
    }, 5000);*/

    await client.user.setStatus('dnd')
    await client.user.setPresence({
        activity: {
            name: `${default_prefix}help`,
            type: 'STREAMING',
            url: 'https://www.twitch.tv/search?term=you%20are%20not%20supposed%20to%20be%20here%20lol/'
        },
        status: 'dnd'
    });

    console.log(`Ready as ${client.user.tag} to serve in ${client.channels.cache.size} channels on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users.`);
};