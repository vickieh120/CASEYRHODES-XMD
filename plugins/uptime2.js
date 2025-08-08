const { cmd } = require('../command');
const moment = require('moment-timezone');
const config = require('../config');

// Global variables to track auto-bio state
let autoBioInterval = null;
let isAutoBioEnabled = false;

cmd({
    pattern: "autobio",
    desc: "Enable/disable automatic status updates with current time",
    category: "utility",
    react: "🔄",
    filename: __filename
},
async (conn, mek, m, { from, args, reply }) => {
    try {
        // Check if auto-bio is disabled in config
        if (config.AUTO_BIO !== "true") {
            return reply("❌ Auto-bio feature is disabled in configuration!");
        }

        const action = args[0]?.toLowerCase();
        
        if (action === "on") {
            if (isAutoBioEnabled) {
                return reply("ℹ️ Auto-bio is already enabled!");
            }
            
            isAutoBioEnabled = true;
            startAutoBio(conn);
            reply("✅ *Auto-bio enabled!*\nYour status will now update automatically.");
            
        } else if (action === "off") {
            if (!isAutoBioEnabled) {
                return reply("ℹ️ Auto-bio is already disabled!");
            }
            
            isAutoBioEnabled = false;
            clearInterval(autoBioInterval);
            autoBioInterval = null;
            reply("❌ *Auto-bio disabled!*");
            
        } else {
            const status = isAutoBioEnabled ? "enabled" : "disabled";
            reply(`🔄 *Auto-bio Status*: ${status}\n\n` +
                  "Usage:\n" +
                  "• *!autobio on* - Enable automatic status\n" +
                  "• *!autobio off* - Disable automatic status");
        }
    } catch (e) {
        console.error("Auto-bio error:", e);
        reply(`❌ Error: ${e.message}`);
    }
});

function startAutoBio(conn) {
    // Clear any existing interval
    if (autoBioInterval) clearInterval(autoBioInterval);
    
    // Update immediately and set interval
    updateBio(conn);
    autoBioInterval = setInterval(() => updateBio(conn), 60000); // Update every minute
}

async function updateBio(conn) {
    try {
        if (!isAutoBioEnabled) return;
        
        // Get current time - use configured timezone or default to Asia/Kolkata
        const timezone = config.TIME_ZONE || "Asia/Kolkata";
        const time = moment().tz(timezone).format('h:mm A');
        const date = moment().tz(timezone).format('DD/MM/YYYY');
        
        // Create bio text
        const bioText = `🕒 ${time} | 📅 ${date} | Powered by Casey Rhodes`;
        
        // Update profile status
        await conn.updateProfileStatus(bioText);
        console.log("Bio updated:", bioText);
    } catch (e) {
        console.error("Bio update error:", e);
        // Attempt to restart on error
        if (isAutoBioEnabled) {
            setTimeout(() => startAutoBio(conn), 5000);
        }
    }
}
