const { cmd } = require("../command");
const fetch = require("node-fetch");

// Verified Contact
const quotedContact = {
  key: {
    fromMe: false,
    participant: `0@s.whatsapp.net`,
    remoteJid: "status@broadcast"
  },
  message: {
    contactMessage: {
      displayName: "CASEYRHODES VERIFIED ✅",
      vcard: "BEGIN:VCARD\nVERSION:3.0\nFN:CASEYRHODES VERIFIED ✅\nORG:CASEYRHODES-TECH BOT;\nTEL;type=CELL;type=VOICE;waid=25412192119:+254 121 92119\nEND:VCARD"
    }
  }
};

cmd({
  pattern: "gitclone",
  alias: ["git"],
  desc: "Download GitHub repository as a zip file.",
  react: "📦",
  category: "downloader",
  filename: __filename
}, async (conn, m, match, { from, quoted, args, reply }) => {
  const link = args[0];
  if (!link) return reply("📎 Please provide a GitHub link.\n\nExample:\n.gitclone https://github.com/caseyweb/CASEYRHODES-XMD");

  if (!/^https:\/\/github\.com\/[^\/]+\/[^\/]+/.test(link)) {
    return reply("⚠️ Invalid GitHub URL.");
  }

  try {
    const match = link.match(/github\.com\/([^\/]+)\/([^\/]+)(?:\.git)?/i);
    if (!match) return reply("❌ Couldn't extract repo data.");
    const user = match[1], repo = match[2];

    const downloadURL = `https://api.github.com/repos/${user}/${repo}/zipball`;
    const headCheck = await fetch(downloadURL, { method: "HEAD" });

    if (!headCheck.ok) throw new Error("Repository not found.");

    const filenameHeader = headCheck.headers.get("content-disposition");
    const fileName = filenameHeader ? filenameHeader.match(/filename="?(.+?)"?$/)?.[1] : `${repo}.zip`;

    await reply(`╭───〔 *CASEYRHODES XMD GIT CLONE* 〕───⬣
│
│ 📁 *User:* ${user}
│ 📦 *Repo:* ${repo}
│ 📎 *Filename:* ${fileName}
│
╰───⬣ Downloading...`);

    await conn.sendMessage(from, {
      document: { url: downloadURL },
      fileName: `${fileName}.zip`,
      mimetype: 'application/zip',
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363302677217436@newsletter",
          newsletterName: "CASEYRHODES XMD GITHUB CLONE 👻",
          serverMessageId: 143
        }
      }
    }, { quoted: quotedContact });

  } catch (e) {
    console.error("❌ GitClone Error:", e);
    return reply("❌ Failed to download repository.\nCheck the link or try later.");
  }
});
