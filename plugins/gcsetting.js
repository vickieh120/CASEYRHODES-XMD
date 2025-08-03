const { sleep } = require('../lib/functions');
const config = require('../config')
const { cmd, commands } = require('../command')

// Helper function for newsletter context
const addNewsletterContext = (messageOptions = {}, quoted) => {
    return {
        ...messageOptions,
        contextInfo: {
            mentionedJid: [quoted?.sender || messageOptions.mentionedJid || []],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363302677217436@newsletter',
                newsletterName: 'CASEYRHODES-XMD',
                serverMessageId: 999
            }
        }
    };
};

cmd({
    pattern: "leave",
    alias: ["left", "leftgc", "leavegc"],
    desc: "Leave the group",
    react: "🎉",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup, senderNumber, reply
}) => {
    try {
        if (!isGroup) {
            return reply("This command can only be used in groups.", null, addNewsletterContext({}, m));
        }
        
        const botOwner = conn.user.id.split(":")[0]; 
        if (senderNumber !== botOwner) {
            return reply("Only the bot owner can use this command.", null, addNewsletterContext({}, m));
        }

        await reply("Leaving group...", null, addNewsletterContext({}, m));
        await sleep(1500);
        
        // Send goodbye message before leaving
        await conn.sendMessage(from, addNewsletterContext({
            image: { url: `https://i.ibb.co/m5Bcq64y/caseyrhodes-tech.jpg` },
            caption: "Goodbye! 👋"
        }, m), { quoted: mek });

        await conn.groupLeave(from);

    } catch (e) {
        console.error(e);
        reply(`❌ Error: ${e}`, null, addNewsletterContext({}, m));
    }
});
