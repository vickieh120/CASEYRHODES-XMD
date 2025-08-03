const { cmd } = require('../command');

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
    if (!isGroup) return reply("❌ This command can only be used in groups.");
    if (!isAdmins) return reply("❌ Only group admins can use this command.");
    if (!isBotAdmins) return reply("❌ I need to be an admin to use this command.");

    let number;
    if (m.quoted) {
        number = m.quoted.sender.split("@")[0];
    } else if (q && q.includes("@")) {
        number = q.replace(/[@\s]/g, '');
    } else {
        return reply("❌ Please reply to a message or provide a number to promote.");
    }

    if (number === botNumber) return reply("❌ The bot cannot promote itself.");

    const jid = number + "@s.whatsapp.net";

    try {
        await conn.groupParticipantsUpdate(from, [jid], "promote");
        reply(`✅ Successfully promoted @${number} to admin.`, { mentions: [jid] });
        
        const status = `🚀 *User Promoted Successfully!*\n\n📌 *Promoted User:* @${number}\n👑 *Promoted By:* @${sender.split('@')[0]}\n💬 *Group:* ${groupName}\n\n✨ _Powered by 𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐀𝐈_`;
        
        // Send image + caption with newsletter forwarding (safe method)
        const msgOptions = {
            image: { url: `https://i.ibb.co/wN6Gw0ZF/lordcasey.jpg` },
            caption: status,
            contextInfo: {
                mentionedJid: [jid, sender],
                forwardingScore: 999,
                isForwarded: true,
                externalAdReply: {  // Alternative to newsletter forwarding (more reliable)
                    title: "𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐀𝐋𝐈𝐕𝐄🍀",
                    body: "Official Promotion Update",
                    thumbnail: { url: "https://i.ibb.co/wN6Gw0ZF/lordcasey.jpg" },
                    mediaType: 1,
                    mediaUrl: "",
                    sourceUrl: "https://whatsapp.com/channel/0029Va9AJSQ5J3Y5Y0Y5Y5Y5",
                    showAdAttribution: true
                }
            }
        };

        await conn.sendMessage(from, msgOptions, { quoted: mek });
    } catch (error) {
        console.error("Promote command error:", error);
        if (error.message.includes("not an admin")) {
            reply("❌ The user is already an admin.");
        } else if (error.message.includes("newsletter")) {
            reply("📢 Promotion successful, but newsletter forwarding failed.");
        } else {
            reply("❌ Failed to promote the member.");
        }
    }
});
