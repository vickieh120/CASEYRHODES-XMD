const { cmd } = require('../command');

const stylizedChars = {
    a: '🅐', b: '🅑', c: '🅒', d: '🅓', e: '🅔', f: '🅕', g: '🅖',
    h: '🅗', i: '🅘', j: '🅙', k: '🅚', l: '🅛', m: '🅜', n: '🅝',
    o: '🅞', p: '🅟', q: '🅠', r: '🅡', s: '🅢', t: '🅣', u: '🅤',
    v: '🅥', w: '🅦', x: '🅧', y: '🅨', z: '🅩',
    '0': '⓿', '1': '➊', '2': '➋', '3': '➌', '4': '➍',
    '5': '➎', '6': '➏', '7': '➐', '8': '➑', '9': '➒'
};

cmd({
    pattern: "chr",
    alias: ["creact", "channelreact"],
    react: "🔤",
    desc: "React to channel messages with stylized text",
    category: "owner",
    use: '.chr <channel-link> <text>',
    filename: __filename
},
async (conn, mek, m, { from, reply, isCreator, q }) => {
    try {
        // Permission check
        if (!isCreator) {
            return reply("❌ This command is restricted to the bot owner only");
        }

        // Input validation
        if (!q) {
            return reply(`ℹ️ Usage:\n${m.prefix}chr https://whatsapp.com/channel/1234567890 hello`);
        }

        const [link, ...textParts] = q.split(' ');
        
        // Channel link validation
        if (!link.includes("whatsapp.com/channel/")) {
            return reply("❌ Invalid channel link format\nMust contain 'whatsapp.com/channel/'");
        }

        const inputText = textParts.join(' ').toLowerCase();
        if (!inputText.trim()) {
            return reply("❌ Please provide text to convert to emoji reaction");
        }

        // Convert text to stylized emojis
        const emoji = inputText
            .split('')
            .map(char => stylizedChars[char] || char)
            .join('')
            .replace(/\s+/g, '―'); // Replace spaces with long dash

        // Extract channel and message IDs
        const parts = link.split('/');
        const channelId = parts[4];
        const messageId = parts[5]?.split('?')[0];
        
        if (!channelId || !messageId) {
            return reply("❌ Invalid link - missing channel or message ID");
        }

        // Get channel metadata
        let channelMeta;
        try {
            channelMeta = await conn.getNewsletterMetadata({ newsletterJid: `${channelId}@newsletter` });
        } catch (err) {
            return reply("❌ Failed to fetch channel info. Check the link and try again.");
        }

        // Send reaction
        try {
            await conn.sendReactionToNewsletter(
                `${channelId}@newsletter`,
                messageId,
                emoji
            );
        } catch (reactError) {
            console.error("Reaction failed:", reactError);
            return reply("❌ Failed to send reaction. The message may be too old or you may not have permission.");
        }

        // Success response with newsletter context
        const successMsg = `╭━━━〔 *CASEYRHODES-XMD* 〕━━━┈⊷
┃✔ *Success!* Reaction sent
┃
┃📢 *Channel:* ${channelMeta.name || 'Unknown'}
┃🔤 *Reaction:* ${emoji}
┃
┃*Message ID:* ${messageId}
╰────────────────┈⊷
> *© Powered by CASEYRHODES-TECH*`;

        return reply(successMsg, {
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: `${channelId}@newsletter`,
                    newsletterName: channelMeta.name || 'Unknown Channel',
                    serverMessageId: parseInt(messageId)
                }
            }
        });

    } catch (error) {
        console.error("Channel React Error:", error);
        return reply(`❌ Error: ${error.message || "Failed to process request"}`);
    }
});
