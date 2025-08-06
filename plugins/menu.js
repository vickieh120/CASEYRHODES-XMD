const config = require('../config');
const { cmd, commands } = require('../command');
const fs = require('fs');
const path = require('path');

// Improved random image selector with caching
let cachedImages = [];
const getRandomImage = () => {
    try {
        if (cachedImages.length === 0) {
            const srcPath = path.join(__dirname, '../src');
            const files = fs.readdirSync(srcPath);
            cachedImages = files.filter(file => 
                /\.(jpg|png|jpeg)$/i.test(file)
            ).map(file => path.join(srcPath, file));
            
            if (cachedImages.length === 0) {
                console.log('No local images found, using default');
                return 'https://files.catbox.moe/wklbg4.jpg';
            }
        }
        return cachedImages[Math.floor(Math.random() * cachedImages.length)];
    } catch (e) {
        console.log('Image error:', e);
        return 'https://files.catbox.moe/wklbg4.jpg';
    }
};

// Audio URLs with better quality options
const audioUrls = [
    'https://files.catbox.moe/m0xfku.mp3',  // High quality menu audio
    'https://files.catbox.moe/3au05j.m4a',  // Better formatted audio
    'https://files.catbox.moe/dcxfi1.mp3',  // Clear audio
    'https://files.catbox.moe/ebkzu5.mp3'   // Premium quality
];

// Button definitions with better structure
const buttonSections = {
    mainMenu: [
        { buttonId: `${config.PREFIX}owner`, buttonText: { displayText: '👑 Owner Menu' }, type: 1 },
        { buttonId: `${config.PREFIX}listcmd`, buttonText: { displayText: '📜 All Commands' }, type: 1 },
        { buttonId: `${config.PREFIX}donate`, buttonText: { displayText: '💸 Donate' }, type: 1 }
    ],
    ownerMenu: [
        { buttonId: `${config.PREFIX}contactowner`, buttonText: { displayText: '📱 Contact Owner' }, type: 1 },
        { buttonId: `${config.PREFIX}officialgc`, buttonText: { displayText: '👥 Official Group' }, type: 1 },
        { buttonId: `${config.PREFIX}back`, buttonText: { displayText: '🔙 Main Menu' }, type: 1 }
    ]
};

cmd({
    pattern: "menu",
    desc: "Show main menu",
    category: "general",
    react: "📜",
    filename: __filename
}, async (conn, mek, m, { from, pushname, reply }) => {
    try {
        const uptime = process.uptime();
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        
        const menuText = `🌟 *${config.HEADER}* 🌟

╭───「 User Info 」
│ 👤 Name: ${pushname}
│ ⚡ Prefix: ${config.PREFIX}
│ 🕒 Uptime: ${hours}h ${minutes}m
╰─────────────────

╭───「 Bot Info 」
│ 🤖 Name: ${config.BOTNAME}
│ 📦 Commands: ${commands.length}
│ 🚀 Version: ${config.VERSION}
╰─────────────────

╭───「 Menu Sections 」
│ 📚 Main Menu
│ 🛠️ Tools Menu
│ 🎉 Fun Menu
│ 🖼️ Media Menu
│ ⚙️ Owner Menu
╰─────────────────

${config.FOOTER}`;

        await conn.sendMessage(from, {
            image: { url: getRandomImage() },
            caption: menuText,
            footer: config.BOTNAME,
            buttons: buttonSections.mainMenu,
            headerType: 4
        }, { quoted: m });

        // Send high quality audio
        const audioUrl = audioUrls[Math.floor(Math.random() * audioUrls.length)];
        await conn.sendMessage(from, {
            audio: { url: audioUrl },
            mimetype: 'audio/mpeg',
            ptt: false
        }, { quoted: m });

    } catch (error) {
        console.error('Menu error:', error);
        await reply('❌ Failed to load menu. Please try again later.');
    }
});

cmd({
    pattern: "owner",
    desc: "Owner information menu",
    category: "info",
    react: "👑"
}, async (conn, mek, m, { from, reply }) => {
    try {
        await conn.sendMessage(from, {
            text: '👑 *Owner Information* 👑\n\nSelect an option below:',
            buttons: buttonSections.ownerMenu,
            footer: config.BOTNAME,
            headerType: 1
        }, { quoted: m });
    } catch (error) {
        console.error('Owner menu error:', error);
        await reply('❌ Failed to load owner menu.');
    }
});

cmd({
    pattern: "contactowner",
    desc: "Contact the bot owner",
    category: "info",
    react: "📱"
}, async (conn, mek, m, { from, reply }) => {
    try {
        await conn.sendMessage(from, {
            contacts: {
                displayName: "Bot Owner",
                contacts: [{
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:${config.OWNER_NAME}\nTEL:${config.OWNER_NUMBER}\nEND:VCARD`
                }]
            }
        }, { quoted: m });
    } catch (error) {
        console.error('Contact error:', error);
        await reply('❌ Failed to send contact.');
    }
});

// Additional button handlers
cmd({
    pattern: "listcmd",
    desc: "List all commands",
    category: "general",
    react: "📜"
}, async (conn, mek, m, { reply }) => {
    // Command list implementation
});

cmd({
    pattern: "donate",
    desc: "Donation information",
    category: "info",
    react: "💸"
}, async (conn, mek, m, { reply }) => {
    // Donation implementation
});

cmd({
    pattern: "back",
    desc: "Return to main menu",
    category: "general",
    react: "🔙"
}, async (conn, mek, m, { reply }) => {
    // Back to menu implementation
});
