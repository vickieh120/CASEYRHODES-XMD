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
        await conn.groupLeave(from);
        
        // Send status message with image before leaving
        const status = "Goodbye! 👋";
        await conn.sendMessage(from, { 
            image: { url: `https://i.ibb.co/8gHCXCV9/IMG-20250216-WA0009.jpg` },  
            caption: status,
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
        
    } catch (e) {
        console.error(e);
        reply(`❌ Error: ${e}`);
    }
});
