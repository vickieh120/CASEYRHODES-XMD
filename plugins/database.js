/*_______________________________________________________________________________________________________________________________________________________________________________________________________________________
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── 
─██████████████──██████████──██████──────────██████████████──██████──────────██████──██████████████──██████──────────██████████████──██████──██████──██████████████──████████████████─── 
─██░░░░░░░░░░██──██░░░░░░██──██░░██──────────██░░░░░░░░░░██──██░░██████████──██░░██──██░░░░░░░░░░██──██░░██──────────██░░░░░░░░░░██──██░░██──██░░██──██░░░░░░░░░░██──██░░░░░░░░░░░░██─── 
─██░░██████████──████░░████──██░░██──────────██░░██████████──██░░░░░░░░░░██──██░░██──██████░░██████──██░░██──────────██░░██████░░██──██░░██──██░░██──██░░██████████──██░░████████░░██─── 
─██░░██────────────██░░██────██░░██──────────██░░██──────────██░░██████░░██──██░░██──────██░░██──────██░░██──────────██░░██──██░░██──██░░██──██░░██──██░░██──────────██░░██────██░░██─── 
─██░░██████████────██░░██────██░░██──────────██░░██████████──██░░██──██░░██──██░░██──────██░░██──────██░░██──────────██░░██──██░░██──██░░██──██░░██──██░░██████████──██░░████████░░██─── 
─██░░░░░░░░░░██────██░░██────██░░██──────────██░░░░░░░░░░██──██░░██──██░░██──██░░██──────██░░██──────██░░██──────────██░░██──██░░██──██░░██──██░░██──██░░░░░░░░░░██──██░░░░░░░░░░░░██─── 
─██████████░░██────██░░██────██░░██──────────██░░██████████──██░░██──██░░██──██░░██──────██░░██──────██░░██──────────██░░██──██░░██──██░░██──██░░██──██░░██████████──██░░██████░░████─── 
─────────██░░██────██░░██────██░░██──────────██░░██──────────██░░██──██░░██████░░██──────██░░██──────██░░██──────────██░░██──██░░██──██░░░░██░░░░██──██░░██──────────██░░██──██░░██───── 
─██████████░░██──████░░████──██░░██████████──██░░██████████──██░░██──██░░░░░░░░░░██──────██░░██──────██░░██████████──██░░██████░░██──████░░░░░░████──██░░██████████──██░░██──██░░██████─ 
─██░░░░░░░░░░██──██░░░░░░██──██░░░░░░░░░░██──██░░░░░░░░░░██──██░░██──██████████░░██──────██░░██──────██░░░░░░░░░░██──██░░░░░░░░░░██────████░░████────██░░░░░░░░░░██──██░░██──██░░░░░░██─ 
─██████████████──██████████──██████████████──██████████████──██████──────────██████──────██████──────██████████████──██████████████──────██████──────██████████████──██████──██████████─ 
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── 
created by caseyrhodes tech🕵
contact me Caseyrhodes ♻️
© Copy coder alert ⚠
*/

const { cmd, commands } = require('../command');
const config = require('../config');
const prefix = config.PREFIX;
const fs = require('fs');
const axios = require('axios')
const os = require("os")
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, sleep, fetchJson } = require('../lib/functions');
const { writeFileSync } = require('fs');
const path = require('path');

let antilinkAction = "off"; // Default state
let warnCount = {}; // Track warnings per user

cmd({ 
  pattern: "setprefix", 
  alias: ["prefix"], 
  desc: "Change bot prefix.", 
  category: "settings", 
  filename: __filename 
}, async (conn, mek, m, { 
  from, 
  args, 
  isOwner, 
  reply 
}) => { 
  if (!isOwner) return reply("*📛 Only the owner can use this command!*", {
    contextInfo: {
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363302677217436@newsletter',
        newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
        serverMessageId: 101
      }
    }
  }); 
  if (!args[0]) return reply("❌ Please provide a new prefix.", {
    contextInfo: {
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363302677217436@newsletter',
        newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
        serverMessageId: 102
      }
    }
  }); 
  const newPrefix = args[0]; 
  config.PREFIX = newPrefix; 
  fs.writeFileSync('./config.json', JSON.stringify(config, null, 2)); 
  reply(`*Prefix changed to:* ${newPrefix}`, {
    contextInfo: {
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363302677217436@newsletter',
        newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
        serverMessageId: 103
      }
    }
  }); 
  const { exec } = require("child_process"); 
  reply("*_DATABASE UPDATE CASEYRHODES-XMD RESTARTING NOW...🚀_*", {
    contextInfo: {
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363302677217436@newsletter',
        newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
        serverMessageId: 104
      }
    }
  }); 
  await sleep(1500); 
  exec("pm2 restart all"); 
  reply("*_CASEYRHODES-XMD STARTED NOW...🚀_*", {
    contextInfo: {
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363302677217436@newsletter',
        newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
        serverMessageId: 105
      }
    }
  }); 
});

// Send image + caption + audio combined
await conn.sendMessage(from, { 
  image: { url: `https://i.ibb.co/wN6Gw0ZF/lordcasey.jpg` },  
  caption: status,
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
}, { quoted: mek });

//========mode
cmd({
  pattern: "mode",
  desc: "Set bot mode to private or public.",
  category: "settings",
  filename: __filename,
}, async (conn, mek, m, { from, args, isOwner, reply }) => {
  if (!isOwner) return reply("*📛 Only the owner can use this command!*", {
    contextInfo: {
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363302677217436@newsletter',
        newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
        serverMessageId: 106
      }
    }
  });

  if (!args[0]) {
    return reply(`📌 Current mode: *${config.MODE}*\n\nUsage: .mode private OR .mode public`, {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
          serverMessageId: 107
        }
      }
    });
  }

  const modeArg = args[0].toLowerCase();

  if (modeArg === "private") {
    config.MODE = "private";
    return reply("*_BOT MODE IS NOW SET TO PRIVATE ✅_*.", {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
          serverMessageId: 108
        }
      }
    });
  } else if (modeArg === "public") {
    config.MODE = "public";
    reply("*_BOT MODE IS NOW SET TO PUBLIC ✅_*.", {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
          serverMessageId: 109
        }
      }
    });
    const {exec} = require("child_process");
    reply("*_DATABASE UPDATE CASEYRHODES-XMD RESTARTING NOW...🚀_*", {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
          serverMessageId: 110
        }
      }
    });
    await sleep(1500);
    exec("pm2 restart all");
    reply("*_CASEYRHODES XMD STARTED NOW...🚀_*", {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
          serverMessageId: 111
        }
      }
    });
  } else {
    return reply("❌ Invalid mode. Please use `.mode private` or `.mode public`.", {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
          serverMessageId: 112
        }
      }
    });
  }
});

//--------------------------------------------
//  AUTO_TYPING
//--------------------------------------------
cmd({
  pattern: "autotyping",
  alias: ["autotyping"],
  desc: "enable or disable auto-reply.",
  category: "settings",
  filename: __filename
}, async (conn, mek, m, { from, args, isOwner, reply }) => {
  if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*", {
    contextInfo: {
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363302677217436@newsletter',
        newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
        serverMessageId: 113
      }
    }
  });

  if (args[0] === "on") {
    config.AUTO_TYPING = "true";
    return reply("*_FAKETYPING IS NOW ENABLED._*☑️", {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
          serverMessageId: 114
        }
      }
    });
  } else if (args[0] === "off") {
    config.AUTO_TYPING = "false";
    return reply("*_FAKETYPING FEATURE IS NOW DISABLED._*❌", {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
          serverMessageId: 115
        }
      }
    });
  } else {
    return reply(`*🫟 ᴇxᴀᴍᴘʟᴇ: . ғᴀᴋᴇ_ᴛʏᴘɪɴɢ ᴏɴ*`, {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
          serverMessageId: 116
        }
      }
    });
  }
});

//--------------------------------------------
// ALWAYS_ONLINE COMMANDS
//--------------------------------------------
cmd({
  pattern: "alwaysonline",
  alias: ["alwaysonline"],
  desc: "enable or disable auto-reply.",
  category: "settings",
  filename: __filename
}, async (conn, mek, m, { from, args, isOwner, reply }) => {
  if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*", {
    contextInfo: {
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363302677217436@newsletter',
        newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
        serverMessageId: 117
      }
    }
  });

  if (args[0] === "on") {
    config.ALWAYS_ONLINE = "true";
    return reply("*_ALWAYSONLINE IS NOW ENABLED._*☑️", {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
          serverMessageId: 118
        }
      }
    });
  } else if (args[0] === "off") {
    config.ALWAYS_ONLINE = "false";
    return reply("*_ALWAYSONLINE FEATURE IS NOW DISABLED._*❌", {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
          serverMessageId: 119
        }
      }
    });
  } else {
    return reply(`*🫟 ᴇxᴀᴍᴘʟᴇ: . ᴀʟᴡᴀʏs_ᴏɴʟɪɴᴇ ᴏɴ*`, {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
          serverMessageId: 120
        }
      }
    });
  }
});

//--------------------------------------------
//  AUTO-REPLY COMMANDS
//--------------------------------------------
cmd({
  pattern: "autorecording",
  alias: ["autorecording"],
  desc: "enable or disable auto-reply.",
  category: "settings",
  filename: __filename
}, async (conn, mek, m, { from, args, isOwner, reply }) => {
  if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*", {
    contextInfo: {
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363302677217436@newsletter',
        newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
        serverMessageId: 121
      }
    }
  });

  if (args[0] === "on") {
    config.AUTO_RECORDING = "true";
    return reply("*_FAKEREACORDING IS NOW ENABLED._*☑️", {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
          serverMessageId: 122
        }
      }
    });
  } else if (args[0] === "off") {
    config.AUTO_RECORDING = "false";
    return reply("*_FAKEREACORDING FEATURE IS NOW DISABLED._*❌", {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
          serverMessageId: 123
        }
      }
    });
  } else {
    return reply(`*🫟 ᴇxᴀᴍᴘʟᴇ: . ғᴀᴋᴇ_ʀᴇᴀᴄᴏʀᴅɪɴɢ ᴏɴ*`, {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
          serverMessageId: 124
        }
      }
    });
  }
});

//--------------------------------------------
// AUTO_VIEW_STATUS COMMANDS
//--------------------------------------------
cmd({
  pattern: "statusview",
  alias: ["auto_status_seen"],
  desc: "Enable or disable auto-viewing of statuses",
  category: "settings",
  filename: __filename
}, async (conn, mek, m, { from, args, isOwner, reply }) => {
  if (!isOwner) return reply("*📛 �ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*", {
    contextInfo: {
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363302677217436@newsletter',
        newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
        serverMessageId: 125
      }
    }
  });

  if (args[0] === "on") {
    config.AUTO_STATUS_SEEN = "true";
    return reply("*_AUTOREADSTATUS IS NOW ENABLED._*☑️", {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
          serverMessageId: 126
        }
      }
    });
  } else if (args[0] === "off") {
    config.AUTO_STATUS_SEEN = "false";
    return reply("*_AUTOREADSTATUS IS NOW DISABLED._*❌", {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
          serverMessageId: 127
        }
      }
    });
  } else {
    return reply(`*🫟 ᴇxᴀᴍᴘʟᴇ: .ᴀᴜᴛᴏ-sᴇᴇɴ ᴏɴ*`, {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
          serverMessageId: 128
        }
      }
    });
  }
}); 

//--------------------------------------------
// AUTO_LIKE_STATUS COMMANDS
//--------------------------------------------
cmd({
  pattern: "statusreact",
  alias: ["statusreact"],
  desc: "Enable or disable auto-liking of statuses",
  category: "settings",
  filename: __filename
}, async (conn, mek, m, { from, args, isOwner, reply }) => {
  if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*", {
    contextInfo: {
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363302677217436@newsletter',
        newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
        serverMessageId: 129
      }
    }
  });

  if (args[0] === "on") {
    config.AUTO_STATUS_REACT = "true";
    return reply("*_AUTOLIKESTATUS IS NOW ENABLED._*☑️", {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
          serverMessageId: 130
        }
      }
    });
  } else if (args[0] === "off") {
    config.AUTO_STATUS_REACT = "false";
    return reply("*_AUTOLIKESTATUS IS NOW DISABLED._*❌", {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
          serverMessageId: 131
        }
      }
    });
  } else {
    return reply(`Example: . status_react on`, {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
          serverMessageId: 132
        }
      }
    });
  }
});

//--------------------------------------------
//  READ-MESSAGE COMMANDS
//--------------------------------------------
cmd({
  pattern: "readmessage",
  alias: ["autoread"],
  desc: "enable or disable readmessage.",
  category: "settings",
  filename: __filename
}, async (conn, mek, m, { from, args, isOwner, reply }) => {
  if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*", {
    contextInfo: {
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363302677217436@newsletter',
        newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
        serverMessageId: 133
      }
    }
  });

  if (args[0] === "on") {
    config.READ_MESSAGE = "true";
    return reply("*_READ MESSAGE FEATURE IS NOW ENABLED._*☑️", {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
          serverMessageId: 134
        }
      }
    });
  } else if (args[0] === "off") {
    config.READ_MESSAGE = "false";
    return reply("*_READ MESSAGE FEATURE IS NOW DISABLED._*❌", {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
          serverMessageId: 135
        }
      }
    });
  } else {
    return reply(`_example:  .READ_MESSAGE on_`, {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
          serverMessageId: 136
        }
      }
    });
  }
});

//--------------------------------------------
//  ANI-BAD COMMANDS
//--------------------------------------------
cmd({
  pattern: "antibad",
  alias: ["antibad"],
  desc: "enable or disable antibad.",
  category: "settings",
  filename: __filename
}, async (conn, mek, m, { from, args, isOwner, reply }) => {
  if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*", {
    contextInfo: {
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363302677217436@newsletter',
        newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
        serverMessageId: 137
      }
    }
  });

  if (args[0] === "on") {
    config.ANTI_BAD = "true";
    return reply("*_ANTI BAD WORD IS NOW ENABLED._*☑️", {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
          serverMessageId: 138
        }
      }
    });
  } else if (args[0] === "off") {
    config.ANTI_BAD = "false";
    return reply("*_ANTI BAD WORD FEATURE IS NOW DISABLED._*❌", {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
          serverMessageId: 139
        }
      }
    });
  } else {
    return reply(`_example:  .ANTI_BAD_WORD on_`, {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
          serverMessageId: 140
        }
      }
    });
  }
});

//--------------------------------------------
//  AUTO-STICKER COMMANDS
//--------------------------------------------
cmd({
  pattern: "autosticker",
  alias: ["autosticker"],
  desc: "enable or disable auto-sticker.",
  category: "settings",
  filename: __filename
}, async (conn, mek, m, { from, args, isOwner, reply }) => {
  if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*", {
    contextInfo: {
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363302677217436@newsletter',
        newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
        serverMessageId: 141
      }
    }
  });

  if (args[0] === "on") {
    config.AUTO_STICKER = "true";
    return reply("*_AUTO-STICKER FEATURE IS NOW ENABLED._*☑️", {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
          serverMessageId: 142
        }
      }
    });
  } else if (args[0] === "off") {
    config.AUTO_STICKER = "false";
    return reply("*_AUTO-STICKER FEATURE IS NOW DISABLED._*❌", {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
          serverMessageId: 143
        }
      }
    });
  } else {
    return reply(`_example:  .auto-sticker on_`, {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
          serverMessageId: 144
        }
      }
    });
  }
});

//--------------------------------------------
//  AUTO-REPLY COMMANDS
//--------------------------------------------
cmd({
  pattern: "autoreply",
  alias: ["autoreply"],
  desc: "enable or disable auto-reply.",
  category: "settings",
  filename: __filename
}, async (conn, mek, m, { from, args, isOwner, reply }) => {
  if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*", {
    contextInfo: {
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363302677217436@newsletter',
        newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
        serverMessageId: 145
      }
    }
  });

  if (args[0] === "on") {
    config.AUTO_REPLY = "true";
    return reply("*_AUTO-REPLY IS NOW ENABLED._*☑️", {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
          serverMessageId: 146
        }
      }
    });
  } else if (args[0] === "off") {
    config.AUTO_REPLY = "false";
    return reply("*_AUTO-REPLY FEATURE IS NOW DISABLED._*❌", {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
          serverMessageId: 147
        }
      }
    });
  } else {
    return reply(`*🫟 ᴇxᴀᴍᴘʟᴇ: . ᴀᴜᴛᴏ-ʀᴇᴘʟʏ ᴏɴ*`, {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
          serverMessageId: 148
        }
      }
    });
  }
});

//--------------------------------------------
//  AUTO-REPLY COMMANDS
//--------------------------------------------
cmd({
  pattern: "autovoice",
  alias: ["autovoice"],
  desc: "enable or disable auto-reply.",
  category: "settings",
  filename: __filename
}, async (conn, mek, m, { from, args, isOwner, reply }) => {
  if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*", {
    contextInfo: {
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363302677217436@newsletter',
        newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
        serverMessageId: 149
      }
    }
  });

  if (args[0] === "on") {
    config.AUTO_VOICE = "true";
    return reply("*_AUTO-VOICE IS NOW ENABLED._*☑️", {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
          serverMessageId: 150
        }
      }
    });
  } else if (args[0] === "off") {
    config.AUTO_VOICE = "false";
    return reply("*_AUTO-VOICE FEATURE IS NOW DISABLED._*❌", {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
          serverMessageId: 151
        }
      }
    });
  } else {
    return reply(`*🫟 ᴇxᴀᴍᴘʟᴇ: . ᴀᴜᴛᴏ_ᴠᴏɪᴄᴇ ᴏɴ*`, {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
          serverMessageId: 152
        }
      }
    });
  }
});

//--------------------------------------------
//   AUTO-REACT COMMANDS
//--------------------------------------------
cmd({
  pattern: "autoreact",
  alias: ["autoreact","areact"],
  desc: "Enable or disable the autoreact feature",
  category: "settings",
  filename: __filename
}, async (conn, mek, m, { from, args, isOwner, reply }) => {
  if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*", {
    contextInfo: {
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363302677217436@newsletter',
        newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
        serverMessageId: 153
      }
    }
  });

  if (args[0] === "on") {
    config.AUTO_REACT = "true";
    await reply("*_AUTOREACT FEATURE IS NOW ENABLED._*☑️", {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
          serverMessageId: 154
        }
      }
    });
  } else if (args[0] === "off") {
    config.AUTO_REACT = "false";
    await reply("*_AUTOREACT FEATURE IS NOW DISABLED._*❌", {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
          serverMessageId: 155
        }
      }
    });
  } else {
    await reply(`*🫟 ᴇxᴀᴍᴘʟᴇ: .ᴀᴜᴛᴏ_ʀᴇᴀᴄᴛ ᴏɴ*`, {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
          serverMessageId: 156
        }
      }
    });
  }
});

//   AUTO-REACT COMMANDS
//--------------------------------------------
cmd({
  pattern: "customreacts",
  alias: ["heartreact","dillreact"],
  desc: "Enable or disable the autoreact feature",
  category: "settings",
  filename: __filename
}, async (conn, mek, m, { from, args, isOwner, reply }) => {
  if (!isOwner) return reply("*📛 �ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*", {
    contextInfo: {
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363302677217436@newsletter',
        newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
        serverMessageId: 157
      }
    }
  });

  if (args[0] === "on") {
    config.CUSTOM_REACT = "true";
    await reply("*_HEARTREACT FEATURE IS NOW ENABLED._*☑️", {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
          serverMessageId: 158
        }
      }
    });
  } else if (args[0] === "off") {
    config.CUSTOM_REACT = "false";
    await reply("*_HEARTREACT FEATURE IS NOW DISABLED._*❌", {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
          serverMessageId: 159
        }
      }
    });
  } else {
    await reply(`*🫟 ᴇxᴀᴍᴘʟᴇ: .ʜᴇᴀʀᴛ_ʀᴇᴀᴄᴛ ᴏɴ*`, {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
          serverMessageId: 160
        }
      }
    });
  }
});

//   AUTO-REACT COMMANDS
//--------------------------------------------
cmd({
  pattern: "antilink",
  alias: ["antilink","anti"],
  desc: "Enable or disable the autoreact feature",
  category: "settings",
  filename: __filename
}, async (conn, mek, m, { from, args, isOwner, reply }) => {
  if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*", {
    contextInfo: {
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363302677217436@newsletter',
        newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
        serverMessageId: 161
      }
    }
  });

  if (args[0] === "on") {
    config.ANTI_LINK = "true";
    await reply("*_OWNERREACT FEATURE IS NOW ENABLED._*☑️", {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
          serverMessageId: 162
        }
      }
    });
  } else if (args[0] === "off") {
    config.ANTI_LINK = "false";
    await reply("*_ANTI_LINK FEATURE IS NOW DISABLED._*❌", {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
          serverMessageId: 163
        }
      }
    });
  } else {
    await reply(`*🫟 ᴇxᴀᴍᴘʟᴇ: .Antilink_on/off*`, {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
          serverMessageId: 164
        }
      }
    });
  }
});

//--------------------------------------------
//  STATUS-REPLY COMMANDS
//--------------------------------------------
cmd({
  pattern: "statusreply",
  alias: ["autostatusreply"],
  desc: "enable or disable status-reply.",
  category: "settings",
  filename: __filename
}, async (conn, mek, m, { from, args, isOwner, reply }) => {
  if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*", {
    contextInfo: {
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363302677217436@newsletter',
        newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
        serverMessageId: 165
      }
    }
  });

  if (args[0] === "on") {
    config.AUTO_STATUS_REPLY = "true";
    return reply("*_STATUS-REPLY FEATURE IS NOW ENABLED._*☑️", {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
          serverMessageId: 166
        }
      }
    });
  } else if (args[0] === "off") {
    config.AUTO_STATUS_REPLY = "false";
    return reply("*_STATUS-REPLY FEATURE IS NOW DISABLED._*❌", {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
          serverMessageId: 167
        }
      }
    });
  } else {
    return reply(`*🫟 ᴇxᴀᴍᴘʟᴇ:  .ᴀᴜᴛᴏ_ʀᴇᴘʟʏ_sᴛᴀᴛᴜs ᴏɴ*`, {
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐔𝐏𝐃𝐀𝐓𝐄𝐒🍀',
          serverMessageId: 168
        }
      }
    });
  }
});
