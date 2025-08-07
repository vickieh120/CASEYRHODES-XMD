const config = require('../config');
const { cmd, commands } = require('../command');

// Verification contact details (reusable object)
const verifiedContact = {
    key: {
        fromMe: false,
        participant: `0@s.whatsapp.net`,
        remoteJid: "status@broadcast"
    },
    message: {
        contactMessage: {
            displayName: "CASEYRHODES VERIFIED ✅",
            vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:Caseyrhodes VERIFIED ✅\nORG:CASEYRHODES-TECH BOT;\nTEL;type=CELL;type=VOICE;waid=254112192119:+254112192119\nEND:VCARD`
        }
    }
};

cmd({
    pattern: "ping",
    alias: ["speed", "pong"],
    use: '.ping',
    desc: "Check bot's response time.",
    category: "main",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, quoted, sender, reply }) => {
    try {
        const start = Date.now();
        
        // Emoji collections
        const reactionEmojis = ['🔥', '⚡', '🚀', '💨', '🎯', '🎉', '🌟', '💥', '🕐', '🔹'];
        const textEmojis = ['💎', '🏆', '⚡️', '🚀', '🎶', '🌠', '🌀', '🔱', '🛡️', '✨'];
        
        // Select distinct emojis
        let reactionEmoji, textEmoji;
        do {
            reactionEmoji = reactionEmojis[Math.floor(Math.random() * reactionEmojis.length)];
            textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];
        } while (reactionEmoji === textEmoji);

        // Send reaction
        await conn.sendMessage(from, {
            react: { text: reactionEmoji, key: mek.key }
        });

        // Calculate response time
        const responseTime = (Date.now() - start) / 1000;
        
        // Prepare response with verification context
        const responseText = `> *𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒-𝐗𝐌𝐃: ${responseTime.toFixed(2)}ms ${textEmoji}*`;
        
        await conn.sendMessage(from, {
            text: responseText,
            contacts: { contacts: [verifiedContact] },
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363302677217436@newsletter',
                    newsletterName: "ᴄᴀsᴇʏʀʜᴏᴅᴅᴇs-xᴍᴅ 👻",
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Ping command error:", e);
        reply(`❌ Error: ${e.message}`);
    }
});

cmd({
    pattern: "ping2",
    desc: "Check bot's response time with simple method.",
    category: "main",
    react: "🍂",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const startTime = Date.now();
        const message = await conn.sendMessage(from, { 
            text: '*PINGING...*',
            contacts: { contacts: [verifiedContact] } 
        });
        
        const ping = Date.now() - startTime;
        await conn.sendMessage(from, { 
            text: `*🔥 CASEYRHODES-XMD SPEED: ${ping}ms*`,
            contacts: { contacts: [verifiedContact] }
        }, { quoted: message });
        
    } catch (e) {
        console.error("Ping2 error:", e);
        reply(`❌ Error: ${e.message}`);
    }
});
