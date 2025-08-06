const config = require('../config');
const { cmd } = require('../command');
const { ytsearch } = require('@dark-yasiya/yt-dl.js');
const fetch = require('node-fetch'); // Make sure to install: npm install node-fetch

// MP4 video download
cmd({
    pattern: "mp4",
    alias: ["video7"],
    react: "🎥",
    desc: "Download YouTube video",
    category: "main",
    use: '.mp4 <Youtube URL or Search Query>',
    filename: __filename
}, async (conn, mek, m, { from, prefix, quoted, q, reply }) => {
    try {
        if (!q) return await reply("❌ Please provide a YouTube URL or video name.");

        // Search YouTube
        const yt = await ytsearch(q);
        if (yt.results.length < 1) return reply("🔍 No results found!");

        const yts = yt.results[0];
        const apiUrl = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(yts.url)}`;

        // Fetch video data
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!data?.result?.download_url) {
            return reply("⚠️ Failed to fetch video. Try again later.");
        }

        // Message template
        const ytmsg = `📹 *Video Details*\n
🎬 *Title:* ${yts.title}
⏳ *Duration:* ${yts.timestamp}
👀 *Views:* ${yts.views}
👤 *Author:* ${yts.author.name}
🔗 *Link:* ${yts.url}\n
*Choose format:*\n
1️⃣ *Document* (no preview)
2️⃣ *Normal Video* (with preview)\n
_Reply with 1 or 2_`;

        // Newsletter Context
        const contextInfo = {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363302677217436@newsletter',
                newsletterName: 'CASEYRHODES-XMD',
                serverMessageId: 143
            }
        };

        // Send thumbnail + options
        const videoMsg = await conn.sendMessage(
            from,
            {
                image: { url: yts.thumbnail },
                caption: ytmsg,
                contextInfo
            },
            { quoted: mek }
        );

        // Listener for user's choice (with timeout)
        const choiceHandler = async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (
                !msg?.message?.extendedTextMessage ||
                !msg.message.extendedTextMessage.contextInfo ||
                msg.message.extendedTextMessage.contextInfo.stanzaId !== videoMsg.key.id
            ) return;

            const choice = msg.message.extendedTextMessage.text.trim();
            await conn.sendMessage(from, { react: { text: "⬇️", key: msg.key } });

            try {
                switch (choice) {
                    case "1":
                        await conn.sendMessage(
                            from,
                            {
                                document: { url: data.result.download_url },
                                mimetype: "video/mp4",
                                fileName: `${yts.title}.mp4`,
                                contextInfo // Maintain newsletter context
                            },
                            { quoted: msg }
                        );
                        break;

                    case "2":
                        await conn.sendMessage(
                            from,
                            {
                                video: { url: data.result.download_url },
                                mimetype: "video/mp4",
                                contextInfo // Maintain newsletter context
                            },
                            { quoted: msg }
                        );
                        break;

                    default:
                        await reply("❌ Invalid choice. Reply with *1* or *2*.", { quoted: msg });
                }
            } catch (err) {
                console.error("Download Error:", err);
                await reply("⚠️ Failed to send video. Try again.");
            } finally {
                // Remove listener after handling
                conn.ev.off("messages.upsert", choiceHandler);
            }
        };

        // Activate listener (auto-remove after 60 sec)
        conn.ev.on("messages.upsert", choiceHandler);
        setTimeout(() => conn.ev.off("messages.upsert", choiceHandler), 60000);

    } catch (error) {
        console.error("MP4 Command Error:", error);
        reply("❌ An error occurred. Please try again.");
    }
});
