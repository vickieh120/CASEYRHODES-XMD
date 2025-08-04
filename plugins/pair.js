const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "pair",
    alias: ["getpair", "clonebot"],
    react: "✅",
    desc: "Get pairing code for PK-XMD bot",
    category: "download",
    use: ".pair 254700123456",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, args, q, senderNumber, reply }) => {
    try {
        const phoneNumber = q ? q.trim().replace(/[^0-9]/g, '') : senderNumber.replace(/[^0-9]/g, '');

        if (!phoneNumber || phoneNumber.length < 10 || phoneNumber.length > 15) {
            return await reply("❌ Please provide a valid phone number without `+`\nExample: `.pair 254700123456`");
        }

        const res = await axios.get(`https://pk-v33i.onrender.com/code?number=${encodeURIComponent(phoneNumber)}`);
        if (!res.data || !res.data.code) {
            return await reply("❌ Failed to retrieve pairing code. Please try again later.");
        }

        const pairingCode = res.data.code;

        const codeMessage = `
╭─〔 *CASEYRHODES-XMD PAIRING SUCCESSFUL* 〕
│
├─ *📱 Number:* ${phoneNumber}
├─ *🔗 Pairing Code:* ${pairingCode}
│
╰─ *🚀 Powered by Caseyrhodes tech
`.trim();

        await conn.sendMessage(from, {
            image: { url: `https://files.catbox.moe/9pxerh.jpg` },
            caption: codeMessage,
            footer: 'Tap below to get code again for copying:',
            templateButtons: [
                {
                    index: 1,
                    quickReplyButton: {
                        displayText: "📋 Copy Code",
                        id: `.copy ${pairingCode}`
                    }
                }
            ]
        }, { quoted: mek });

        // Send image + caption
        await conn.sendMessage(from, { 
            image: { url: `https://i.ibb.co/wN6Gw0ZF/lordcasey.jpg` },  
            caption: "Pairing successful!",
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true
            }
        }, { quoted: mek });

        // Send audio
        await conn.sendMessage(from, { 
            audio: { url: 'https://files.catbox.moe/dcxfi1.mp3' },
            mimetype: 'audio/mp4',
            ptt: true 
        }, { quoted: mek });

    } catch (error) {
        console.error("❌ Pair command error:", error);
        await reply("❌ Error retrieving pairing code. Try again later.");
    }
});
