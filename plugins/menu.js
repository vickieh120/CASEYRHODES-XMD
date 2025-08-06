const config = require('../config');
const { cmd } = require('../command');
const fs = require('fs');
const path = require('path');

// ==============================
// IMPROVED BUTTON IMPLEMENTATION
// ==============================

const createButtons = (buttons, text, footer = config.BOTNAME) => {
    return {
        text: text,
        footer: footer,
        buttons: buttons,
        headerType: 1
    };
};

const buttonTemplates = {
    mainMenu: () => createButtons(
        [
            { buttonId: `${config.PREFIX}owner`, buttonText: { displayText: '👑 Owner' }, type: 1 },
            { buttonId: `${config.PREFIX}listcmd`, buttonText: { displayText: '📜 Commands' }, type: 1 },
            { buttonId: `${config.PREFIX}donate`, buttonText: { displayText: '💸 Donate' }, type: 1 }
        ],
        `🌟 *${config.BOTNAME} Menu* 🌟\nSelect an option below:`
    ),
    
    ownerMenu: () => createButtons(
        [
            { buttonId: `${config.PREFIX}contactowner`, buttonText: { displayText: '📱 Contact' }, type: 1 },
            { buttonId: `${config.PREFIX}officialgc`, buttonText: { displayText: '👥 Group' }, type: 1 },
            { buttonId: `${config.PREFIX}menu`, buttonText: { displayText: '🔙 Back' }, type: 1 }
        ],
        '👑 *Owner Information Menu*'
    )
};

// ==============================
// COMMAND IMPLEMENTATIONS
// ==============================

cmd({
    pattern: "menu",
    desc: "Main menu with buttons",
    category: "general",
    react: "📜",
    filename: __filename
}, async (Void, mek, m, { from }) => {
    try {
        await Void.sendMessage(from, buttonTemplates.mainMenu(), { quoted: m });
    } catch (e) {
        console.error("Menu error:", e);
        await Void.sendMessage(from, { text: "🚨 Failed to load menu. Please try again." }, { quoted: m });
    }
});

cmd({
    pattern: "owner",
    desc: "Owner information menu",
    category: "info",
    react: "👑"
}, async (Void, mek, m, { from }) => {
    try {
        await Void.sendMessage(from, buttonTemplates.ownerMenu(), { quoted: m });
    } catch (e) {
        console.error("Owner menu error:", e);
        await Void.sendMessage(from, { text: "🚨 Failed to load owner menu." }, { quoted: m });
    }
});

cmd({
    pattern: "contactowner",
    desc: "Contact the bot owner",
    category: "info",
    react: "📱"
}, async (Void, mek, m, { from }) => {
    try {
        await Void.sendMessage(from, { 
            contacts: {
                displayName: config.OWNER_NAME,
                contacts: [{ 
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:${config.OWNER_NAME}\nTEL:${config.OWNER_NUMBER}\nEND:VCARD` 
                }]
            }
        }, { quoted: m });
    } catch (e) {
        console.error("Contact error:", e);
        await Void.sendMessage(from, { text: "🚨 Failed to send contact." }, { quoted: m });
    }
});

// ==============================
// BUTTON COMMAND HANDLERS
// ==============================

cmd({
    on: "button",
    fromMe: false
}, async (Void, mek, m, data) => {
    try {
        const buttonId = m.message.buttonsResponseMessage.selectedButtonId;
        const sender = m.key.remoteJid;

        switch(buttonId) {
            case `${config.PREFIX}owner`:
                await Void.sendMessage(sender, buttonTemplates.ownerMenu());
                break;
                
            case `${config.PREFIX}menu`:
                await Void.sendMessage(sender, buttonTemplates.mainMenu());
                break;
                
            case `${config.PREFIX}contactowner`:
                await Void.sendMessage(sender, { 
                    contacts: {
                        displayName: config.OWNER_NAME,
                        contacts: [{ 
                            vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:${config.OWNER_NAME}\nTEL:${config.OWNER_NUMBER}\nEND:VCARD` 
                        }]
                    }
                });
                break;
                
            default:
                await Void.sendMessage(sender, { text: "⚠️ Unknown button selection" });
        }
    } catch (e) {
        console.error("Button handler error:", e);
    }
});

// ==============================
// REQUIRED CONFIG.JS SETTINGS
// ==============================
/*
Ensure your config.js has these:
module.exports = {
    BOTNAME: "YourBotName",
    OWNER_NAME: "OwnerName",
    OWNER_NUMBER: "1234567890",
    PREFIX: "."
    // ... other configs
};
*/
