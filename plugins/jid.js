const { cmd } = require('../command');

cmd({
    pattern: "jid",
    desc: "Get the JID of the user or group.",
    react: "📍",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Check if the user has the necessary permissions (Owner or Admin)
        if (!isGroup && !isOwner) {
            return reply("⚠️ Only the bot owner or group admins can use this command.");
        }

        // If it's a group, reply with the group JID
        if (isGroup) {
            await conn.sendMessage(from, {
                text: `Group JID: *${from}*`,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363302677217436@newsletter',
                        newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐓𝐄𝐂𝐇',
                        serverMessageId: 143
                    }
                }
            });
            return;
        }

        // If it's a personal chat, reply with the user's JID
        if (!isGroup) {
            await conn.sendMessage(from, {
                text: `User JID: *${sender}@s.whatsapp.net*`,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363302677217436@newsletter',
                        newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐓𝐄𝐂𝐇',
                        serverMessageId: 143
                    }
                }
            });
            return;
        }

    } catch (e) {
        console.error("Error:", e);
        reply(`❌ An error occurred: ${e.message}`);
    }
});
