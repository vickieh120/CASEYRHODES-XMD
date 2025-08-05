const { cmd } = require('../command');

cmd({
    pattern: "remove",
    alias: ["kick", "k", "out"],
    desc: "Removes a member from the group",
    category: "admin",
    react: "❌",
    filename: __filename
},
async (conn, mek, m, {
    from, q, isGroup, isBotAdmins, reply, quoted, senderNumber
}) => {
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    const botOwner = conn.user.id.split(":")[0];
    if (senderNumber !== botOwner) {
        return reply("❌ Only the bot owner can use this command.");
    }

    if (!isBotAdmins) return reply("❌ I need to be an admin to use this command.");

    let number;
    if (m.quoted) {
        number = m.quoted.sender.split("@")[0];
    } else if (q && q.includes("@")) {
        number = q.replace(/[@\s]/g, '');
    } else {
        return reply("❌ Please reply to a message or mention a user to remove.");
    }

    const jid = number + "@s.whatsapp.net";
    const newsletterInfo = {
        newsletterJid: '120363302677217436@newsletter',
        newsletterName: 'CASEYRHODES-XMD💖',
        serverMessageId: 143
    };

    try {
        await conn.groupParticipantsUpdate(from, [jid], "remove");
        
        // Create integrated newsletter message with image and text
        const msg = {
            image: { url: `https://i.ibb.co/8gHCXCV9/IMG-20250216-WA0009.jpg` },
            caption: `✅ Successfully removed @${number}\n\nAction performed by CASEYRHODES-XMD Newsletter`,
            mentions: [jid, m.sender],
            contextInfo: {
                isForwarded: true,
                forwardingScore: 999,
                newsletterLinkInfo: newsletterInfo,
                externalAdReply: {
                    title: newsletterInfo.newsletterName,
                    body: "Group Management Action",
                    mediaType: 1,
                    thumbnailUrl: "https://i.ibb.co/8gHCXCV9/IMG-20250216-WA0009.jpg",
                    sourceUrl: "https://whatsapp.com/channel/0029VbAdRV25Ejy3CG6Y3Z2Z",
                    showAdAttribution: true
                }
            }
        };

        await conn.sendMessage(from, msg, { quoted: mek });

    } catch (error) {
        console.error("Remove command error:", error);
        reply("❌ Failed to remove the member.");
    }
});
