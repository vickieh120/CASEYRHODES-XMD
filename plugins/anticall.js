const { cmd } = require('../command');
const { getAntiCall, setAntiCall } = require('../data/anticall');

cmd({
    pattern: "anticall",
    alias: ['anticall', 'blockcall'],
    desc: "Toggle anti-call feature",
    category: "misc",
    filename: __filename
},
async (conn, mek, m, { from, reply, text, isCreator }) => {
    if (!isCreator) return reply('This command is only for the bot owner');
    
    try {
        const currentStatus = await getAntiCall();
        
        if (!text || text.toLowerCase() === 'status') {
            return reply(`*AntiCall Status:* ${currentStatus ? '✅ ON' : '❌ OFF'}\n\nUsage:\n• .anticall on - Enable\n• .anticall off - Disable`);
        }
        
        const action = text.toLowerCase().trim();
        
        if (action === 'on') {
            await setAntiCall(true);
            return reply('✅ Anti-call has been enabled');
        } 
        else if (action === 'off') {
            await setAntiCall(false);
            return reply('❌ Anti-call has been disabled');
        } 
        else {
            return reply('Invalid command. Usage:\n• .anticall on\n• .anticall off\n• .anticall status');
        }
    } catch (e) {
        console.error("Error in anticall command:", e);
        return reply("An error occurred while processing your request.");
    }
});
