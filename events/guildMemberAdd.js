const db = require(`${require(`${process.cwd()}/config.json`).custom_db ? `${process.cwd()}/modules/db.js` : `quick.db`}`);
const Discord = require("discord.js");
const Canvas = require('canvas');
const chalk = require("chalk");
const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');
	let fontSize = 70;

	do {
		ctx.font = `${fontSize -= 10}px sans-serif`;
	} while (ctx.measureText(text).width > canvas.width - 300);

	return ctx.font;
};

function remove (str, startIndex, count) {
    return str.substr(0, startIndex) + str.substr(startIndex + count);
};

let sizeX = 1100;
let sizeY = 500;

let textStyle = "black",
	bgStyle = "00ffffff",
	memTextStyle = "white",
	memNumStyle = "#B8B6B7",
	usrBarOpacity = 55;

module.exports = async (client, member) => {
	let settings = db.get(`settings${member.guild.id}`);

	try {
        settings.welcomeChannel
    } catch (e) {
        if (e) {
            settings = {};
			settings.welcomeChannel = null;

            await db.set(`settings${member.guild.id}`, settings);
            settings = await db.get(`settings${member.guild.id}`);
        };
	};
	
	let channel = member.guild.channels.cache.find(ch => ch.id === settings.welcomeChannel);
	
	const canvas = Canvas.createCanvas(sizeX, sizeY);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage(`${process.cwd()}/assets/join.png`);
	const usrbar = await Canvas.loadImage(`${process.cwd()}/assets/usrbar.png`);

	ctx.drawImage(background, 0, 0, sizeX, sizeY);

	ctx.save();
		ctx.globalAlpha = usrBarOpacity / 100;
		ctx.drawImage(usrbar, Math.floor(sizeX / 29), Math.floor(sizeY / 10.4), sizeX - Math.floor(sizeX / 29)*2, sizeY - Math.floor(sizeY / 10.4)*2);
	ctx.restore();

	ctx.strokeStyle = bgStyle;
	ctx.strokeRect(0, 0, sizeX, sizeY);

	ctx.font = `30px sans-serif`;
	ctx.fillStyle = memTextStyle;
	ctx.fillText(`${member.user.username}#${member.user.discriminator} just joined the server`, sizeX/2 - ctx.measureText(`${member.user.username}#${member.user.discriminator} just joined the server`).width/2, sizeY / 1.41);

	ctx.font = `30px sans-serif`;
	ctx.fillStyle = memNumStyle;
	ctx.fillText(`Member #${member.guild.memberCount}`, sizeX/2 - ctx.measureText(`Member #${member.guild.memberCount}`).width/2, sizeY / 1.21);

	let avatarSizeX = Math.floor(sizeX / 5.5),
		avatarSizeY = Math.floor(sizeY / 2.5),
		avatarX = Math.floor(sizeX / 2) - Math.floor(avatarSizeX / 2),
		avatarY = Math.floor(sizeY / 6.7),
		circleOffset = 0;

	ctx.beginPath();
		ctx.strokeStyle = "white";
		ctx.lineWidth = 7;
		ctx.arc((avatarX + 100) - circleOffset, (avatarY + 100) - circleOffset*2, avatarSizeX / 2, 0, Math.PI * 2, true);
		ctx.stroke();
	ctx.closePath();

	ctx.beginPath();
		ctx.arc(avatarX + 100, avatarY + 100, avatarSizeX / 2, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'png' }));

	ctx.drawImage(avatar, avatarX, avatarY, avatarSizeX, avatarSizeY);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'card.png');

	try {
		channel.send(`Welcome to **${member.guild.name}**, ${member}!`, attachment);
        } catch (e) {
            if (e) {
                return 1+1;
            } else {
                return 1+1;
            };
        };
};