const { cmd } = require('../command');
const { ytsearch } = require('@dark-yasiya/yt-dl.js');
const fetch = require('node-fetch');

// MP4 video download command
cmd({
    pattern: "mp4",
    alias: ["videos"],
    react: "🎥",
    desc: "Download YouTube video",
    category: "main",
    use: '.mp4 <YouTube URL or search term>',
    filename: __filename
}, async (conn, mek, m, { from, prefix, quoted, q, reply }) => {
    try {
        if (!q) return await reply("Please provide a YouTube URL or search term.");

        // Search YouTube
        let yt;
        try {
            yt = await ytsearch(q);
            if (!yt.results || yt.results.length === 0) {
                return reply("No videos found for your search.");
            }
        } catch (searchError) {
            console.error("YouTube search error:", searchError);
            return reply("Failed to search YouTube. Please try again.");
        }

        const yts = yt.results[0];
        const apiUrl = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(yts.url)}`;

        // Fetch video download link
        let data;
        try {
            const response = await fetch(apiUrl);
            data = await response.json();
            if (!data?.result?.download_url) {
                throw new Error("Invalid API response");
            }
        } catch (apiError) {
            console.error("API fetch error:", apiError);
            return reply("Failed to fetch video. The service might be down.");
        }

        // Prepare message with newsletter context
        const ytmsg = `📹 *Video Details*\n\n` +
                     `🎬 *Title:* ${yts.title}\n` +
                     `⏳ *Duration:* ${yts.timestamp}\n` +
                     `👀 *Views:* ${yts.views}\n` +
                     `👤 *Author:* ${yts.author.name}\n` +
                     `🔗 *Link:* ${yts.url}\n\n` +
                     `*Choose download format:*\n` +
                     `1. 📄 Document (no preview)\n` +
                     `2. ▶️ Normal Video (with preview)\n\n` +
                     `_Reply with 1 or 2_`;

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

        // Send the video options
        let videoMsg;
        try {
            videoMsg = await conn.sendMessage(
                from,
                {
                    image: { url: yts.thumbnail },
                    caption: ytmsg,
                    contextInfo
                },
                { quoted: mek }
            );
        } catch (sendError) {
            console.error("Message send error:", sendError);
            return reply("Failed to send video options. Please try again.");
        }

        // Set up reply handler
        const choiceHandler = async (msgUpdate) => {
            try {
                const msg = msgUpdate.messages[0];
                
                // Check if this is a reply to our message
                if (!msg?.message?.extendedTextMessage?.contextInfo || 
                    msg.message.extendedTextMessage.contextInfo.stanzaId !== videoMsg.key.id) {
                    return;
                }

                const choice = msg.message.extendedTextMessage.text.trim();
                await conn.sendMessage(from, { react: { text: "⬇️", key: msg.key } });

                // Remove listener immediately to prevent multiple triggers
                conn.ev.off("messages.upsert", choiceHandler);

                switch (choice) {
                    case "1":
                        await conn.sendMessage(
                            from,
                            {
                                document: { url: data.result.download_url },
                                mimetype: "video/mp4",
                                fileName: `${yts.title}.mp4`.replace(/[^\w\s.-]/gi, ''),
                                contextInfo
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
                                caption: yts.title,
                                contextInfo
                            },
                            { quoted: msg }
                        );
                        break;

                    default:
                        await reply("Invalid choice. Please reply with 1 or 2.", { quoted: msg });
                }
            } catch (handlerError) {
                console.error("Handler error:", handlerError);
                await reply("An error occurred while processing your request.", { quoted: msgUpdate.messages[0] });
            }
        };

        // Add listener with timeout
        conn.ev.on("messages.upsert", choiceHandler);
        
        // Auto-remove listener after 2 minutes
        setTimeout(() => {
            conn.ev.off("messages.upsert", choiceHandler);
        }, 120000);

    } catch (error) {
        console.error("Global error:", error);
        reply("An unexpected error occurred. Please try again later.");
    }
});
