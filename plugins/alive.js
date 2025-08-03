const { cmd } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');

cmd({
    pattern: "alive",
    alias: ["av", "runtime", "uptime"],
    desc: "Check uptime and system status",
    category: "main",
    react: "📟",
    filename: __filename
},
async (conn, mek, _, { from, sender, reply }) => {
    try {
        // System information
        const platform = "Heroku Platform";
        const totalMem = (os.totalmem() / 1024 / 1024).toFixed(2);
        const usedMem = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);

        // Status message template
        const status = `╭───❰ *𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐗𝐌𝐃* ❱──┈⊷
┃ *✨𝖴ᴘᴛɪᴍᴇ* : *${runtime(process.uptime())}*
┃ *💾 𝖱ᴀᴍ ᴜsᴀɢᴇ* : *${usedMem}MB / ${totalMem}MB*
┃ *🧑‍💻𝖣ᴇᴘʟᴏʏᴇᴅ ᴏɴ* : *${platform}*
┃ *👨‍💻𝖮ᴡɴᴇʀ* : *𝖬ʀ ᴄᴀsᴇʏʀʜᴏᴅᴇs*
┃ *🧬𝖵ᴇʀsɪᴏɴ* : *𝟣.𝟢.𝟢 𝖡𝖤𝖳𝖠*
╰──────────────────────┈⊷
> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄᴀsᴇʏʀʜᴏᴅᴇs`;

        // Verified contact card
        const verifiedContact = {
            displayName: "Caseyrhodes Verified✅",
            vcard: `BEGIN:VCARD
VERSION:3.0
FN:Caseyrhodes Verified✅
ORG:CASEYRHODES TEAM;
TEL;type=CELL;type=VOICE;waid=254701234567:+254701234567
END:VCARD`
        };

        // Send status message with contact card
        await conn.sendMessage(from, {
            text: status,
            contacts: {
                displayName: "Caseyrhodes Contacts",
                contacts: [verifiedContact]
            },
            contextInfo: {
                mentionedJid: [sender],
                externalAdReply: {
                    title: 'CASEYRHODES XMD IS ALIVE',
                    body: '© CASEYRHODES Tᴇᴄʜ ♡',
                    mediaType: 1,
                    thumbnailUrl: 'https://i.imgur.com/your-image.jpg', // Replace with actual URL
                    sourceUrl: 'https://whatsapp.com/channel/0029VbANWX1DuMRi1VNPlB0y'
                }
            }
        }, { quoted: mek });

        // Send audio as voice note
        await conn.sendMessage(from, { 
            audio: { url: 'https://files.catbox.moe/5df4ei.m4v' },
            mimetype: 'audio/mp4',
            ptt: true 
        }, { quoted: mek });

    } catch (e) {
        console.error("Alive Command Error:", e);
        reply(`🚨 Error: ${e.message}`);
    }
});
