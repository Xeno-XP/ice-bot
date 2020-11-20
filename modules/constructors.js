// Load all the modules
const discord = require("discord.js");
const fs = require("fs");

module.exports =  {
    init: async (client) => {
        const config = require(`${process.cwd()}/config.json`);
        client.config = config;

        client.modules = {};

        client.runningInstances = new Map();
        client.queue = new Map();

        client.modules.writeData = (data) => {
            fs.writeFile(`${process.cwd()}/storage/giveaways.json`, data, `UTF-8`, (err) => {
                if (err) throw err;
            });
        };

        client.getRandomCode = (length = 25) => {
            let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.';
        
            let str = '';
            for (let i = 0; i < length; i++) {
                str += chars.charAt(Math.floor(Math.random() * chars.length));
            };
        
            return str;
        };
        
        client.mapCodes = (codes) => {
            let map = [];
        
            for (let i = 0; i < codes.length; i++) {
                map.push(codes[i].code);
            };
        
            return map;
        };

        client.modules.writeData(`[]`);

        client.guildSettings = class {
            constructor() {
                this.prefix = null;
                this.language = null;
                this.disabledCommands = [];
                this.welcomeChannel = null;
                this.premiumStatus = false;
                this.premiumEndsAt = null;
            }
        };

        client.clean = (client, text) => {
            if (typeof evaled !== `string`) text = require(`util`).inspect(text, {
                depth: 0
            });

            var t = text
                .replace(/`/g, `\`` + String.fromCharCode(8203))
                .replace(/@/g, `@` + String.fromCharCode(8203))
                .replace(/\n/g, `\n` + String.fromCharCode(8203))
                .replace(client.config.token, `mfa.VkO_2G4Qv3T-- NO TOKEN HERE --`)

            return t;
        };

        client.snipes = new Map();
        client.editSnipes = new Map();

        client.commands = new discord.Collection();
        client.aliases = new discord.Collection();
        client.categories = fs.readdirSync(`${process.cwd()}/commands/`);

        client.modules.is_url = function(str) {
            let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
            if (regexp.test(str)) {
                return true;
            } else {
                return false;
            };
        };

        client.modules.is_url = function(str) {
            let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
            if (regexp.test(str)) {
                return true;
            } else {
                return false;
            };
        };
    }
}