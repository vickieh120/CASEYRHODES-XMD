cmd({
    pattern: "promote",
    alias: ["p", "admin", "makeadmin"],
    desc: "Promotes a member to group admin",
    category: "admin",
    react: "⬆️",
    filename: __filename
},
async(conn, mek, m, {
    from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator, isDev, isAdmins, reply
}) => {
    try {
        if (!isGroup) return reply("❌ This command can only be used in groups.");
        if (!isAdmins) return reply("❌ Only group admins can use this command.");
        if (!isBotAdmins) return reply("❌ I need to be an admin to use this command.");

        let jid;
        // Extract JID from mentions, quoted message, or arguments
        if (m?.message?.extendedTextMessage?.contextInfo?.mentionedJid?.length > 0) {
            jid = m.message.extendedTextMessage.contextInfo.mentionedJid[0];
        } else if (quoted) {
            jid = quoted.sender;
        } else if (args[0]?.match(/\d+/) || q?.match(/\d+/)) {
            jid = (args[0] || q).replace(/[^0-9]/g, '') + '@s.whatsapp.net';
        } else {
            return reply("❌ Please reply to a user, mention someone, or provide a phone number.");
        }

        if (!jid || !jid.includes('@s.whatsapp.net')) {
            return reply("❌ Invalid user specified.");
        }
        if (jid === conn.user.id) return reply("❌ The bot cannot promote itself.");
        if (jid === sender) return reply("❌ You can't promote yourself.");

        // Perform promotion
        await conn.groupParticipantsUpdate(from, [jid], "promote");
        
        // Send success message with newsletter integration
        await conn.sendMessage(from, {
            image: { url: "https://files.catbox.moe/y3j3kl.jpg" },
            caption: `✅ Successfully promoted @${jid.split('@')[0]} to admin!`,
            mentions: [jid],
            contextInfo: {
                mentionedJid: [jid],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363302677217436@newsletter',
                    newsletterName: 'CASEYRHODES-XMD',
                    serverMessageId: 999
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error("Promote command error:", error);
        reply(`❌ Failed to promote user. ${error.message}`);
    }
});
