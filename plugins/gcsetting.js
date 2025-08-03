const { sleep } = require('../lib/functions');
const config = require('../config')
const { cmd, commands } = require('../command')

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
            return reply("This command can only be used in groups.");
        }
        
        const botOwner = conn.user.id.split(":")[0]; 
        if (senderNumber !== botOwner) {
            return reply("Only the bot owner can use this command.");
        }

        reply("Leaving group...");
        await sleep(1500);
        
        // Send status message before leaving
        const status = "Goodbye! 👋";
        await conn.sendMessage(from, { 
            text: status,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363302677217436@newsletter',
                    newsletterName: 'CASEYRHODES-XMD💖',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });
        
        await conn.groupLeave(from);
        
    } catch (e) {
        console.error(e);
        reply(`❌ Error: ${e}`);
    }
});
