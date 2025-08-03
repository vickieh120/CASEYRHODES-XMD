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
async (conn, mek, m, { from, sender, reply }) => {
    try {
        // System information
        const platform = "Heroku Platform";
        const release = os.release();
        const cpuModel = os.cpus()[0].model;
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
> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄᴀsᴇʏʀʜᴏᴅᴇs ᴛᴇᴄʜ`;

        // Verified contact template
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

        // Send image with caption
        await conn.sendMessage(from, {
            image: { url: `https://i.ibb.co/wN6Gw0ZF/lordcasey.jpg` },
            caption: status,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                externalAdReply: {
                    title: "𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐀𝐋𝐈𝐕𝐄🍀",
                    body: "Powered by Casey Rhodes Tech",
                    mediaType: 1,
                    thumbnailUrl: "https://i.ibb.co/wN6Gw0ZF/lordcasey.jpg",
                    mediaUrl: "",
                    sourceUrl: "",
                    showAdAttribution: true
                }
            }
        }, { quoted: verifiedContact });

        // Send audio separately
        await conn.sendMessage(from, {
            audio: { url: 'https://files.catbox.moe/dcxfi1.mp3' },
            mimetype: 'audio/mpeg',
            ptt: true
        }, { quoted: verifiedContact });

    } catch (e) {
        console.error("Error in alive command:", e);
        reply(`🚨 *An error occurred:* ${e.message}`);
    }
});
