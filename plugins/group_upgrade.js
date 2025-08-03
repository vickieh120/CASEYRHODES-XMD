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
    try {
        // Check if the command is used in a group
        if (!isGroup) return await reply("❌ This command can only be used in groups.");

        // Check if the user is an admin
        if (!isAdmins) return await reply("❌ Only group admins can use this command.");

        // Check if the bot is an admin
        if (!isBotAdmins) return await reply("❌ I need to be an admin to use this command.");

        let number;
        if (m.quoted) {
            number = m.quoted.sender.split("@")[0];
        } else if (args[0] && args[0].includes("@")) {
            number = args[0].replace(/[@\s]/g, '');
        } else {
            return await reply("❌ Please reply to a message or mention a user to promote.");
        }

        // Validate number
        if (!number || isNaN(number)) return await reply("❌ Invalid number format.");

        // Prevent promoting the bot itself
        if (number === botNumber.split("@")[0]) return await reply("❌ The bot cannot promote itself.");

        const jid = number + "@s.whatsapp.net";

        // Check if user is already admin
        if (groupAdmins.includes(jid)) return await reply("❌ This user is already an admin.");

        await conn.groupParticipantsUpdate(from, [jid], "promote");
        await reply(`✅ Successfully promoted @${number} to admin.`, { mentions: [jid] });
        
        // Send promotion notification
        await conn.sendMessage(from, { 
            text: `🚀 *Admin Promotion Successful!*\n\n@${number} has been promoted to admin by @${sender.split("@")[0]}\n\n_🔔 Stay updated with our latest news!_`,
            mentions: [jid, sender],
            contextInfo: {
                mentionedJid: [jid, sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363302677217436@newsletter',
                    newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐀𝐋𝐈𝐕𝐄🍀',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });
    } catch (error) {
        console.error("Promote command error:", error);
        await reply("❌ Failed to promote the member. Error: " + error.message);
    }
});

cmd({
    pattern: "demote",
    alias: ["d", "dismiss", "removeadmin"],
    desc: "Demotes a group admin to a normal member",
    category: "admin",
    react: "⬇️",
    filename: __filename
},
async(conn, mek, m, {
    from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator, isDev, isAdmins, reply
}) => {
    try {
        // Check if the command is used in a group
        if (!isGroup) return await reply("❌ This command can only be used in groups.");

        // Check if the user is an admin
        if (!isAdmins) return await reply("❌ Only group admins can use this command.");

        // Check if the bot is an admin
        if (!isBotAdmins) return await reply("❌ I need to be an admin to use this command.");

        let number;
        if (m.quoted) {
            number = m.quoted.sender.split("@")[0];
        } else if (args[0] && args[0].includes("@")) {
            number = args[0].replace(/[@\s]/g, '');
        } else {
            return await reply("❌ Please reply to a message or mention a user to demote.");
        }

        // Validate number
        if (!number || isNaN(number)) return await reply("❌ Invalid number format.");

        // Prevent demoting the bot itself
        if (number === botNumber.split("@")[0]) return await reply("❌ The bot cannot demote itself.");

        const jid = number + "@s.whatsapp.net";

        // Check if user is not an admin
        if (!groupAdmins.includes(jid)) return await reply("❌ This user is not an admin.");

        await conn.groupParticipantsUpdate(from, [jid], "demote");
        await reply(`✅ Successfully demoted @${number} to a normal member.`, { mentions: [jid] });
        
        // Send demotion notification
        await conn.sendMessage(from, { 
            text: `📉 *Admin Demotion Notice*\n\n@${number} has been demoted by @${sender.split("@")[0]}\n\n_🔔 Stay updated with our latest news!_`,
            mentions: [jid, sender],
            contextInfo: {
                mentionedJid: [jid, sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363302677217436@newsletter',
                    newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐀𝐋𝐈𝐕𝐄🍀',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });
    } catch (error) {
        console.error("Demote command error:", error);
        await reply("❌ Failed to demote the member. Error: " + error.message);
    }
});
