const { cmd } = require('../command');

cmd({
    pattern: "test",
    alias: [],
    use: '.test',
    desc: "Send a random voice note with image.",
    category: "fun",
    react: "🎙️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, sender, reply }) => {
    try {
        const songUrls = [
            "https://files.catbox.moe/igdgw1.m4a",
            "https://files.catbox.moe/65csuc.m4a",
            "https://files.catbox.moe/lzgyrl.m4a"
        ];

        if (!songUrls.length) return reply("No audio URLs configured.");

        const randomUrl = songUrls[Math.floor(Math.random() * songUrls.length)];
        const status = "🎧 *Here's a special audio for you!* 🎶\n\n_From Casey Rhodes Newsletter_";

        // First send the image with caption
        await conn.sendMessage(from, {
            image: { url: "https://i.ibb.co/wN6Gw0ZF/lordcasey.jpg" },
            caption: status,
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
        }, { quoted: mek });

        // Then send the audio
        await conn.sendMessage(from, {
            audio: { url: randomUrl },
            mimetype: 'audio/mp4',
            ptt: false
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in test command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
