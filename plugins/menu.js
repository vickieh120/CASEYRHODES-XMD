const { cmd } = require('../command');
const config = require('../config');

// Helper function to create button messages
const createButtonMessage = (text, buttons, footer = config.BOTNAME) => {
    return {
        text: text,
        footer: footer,
        buttons: buttons,
        headerType: 1
    };
};

// Button templates
const menuButtons = [
    { buttonId: `${config.PREFIX}owner`, buttonText: { displayText: '👑 Owner' }, type: 1 },
    { buttonId: `${config.PREFIX}listcmd`, buttonText: { displayText: '📜 Commands' }, type: 1 },
    { buttonId: `${config.PREFIX}donate`, buttonText: { displayText: '💸 Donate' }, type: 1 }
];

const ownerButtons = [
    { buttonId: `${config.PREFIX}contactowner`, buttonText: { displayText: '📱 Contact' }, type: 1 },
    { buttonId: `${config.PREFIX}officialgc`, buttonText: { displayText: '👥 Group' }, type: 1 },
    { buttonId: `${config.PREFIX}menu`, buttonText: { displayText: '🔙 Back' }, type: 1 }
];

// Main menu command
cmd({
    pattern: "menu",
    desc: "Show main menu",
    category: "general",
    react: "📜",
    filename: __filename
}, async (Void, mek, m, { from }) => {
    try {
        const menuText = `🌟 *${config.BOTNAME} Menu* 🌟\n\n` +
                        `Welcome to ${config.BOTNAME}! Here's what I can do:\n\n` +
                        `• Use buttons below to navigate\n` +
                        `• Prefix: ${config.PREFIX}\n` +
                        `• Owner: ${config.OWNER_NAME}`;
        
        await Void.sendMessage(from, 
            createButtonMessage(menuText, menuButtons),
            { quoted: m }
        );
    } catch (e) {
        console.error("Menu command error:", e);
        await Void.sendMessage(from, 
            { text: "❌ Failed to load menu. Please try again later." },
            { quoted: m }
        );
    }
});

// Owner menu command
cmd({
    pattern: "owner",
    desc: "Owner information",
    category: "info",
    react: "👑"
}, async (Void, mek, m, { from }) => {
    try {
        const ownerText = `👑 *Owner Information* 👑\n\n` +
                         `Name: ${config.OWNER_NAME}\n` +
                         `Contact: ${config.OWNER_NUMBER}\n\n` +
                         `Use buttons below:`;
        
        await Void.sendMessage(from, 
            createButtonMessage(ownerText, ownerButtons),
            { quoted: m }
        );
    } catch (e) {
        console.error("Owner command error:", e);
        await Void.sendMessage(from, 
            { text: "❌ Failed to load owner info." },
            { quoted: m }
        );
    }
});

// Contact owner command
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
        console.error("Contact command error:", e);
        await Void.sendMessage(from, 
            { text: "❌ Failed to send contact." },
            { quoted: m }
        );
    }
});

// Button handler
cmd({
    on: "button",
    fromMe: false
}, async (Void, mek, m) => {
    try {
        const buttonId = m.message.buttonsResponseMessage?.selectedButtonId;
        const sender = m.key.remoteJid;

        if (!buttonId) return;

        switch(buttonId) {
            case `${config.PREFIX}owner`:
                await Void.sendMessage(sender, 
                    createButtonMessage(
                        `👑 *Owner Information* 👑\n\nSelect an option:`,
                        ownerButtons
                    )
                );
                break;

            case `${config.PREFIX}menu`:
                await Void.sendMessage(sender, 
                    createButtonMessage(
                        `🌟 *${config.BOTNAME} Main Menu* 🌟\n\nSelect an option:`,
                        menuButtons
                    )
                );
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
                await Void.sendMessage(sender, 
                    { text: "⚠️ Unknown button selection" }
                );
        }
    } catch (e) {
        console.error("Button handler error:", e);
    }
});
