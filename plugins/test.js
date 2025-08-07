const { cmd } = require('../command');

cmd({
    pattern: "test",
    alias: [],
    use: '.test',
    desc: "Send audio with image in one message",
    category: "fun",
    react: "🎧",
    filename: __filename
},
async (conn, mek, m, { from, quoted, sender, reply }) => {
    try {
        const songUrls = [
            "https://files.catbox.moe/igdgw1.m4a",
            "https://files.catbox.moe/65csuc.m4a",
            "https://files.catbox.moe/lzgyrl.m4a"
        ];

        if (!songUrls.length) return reply("No audio files available");
        
        const randomUrl = songUrls[Math.floor(Math.random() * songUrls.length)];
        const status = "🎧 *Enjoy this special audio!* 🎶\n\n_From Casey Rhodes Newsletter_";

        await conn.sendMessage(from, {
            image: { url: "https://i.ibb.co/wN6Gw0ZF/lordcasey.jpg" },
            caption: status,
            audio: { url: randomUrl },
            mimetype: 'audio/mp4',
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363302677217436@newsletter',
                    newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐀𝐋𝐈𝐕𝐄🍀',
                    serverMessageId: 143
                }
            }
        }, { 
            quoted: mek,
            ephemeralExpiration: 86400, // 24 hours
            mediaUploadTimeoutMs: 60000 // 1 minute upload timeout
        });

    } catch (e) {
        console.error("Error in test command:", e);
        reply(`❌ Error: ${e.message}\n\nPlease try again later.`);
    }
});
