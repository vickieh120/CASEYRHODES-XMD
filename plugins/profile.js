const { cmd } = require('../command');

cmd({
    pattern: "person",
    react: "👤",
    alias: ["userinfo", "profile"],
    desc: "Get complete user profile information with newsletter integration",
    category: "utility",
    use: '.person [@tag or reply]',
    filename: __filename
},
async (conn, mek, m, { from, sender, isGroup, reply, quoted, participants }) => {
    try {
        // Newsletter configuration
        const newsletterConfig = {
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
        };

        // 1. Determine target user
        let userJid = quoted?.sender || 
                     mek.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || 
                     sender;

        // 2. Verify user exists
        const [user] = await conn.onWhatsApp(userJid).catch(() => []);
        if (!user?.exists) return reply("❌ User not found on WhatsApp");

        // 3. Get profile picture
        let ppUrl;
        try {
            ppUrl = await conn.profilePictureUrl(userJid, 'image');
        } catch {
            ppUrl = 'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png';
        }

        // 4. Get name (multi-source fallback)
        let userName = userJid.split('@')[0];
        try {
            if (isGroup) {
                const member = participants.find(p => p.id === userJid);
                if (member?.notify) userName = member.notify;
            }
            
            if (userName === userJid.split('@')[0] && conn.contactDB) {
                const contact = await conn.contactDB.get(userJid).catch(() => null);
                if (contact?.name) userName = contact.name;
            }
            
            if (userName === userJid.split('@')[0]) {
                const presence = await conn.presenceSubscribe(userJid).catch(() => null);
                if (presence?.pushname) userName = presence.pushname;
            }
        } catch (e) {
            console.log("Name fetch error:", e);
        }

        // 5. Get bio/about
        let bio = {};
        try {
            const statusData = await conn.fetchStatus(userJid).catch(() => null);
            if (statusData?.status) {
                bio = {
                    text: statusData.status,
                    type: "Personal",
                    updated: statusData.setAt ? new Date(statusData.setAt * 1000) : null
                };
            } else {
                const businessProfile = await conn.getBusinessProfile(userJid).catch(() => null);
                if (businessProfile?.description) {
                    bio = {
                        text: businessProfile.description,
                        type: "Business",
                        updated: null
                    };
                }
            }
        } catch (e) {
            console.log("Bio fetch error:", e);
        }

        // 6. Get group role
        let groupRole = "";
        if (isGroup) {
            const participant = participants.find(p => p.id === userJid);
            groupRole = participant?.admin ? "👑 Admin" : "👥 Member";
        }

        // 7. Format output
        const formattedBio = bio.text ? 
            `${bio.text}\n└─ 📌 ${bio.type} Bio${bio.updated ? ` | 🕒 ${bio.updated.toLocaleString()}` : ''}` : 
            "No bio available";

        const userInfo = `
*👤 USER PROFILE INFORMATION*

📛 *Name:* ${userName}
🔢 *Number:* ${userJid.replace(/@.+/, '')}
📌 *Account Type:* ${user.isBusiness ? "💼 Business" : user.isEnterprise ? "🏢 Enterprise" : "👤 Personal"}

*📝 About:*
${formattedBio}

*⚙️ Account Info:*
✅ Registered: ${user.isUser ? "Yes" : "No"}
🛡️ Verified: ${user.verifiedName ? "✅ Verified" : "❌ Not verified"}
${isGroup ? `👥 *Group Role:* ${groupRole}` : ''}

*📡 Powered by CASEYRHODES*
`.trim();

        // 8. Send result with newsletter integration
        await conn.sendMessage(from, {
            image: { url: ppUrl },
            caption: userInfo,
            mentions: [userJid],
            ...newsletterConfig
        }, { quoted: mek });

    } catch (e) {
        console.error("Person command error:", e);
        reply(`❌ Error: ${e.message || "Failed to fetch profile"}`);
    }
});
