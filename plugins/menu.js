const config = require('../config');
const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const getRandomImage = () => {
    try {
        const srcPath = path.join(__dirname, '../src');
        const files = fs.readdirSync(srcPath);
        const imageFiles = files.filter(file => 
            file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.jpeg')
        );
        
        if (imageFiles.length === 0) {
            console.log('No image files found in src folder');
            return 'https://files.catbox.moe/wklbg4.jpg'; 
        }
        
        const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];
        return path.join(srcPath, randomImage);
    } catch (e) {
        console.log('Error getting random image:', e);
        return 'https://files.catbox.moe/wklbg4.jpg'; 
    }
};

const buttonsMain = [
    { buttonId: '.ownerbtn', buttonText: { displayText: '𝚩𝚯𝚻𝐒 𝚯𝐖𝚴𝚵𝚪𝐒' }, type: 1 },
    { buttonId: '.channel', buttonText: { displayText: '📢 CHANNEL' }, type: 1 },
    { buttonId: '.download', buttonText: { displayText: '⬇️ DOWNLOAD MENU' }, type: 1 }
];

const buttonsOwner = [
    { buttonId: '.botowner', buttonText: { displayText: '𝐎𝐖𝐍𝐄𝐑=𝐌' }, type: 1 },
    { buttonId: '.friends', buttonText: { displayText: '𝐅𝐑𝐈𝐄𝐍𝐃𝐒=𝐌' }, type: 1 }
];

cmd({
    pattern: "menu",
    desc: "menu the bot",
    category: "menu",
    react: "🐇",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `🌟 *Good ${new Date().getHours() < 12 ? 'Morning' : 'Night'}, ${pushname}!* 🌟
              
╭━━━《 𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐗𝐌𝐃 》━━━┈⊷
┃❍⁠⁠⁠⁠╭──────────────
┃❍⁠⁠⁠⁠│▸  Usᴇʀ : ${pushname}!* 🌟
┃❍⁠⁠⁠⁠│▸  ʙᴀɪʟᴇʏs : 𝐌𝐮𝐥𝐭𝐢 𝐝𝐞𝐯𝐢𝐜𝐞
┃❍⁠⁠⁠⁠│▸  𝖳ʏᴘᴇ : 𝐍𝐨𝐝𝐞𝐣𝐬
┃❍⁠⁠⁠⁠│▸  ᴛᴏᴛᴀʟ ᴘʟᴜɢɪɴs: *${commands.length}*
┃❍⁠⁠⁠⁠│▸  ᴘʟᴀᴛғᴏʀᴍ : 𝐇𝐞𝐫𝐨𝐤𝐮
┃❍⁠⁠⁠⁠│▸  𝖣ᴇᴠᴇʟᴏᴘᴇʀ : ᴄᴀsᴇʏʀʜᴏᴅᴇs ᴛᴇᴄʜ
┃❍⁠⁠⁠⁠│▸  �𝖬ᴏᴅᴇ : [${config.MODE}]
┃❍⁠⁠⁠⁠│▸  𝖯ʀᴇғɪx : [${config.PREFIX}]
┃❍⁠⁠⁠⁠│▸  𝖵ᴇʀsɪᴏɴ : 𝟏.𝟎.𝟎
┃❍⁠⁠⁠⁠╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
╭━━〔 𝐌𝐄𝐍𝐔𝐋𝐈𝐒𝐓 〕━━┈⊷
┃❍╭─────────────·
┃❍┃• ᴘʀᴀʏᴇʀᴛɪᴍᴇ
┃❍┃• ϙᴜʀᴀɴᴍᴇɴᴜ
┃❍┃• ᴀɪᴍᴇɴᴜ
┃❍┃• ᴀɴɪᴍᴇᴍᴇɴᴜ
┃❍┃• ᴄᴏɴᴜᴇʀᴛᴍᴇɴᴜ
┃❍┃• ғᴜɴᴍᴇɴᴜ
┃❍┃• ʀᴇᴀᴄᴛɪᴏɴᴍᴇɴᴜ
┃❍┃• ᴅʟᴍᴇɴᴜ
┃❍┃• sᴇᴛᴛɪɴɢᴍᴇɴᴜ
┃❍┃• ʟɪsᴛᴄᴍᴅ
┃❍┃• ᴍᴀɪɴᴍᴇɴᴜ
┃❍┃• ᴛᴇᴍᴘᴍᴀɪʟ
┃❍┃• ɢʀᴏᴜᴘᴍᴇɴᴜ
┃❍┃• ᴀʟʟᴍᴇɴᴜ
┃❍┃• ʙɪʙʟᴇʟɪsᴛ
┃❍┃• ᴏᴛʜᴇʀᴍʀɴᴜ
┃❍┃• ᴏᴡɴᴇʀᴍᴇɴᴜ
┃❍┃• ʟᴏɢᴏ<𝐭𝐞𝐱𝐭>
┃❍┃• ʀᴇᴘᴏ
┃❍┃• ʟᴏɢᴏᴍᴇɴᴜ
┃❍┃• ᴍᴘᴇsᴀᴍᴇɴᴜ
┃❍┃• ᴀᴅᴜʟᴛᴍᴇɴᴜ
┃❍└───────────┈⊷
╰──────────────┈⊷
> ${config.DESCRIPTION}`;

        const verifiedContact = {
            key: {
                fromMe: false,
                participant: '0@s.whatsapp.net',
                remoteJid: 'status@broadcast'
            },
            message: {
                contactMessage: {
                    displayName: "Caseyrhodes Verified✅",
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:Caseyrhodes Verified✅\nORG:CASEYRHODES TEAM;\nTEL;type=CELL;type=VOICE;waid=254701234567:+254701234567\nEND:VCARD`
                }
            }
        };

        await conn.sendMessage(
            from,
            {
                image: { url: getRandomImage() },
                caption: dec,
                footer: 'Powered by CaseyRhodes Tech 👻',
                buttons: buttonsMain,
                headerType: 4,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363302677217436@newsletter',
                        newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒-𝐗𝐌𝐃👻⚡',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: verifiedContact }
        );

        const audioUrls = [
            'https://files.catbox.moe/m0xfku.mp3',
            'https://files.catbox.moe/8stziq.mp3',
            'https://files.catbox.moe/3au05j.m4a',
            'https://files.catbox.moe/dcxfi1.mp3',
            'https://files.catbox.moe/ebkzu5.mp3',
            'https://files.catbox.moe/xsa1ig.mp3',
            'https://files.catbox.moe/iq4ouj.mp3',
            'https://files.catbox.moe/wtux78.mp3'
        ];
        const randomAudioUrl = audioUrls[Math.floor(Math.random() * audioUrls.length)];

        await conn.sendMessage(from, {
            audio: { url: randomAudioUrl },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: verifiedContact });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

cmd({
    pattern: "owner",
    desc: "Show owner information",
    category: "info",
    react: "👑"
}, async (conn, mek, m, { from, pushname, reply }) => {
    try {
        await conn.sendMessage(from, {
            text: '👑 *Select Owner Info*',
            buttons: buttonsOwner,
            footer: 'CaseyRhodes Tech 👻',
            headerType: 1
        }, { quoted: m });
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

cmd({
    pattern: "botowner",
    desc: "Show bot owner contact",
    category: "info",
    react: "👨‍💻"
}, async (conn, mek, m, { from, reply }) => {
    try {
        await conn.sendMessage(from, {
            contacts: {
                displayName: "𝐎𝐖𝐍𝐄𝐑",
                contacts: [{
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒\nTEL:+25413345666777\nEND:VCARD`
                }]
            }
        }, { quoted: m });
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

cmd({
    pattern: "friends",
    desc: "Show friends contacts",
    category: "info",
    react: "👥"
}, async (conn, mek, m, { from, reply }) => {
    try {
        await conn.sendMessage(from, {
            contacts: {
                displayName: "𝐅𝐑𝐈𝐄𝐍𝐃𝐒",
                contacts: [
                    { vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:𝚳𝐔𝐋𝐋𝚵𝚪 𝐃𝚵𝛁\nTEL:+254705101667\nEND:VCARD` },
                    { vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:𝐃𝐘𝐒𝐎𝐍𝐒𝐊𝐘\nTEL:+254114468030\nEND:VCARD` },
                    { vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:GPT AI\nTEL:+000000000000\nEND:VCARD` }
                ]
            }
        }, { quoted: m });
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
