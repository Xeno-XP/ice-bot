# Ice Bot

Ice Bot is a powerful administration bot and it's a member's and moderator's best friend. The commands are ranging from fun ones, like the meme and love command and for the moderators, there are commands such as ban, kick, mute, warn and much more! Plus there is a super simple and interactive webdashboard for convenience at [https://icebot.xyz](https://icebot.xyz). You can get all of that for free!

### Installation
First of all, clone this repository.

This bot requires [Node.js](https://nodejs.org/) v12+ (and npm) to run.

Once you have that done, edit the `config.json` with your bot's credentials, found [here](https://discord.com/developers/applications) **(your token must be put in the `token.ini` file)**.

### Example Configuration

#### token.ini
```ini
[configuration]
mainToken=token_for_the_main_bot
testingToken=token_for_the_testing_bot(optional)
```

#### config.json

```json
{
    "default_prefix": "_",
    "ownerid": "",
    "vital_logs": "",
    "bot_logs": "",
    "port": "8080",
    "YOUTUBE_API_KEY": "",
    "amethyste_api_key": "",
    "SOUNDCLOUD_CLIENT_ID": "",
    "version": "3.5",
    "main_url": "http://localhost",
    "cdn_url": "http://localhost/i",
    "url_shortener_token": "",
    "disabling_blacklisted_commands": [
        "disableCommand",
        "enableCommand"
    ],
    "custom_db": true,
    "experimental": false,
    "both": false,
    "support_server_invite": "",
    "handler_loader_path": "./handlers/loader.js",
    "constructorLoader_fileName": "constructors.js",
    "moduleHandler_fileName": "modules.js"
}
```

After that, you can install the dependencies and start the bot.

**You can use the command line**
```sh
$ cd ice-bot
$ npm install
$ npm start
```

**NOTE:** Running the bot with a process manager (like PM2) is recommended.

>This bot must be run on a Discord bot account. Do __NOT__ try to run this on a normal user account. This is against the Discord Terms of Service.

## Changes to the Code

You may change code if needed under the following conditions:

**ALL** copyright notices and credits **must** be kept as is, not edited in any way (except for adding your own name) and not removed.

## Contributing

Want to contribute?

Ice Bot is written in Discord.js. If you want to add a feature or work on the code, feel free make a pull request and your code might be accepted.

## License:

Please read the `LICENSE` file.
