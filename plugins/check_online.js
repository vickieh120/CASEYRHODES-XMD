const { cmd } = require('../command');

cmd({
    pattern: "online",
    alias: ["whosonline", "onlinemembers"],
    desc: "Check who's online in the group (Admins & Owner only)",
    category: "main",
    react: "🟢",
    filename: __filename
},
async (conn, mek, m, { from, quoted, isGroup, isAdmins, isCreator, fromMe, reply }) => {
    try {
        // Validate group usage
        if (!isGroup) return reply("❌ This command can only be used in a group!");

        // Check permissions
        if (!isCreator && !isAdmins && !fromMe) {
            return reply("❌ Only bot owner and group admins can use this command!");
        }

        const onlineMembers = new Set();
        const groupData = await conn.groupMetadata(from);
        
        // Batch presence updates with error handling
        await Promise.all(groupData.participants.map(participant => 
            conn.presenceSubscribe(participant.id)
                .then(() => conn.sendPresenceUpdate('composing', participant.id))
                .catch(() => {})
        ));

        // Presence tracking
        const presenceHandler = (json) => {
            for (const id in json.presences) {
                const presence = json.presences[id]?.lastKnownPresence;
                if (['available', 'composing', 'recording', 'online'].includes(presence)) {
                    onlineMembers.add(id);
                }
            }
        };

        conn.ev.on('presence.update', presenceHandler);

        // Detection parameters
        const detectionChecks = 3;
        const checkInterval = 5000;
        let checksCompleted = 0;

        const sendResults = async () => {
            checksCompleted++;
            
            if (checksCompleted >= detectionChecks) {
                // Clean up listeners
                clearInterval(detectionInterval);
                conn.ev.off('presence.update', presenceHandler);
                
                // Handle no results
                if (onlineMembers.size === 0) {
                    return reply("⚠️ No online members detected. They may have privacy settings enabled.");
                }
                
                // Format results
                const onlineList = Array.from(onlineMembers)
                    .map((id, index) => `${index + 1}. @${id.split('@')[0]}`)
                    .join('\n');

                await conn.sendMessage(from, {
                    image: { url: 'https://files.catbox.moe/y3j3kl.jpg' },
                    caption: `🟢 *ONLINE MEMBERS* (${onlineMembers.size}/${groupData.participants.length}):\n\n${onlineList}\n\n🔊 _SYSTEM ACTIVE_`,
                    mentions: Array.from(onlineMembers),
                    contextInfo: {
                        mentionedJid: Array.from(onlineMembers),
                        forwardingScore: 999,
                        isForwarded: true
                    }
                }, { quoted: mek });
            }
        };

        const detectionInterval = setInterval(sendResults, checkInterval);

        // Safety timeout
        setTimeout(() => {
            clearInterval(detectionInterval);
            conn.ev.off('presence.update', presenceHandler);
        }, checkInterval * detectionChecks + 10000);

    } catch (error) {
        console.error("Command Error:", error);
        reply(`❌ Command failed: ${error.message}`);
    }
});
