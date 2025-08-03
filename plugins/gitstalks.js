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
    
    const status = `✅ *Pairing Code Generated*\n\n` +
                   `*Number:* ${number}\n` +
                   `*Code:* ${code}\n\n` +
                   `_Powered by CASEYRHODES-XMD_`;
    
    // Send the status message with an image
    await client.sendMessage(from, { 
      image: { url: `https://i.ibb.co/8gHCXCV/IMG-20250216-WA0009.jpg` },  
      caption: status,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: 'CASEYRHODES-XMD💖',
          serverMessageId: 143
        }
      }
    }, { quoted: message });
    
  } catch (error) {
    console.error(error);
    reply("An error occurred: " + error.message);
  }
});

cmd({
  'pattern': "pair2",
  'alias': ['getpair2', "clone2"],
  'react': '🔄',
  'desc': "Get pairing code for CASEYRHODES XMD",
  'category': 'download',
  'use': ".pair2 +2546220530XXX",
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
      return await reply("*Example:* .pair2 +2546220530XXX");
    }
    
    await reply("*Getting pairing code...*");
    const response = await fetchJson('https://ttpair.onrender.com/code?number=' + number);
    const code = response.code;
    
    const status = `✅ *Pairing Code Generated*\n\n` +
                   `*Number:* ${number}\n` +
                   `*Code:* ${code}\n\n` +
                   `_Powered by CASEYRHODES-XMD_`;
    
    // Send the status message with an image
    await client.sendMessage(from, { 
      image: { url: `https://i.ibb.co/8gHCXCV/IMG-20250216-WA0009.jpg` },  
      caption: status,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: 'CASEYRHODES-XMD💖',
          serverMessageId: 143
        }
      }
    }, { quoted: message });
    
  } catch (error) {
    console.error(error);
    reply("An error occurred: " + error.message);
  }
});
