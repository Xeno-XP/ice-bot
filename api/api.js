const { isUndefined, isNullOrUndefined } = require('util');
const mute = require('../commands/moderation/mute');

module.exports = async (client) => {
    const fs = require('fs');
    const http = require('http');
    const express = require('express');
    const app = express();
    const bodyParser = require('body-parser');
    const db = require(`${process.cwd()}/modules/db.js`);
    const PORT = process.env.PORT || client.config.port;
    const config = require('../config.json');

    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.use(express.static(process.cwd() + './frontend'));

    const httpServer = http.createServer(app);

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());

    app.get('/getSettings/:guildID', async function (req, res) {
        let settings = await db.get(`settings${req.params.guildID}`);

        if(!settings) { await db.set(`settings${req.params.guildID}`, new client.guildSettings()); settings = await db.get(`settings${req.params.guildID}`); }

        settings.defaults = config;

        settings.defaultConstructor = new client.guildSettings();

        res.json(settings);

        res.status(200);
        res.end();
    });

    app.get('/getCommands', async function (req, res) {
        const requestData = req.body;
        let commands = client.commands;

        res.json(commands)
        res.status(200);
        res.end();
    });

    app.post('/updateSettings', async function (req, res) {
        const requestData = req.body;

        db.set(`settings${requestData.guild}`, requestData.settings);

        res.status(200);
        res.end();
    });

    app.post('/resetSettings', async function (req, res) {
        const requestData = req.body;

        db.delete(`settings${requestData.guild}`);

        res.status(200);
        res.end();
    });

    app.post('/unmute', async function (req, res) {
        const requestData = req.body;
        let mutedata = await client[`mute${requestData.guild}${requestData.user}`];
        let status = { status: false, username: null };
        
        if (typeof mutedata == "undefined") {
            return res.end(JSON.stringify(status));
        }

        try {
            if(!mutedata.user.roles.cache.has(mutedata.role.id)) {
                status.status = false; status.username = null;
            };
        } catch (e) {
            status.status = false; status.username = null;
        }

        await mutedata.user.roles.remove(mutedata.role.id).catch((e) => {
            status.status = false; status.username = null;
            res.end(JSON.stringify(status));
        });

        status.status = true; status.username = mutedata.user.user.username;

        if (status.status) {
            res.end(JSON.stringify(status));
            setTimeout(() => {
                delete client[`mute${requestData.guild}${requestData.user}`];
            }, 500)
        } else {
            res.end(JSON.stringify(status));
        }
    });

    app.post('/clearinfractions', async function (req, res) {
        const requestData = req.body;
        let warns = db.get(`warns${requestData.guild}${requestData.user}`);
        let status = { status: false, username: null };
        let warnUser = await client.users.cache.get(requestData.user);

        try {
            warnUser.username
        } catch (e) {
            if (e) {
                status.status = false;
                status.username = null;
            };
        };

        if (warns) {
            try {
                db.delete(`warns${requestData.guild}${requestData.user}`);
                status.status = true,
                status.username = warnUser.username;
            } catch (e) {
                if (e) {
                    status.status = false,
                    status.username = null;
                }
            }

            res.end(JSON.stringify(status));
        } else {
            res.end(JSON.stringify(status));
        }
    });

    app.post('/clearinfractions', async function (req, res) {
        const requestData = req.body;
        let warns = db.get(`warns${requestData.guild}${requestData.user}`);
        let status = { status: false, username: null };
        let warnUser = await client.users.cache.get(requestData.user);

        try {
            warnUser.username
        } catch (e) {
            if (e) {
                status.status = false;
                status.username = null;
            };
        };

        if (warns) {
            try {
                db.delete(`warns${requestData.guild}${requestData.user}`);
                status.status = true,
                status.username = warnUser.username;
            } catch (e) {
                if (e) {
                    status.status = false,
                    status.username = null;
                }
            }

            res.end(JSON.stringify(status));
        } else {
            res.end(JSON.stringify(status));
        }
    });

    app.post('/getPremiumCode', async function (req, res) {
        const requestData = req.body;

        try {
            requestData.duration
        } catch (e) {
            if (e) {
                return res.end(JSON.stringify("Invalid Arguments."));
            };
        };

        let codes = require(`${process.cwd()}/storage/premiumCodes.json`);
        let duration = Infinity;
        let randomCode = client.getRandomCode();
        
        try {
            codes.push
        } catch (e) {
            if (e) {
                fs.writeFile(`${process.cwd()}/storage/premiumCodes.json`, JSON.stringify([], null, 4), "UTF-8", (err) => {
                    if (err) throw err;
                });

                codes = require(`${process.cwd()}/storage/premiumCodes.json`);
            };
        };

        while (client.mapCodes(codes).includes(randomCode)) {
            randomCode = client.getRandomCode();
        };
        
        if (requestData.duration == Infinity ||
        requestData.duration == 1 ||
        requestData.duration == 2 ||
        requestData.duration == 3) {
            duration = requestData.duration;
        };

        codes.push({ code: randomCode, duration: duration });

        fs.writeFile(`${process.cwd()}/storage/premiumCodes.json`, JSON.stringify(codes, null, 4), "UTF-8", (err) => {
            if (err) throw err;
        });

        return res.end(JSON.stringify(randomCode));
    });

    httpServer.listen(PORT);
};