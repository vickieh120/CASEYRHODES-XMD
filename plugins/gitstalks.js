const { cmd, commands } = require("../command");
const { fetchJson } = require('../lib/functions');

cmd({
  'pattern': "pair",
  'alias': ["getpair", "clone"],
  'react': '🔄',
  'desc': "Get pairing code for CASEYRHODES-XMD",
  'category': "download",
  'use': ".pair +2546220530XXX",
  'filename': __filename
}, async (message, client, m, {
  from,
  prefix,
  quoted,
  q: number,
  reply,
  isGroup
}) => {
  try {
    if (isGroup) {
      return await reply("❌ This command is not allowed in group chats. Please use it in my inbox.");
    }
    if (!number) {
      return await reply("*Example:* .pair +2546220530XXX");
    }
    
    await reply("*Getting pairing code...*");
    const response = await fetchJson("https://six391-wkgc.onrender.com?number=" + number);
    const code = response.code;
    
    // First send the pairing code
    await m.reply({
        text: code + "\n\n> *Use the above pairing code to get your session id for CASEYRHODES-XMD.*",
        contextInfo: {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363302677217436@newsletter',
                newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐀𝐋𝐈𝐕𝐄🍀',
                serverMessageId: 143
            }
        }
    });
    
    // Then send the image with newsletter
    await client.sendMessage(from, { 
        image: { url: `https://i.ibb.co/wN6Gw0ZF/lordcasey.jpg` },  
        caption: "Join our newsletter for updates and more features!",
        contextInfo: {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363302677217436@newsletter',
                newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐀𝐋𝐈𝐕𝐄🍀',
                serverMessageId: 143
            }
        }
    }, { quoted: message });
        
  } catch (error) {
    console.error(error);
    reply({
        text: "An error occurred: " + error.message,
        contextInfo: {
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363302677217436@newsletter',
                newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐀𝐋𝐈𝐕𝐄🍀',
                serverMessageId: 143
            }
        }
    });
  }
});
