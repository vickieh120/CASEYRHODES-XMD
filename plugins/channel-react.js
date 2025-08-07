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
async (conn, mek, m, { from, reply, isCreator, q, prefix }) => {
    try {
        // Permission check
        if (!isCreator) {
            return reply("❌ This command is restricted to the bot owner only");
        }

        // Input validation
        if (!q) {
            return reply(`ℹ️ Usage:\n${prefix}chr https://whatsapp.com/channel/1234567890 hello`);
        }

        const [link, ...textParts] = q.split(' ');
        
        // Channel link validation
        const channelMatch = link.match(/whatsapp\.com\/channel\/([^\/]+)\/(\d+)/);
        if (!channelMatch) {
            return reply("❌ Invalid channel link format\nMust be: https://whatsapp.com/channel/CHANNEL_ID/MESSAGE_ID");
        }

        const channelId = channelMatch[1];
        const messageId = channelMatch[2];
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

        // Verify channel exists
        const newsletterJid = `${channelId}@newsletter`;
        try {
            await conn.onWhatsApp(newsletterJid);
        } catch (err) {
            return reply("❌ Channel not found or inaccessible");
        }

        // Send reaction using the correct API method
        try {
            await conn.sendMessage(newsletterJid, {
                react: {
                    text: emoji,
                    key: {
                        id: messageId,
                        remoteJid: newsletterJid,
                        fromMe: false
                    }
                }
            });
        } catch (reactError) {
            console.error("Reaction Error:", reactError);
            return reply("❌ Failed to send reaction. Possible reasons:\n- Message too old\n- Invalid permissions\n- Channel not accessible");
        }

        // Success response
        const successMsg = `╭━━━〔 *CASEYRHODES-XMD* 〕━━━┈⊷
┃✔ *Success!* Reaction sent
┃
┃📢 *Channel ID:* ${channelId}
┃🔤 *Reaction:* ${emoji}
┃
┃*Message ID:* ${messageId}
╰────────────────┈⊷
> *© Powered by CASEYRHODES-TECH*`;

        return reply(successMsg);

    } catch (error) {
        console.error("Channel React Error:", error);
        return reply(`❌ Error: ${error.message || "Failed to process request"}`);
    }
});
