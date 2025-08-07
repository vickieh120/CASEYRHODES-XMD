const { fetchJson } = require("../lib/functions");
const { downloadTiktok } = require("@mrnima/tiktok-downloader");
const { facebook } = require("@mrnima/facebook-downloader");
const cheerio = require("cheerio");
const { igdl } = require("ruhend-scraper");
const axios = require("axios");
const { cmd, commands } = require('../command');

// Newsletter configuration
const newsletterConfig = {
  newsletterJid: '120363302677217436@newsletter',
  newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐓𝐄𝐂𝐇',
  serverMessageId: 143
};

const addNewsletterContext = (messageOptions) => {
  return {
    ...messageOptions,
    contextInfo: {
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: newsletterConfig.newsletterJid,
        newsletterName: newsletterConfig.newsletterName,
        serverMessageId: newsletterConfig.serverMessageId
      }
    }
  };
};

cmd({
  pattern: "ig",
  alias: ["insta", "Instagram"],
  desc: "To download Instagram videos.",
  react: "🎥",
  category: "download",
  filename: __filename
}, async (conn, m, store, { from, q, reply }) => {
  try {
    if (!q || !q.startsWith("http")) {
      return reply("❌ Please provide a valid Instagram link.");
    }

    await conn.sendMessage(from, {
      react: { text: "⏳", key: m.key }
    });

    const response = await axios.get(`https://api.giftedtech.co.ke/api/download/instadl?apikey=gifted&url=${q}`);
    const data = response.data;

    if (!data || data.status !== 200 || !data.downloadUrl) {
      return reply("⚠️ Failed to fetch Instagram video. Please check the link and try again.");
    }

    const messageOptions = addNewsletterContext({
      video: { url: data.downloadUrl },
      mimetype: "video/mp4",
      caption: "📥 *Instagram Video Downloaded Successfully!*\n\n🔗 *Powered By Caseyrhodes tech*"
    });

    await conn.sendMessage(from, messageOptions, { quoted: m });

  } catch (error) {
    console.error("Error:", error);
    const errorMessage = addNewsletterContext({
      text: "❌ An error occurred while processing your request. Please try again."
    });
    reply(errorMessage);
  }
});

cmd({
  pattern: "twitter",
  alias: ["tweet", "twdl"],
  desc: "Download Twitter videos",
  category: "download",
  filename: __filename
}, async (conn, m, store, { from, quoted, q, reply }) => {
  try {
    if (!q || !q.startsWith("https://")) {
      const errorMessage = addNewsletterContext({
        text: "❌ Please provide a valid Twitter URL."
      });
      return conn.sendMessage(from, errorMessage, { quoted: m });
    }

    await conn.sendMessage(from, {
      react: { text: '⏳', key: m.key }
    });

    const response = await axios.get(`https://www.dark-yasiya-api.site/download/twitter?url=${q}`);
    const data = response.data;

    if (!data || !data.status || !data.result) {
      const errorMessage = addNewsletterContext({
        text: "⚠️ Failed to retrieve Twitter video. Please check the link and try again."
      });
      return reply(errorMessage);
    }

    const { desc, thumb, video_sd, video_hd } = data.result;

    const caption = `╭━━━〔 *TWITTER DOWNLOADER* 〕━━━⊷\n`
      + `┃▸ *Description:* ${desc || "No description"}\n`
      + `╰━━━⪼\n\n`
      + `📹 *Download Options:*\n`
      + `1️⃣  *SD Quality*\n`
      + `2️⃣  *HD Quality*\n`
      + `🎵 *Audio Options:*\n`
      + `3️⃣  *Audio*\n`
      + `4️⃣  *Document*\n`
      + `5️⃣  *Voice*\n\n`
      + `📌 *Reply with the number to download your choice.*\n\n`
      + `🔗 *Powered By Caseyrhodes tech*`;

    const messageOptions = addNewsletterContext({
      image: { url: thumb },
      caption: caption
    });

    const sentMsg = await conn.sendMessage(from, messageOptions, { quoted: m });
    const messageID = sentMsg.key.id;

    conn.ev.on("messages.upsert", async (msgData) => {
      const receivedMsg = msgData.messages[0];
      if (!receivedMsg.message) return;

      const receivedText = receivedMsg.message.conversation || receivedMsg.message.extendedTextMessage?.text;
      const senderID = receivedMsg.key.remoteJid;
      const isReplyToBot = receivedMsg.message.extendedTextMessage?.contextInfo?.stanzaId === messageID;

      if (isReplyToBot) {
        await conn.sendMessage(senderID, {
          react: { text: '⬇️', key: receivedMsg.key }
        });

        let responseMessage;
        switch (receivedText) {
          case "1":
            responseMessage = addNewsletterContext({
              video: { url: video_sd },
              caption: "📥 *Downloaded in SD Quality*\n\n🔗 *Powered By Caseyrhodes tech*"
            });
            break;

          case "2":
            responseMessage = addNewsletterContext({
              video: { url: video_hd },
              caption: "📥 *Downloaded in HD Quality*\n\n🔗 *Powered By Caseyrhodes tech*"
            });
            break;

          case "3":
            responseMessage = addNewsletterContext({
              audio: { url: video_sd },
              mimetype: "audio/mpeg"
            });
            break;

          case "4":
            responseMessage = addNewsletterContext({
              document: { url: video_sd },
              mimetype: "audio/mpeg",
              fileName: "Twitter_Audio.mp3",
              caption: "📥 *Audio Downloaded as Document*\n\n🔗 *Powered By Caseyrhodes tech*"
            });
            break;

          case "5":
            responseMessage = addNewsletterContext({
              audio: { url: video_sd },
              mimetype: "audio/mp4",
              ptt: true
            });
            break;

          default:
            responseMessage = addNewsletterContext({
              text: "❌ Invalid option! Please reply with 1, 2, 3, 4, or 5."
            });
        }

        await conn.sendMessage(senderID, responseMessage, { quoted: receivedMsg });
      }
    });

  } catch (error) {
    console.error("Error:", error);
    const errorMessage = addNewsletterContext({
      text: "❌ An error occurred while processing your request. Please try again."
    });
    reply(errorMessage);
  }
});

cmd({
  pattern: "mediafire",
  alias: ["mfire"],
  desc: "To download MediaFire files.",
  react: "🎥",
  category: "download",
  filename: __filename
}, async (conn, m, store, { from, quoted, q, reply }) => {
  try {
    if (!q) {
      const errorMessage = addNewsletterContext({
        text: "❌ Please provide a valid MediaFire link."
      });
      return reply(errorMessage);
    }

    await conn.sendMessage(from, {
      react: { text: "⏳", key: m.key }
    });

    const response = await axios.get(`https://www.dark-yasiya-api.site/download/mfire?url=${q}`);
    const data = response.data;

    if (!data || !data.status || !data.result || !data.result.dl_link) {
      const errorMessage = addNewsletterContext({
        text: "⚠️ Failed to fetch MediaFire download link. Ensure the link is valid and public."
      });
      return reply(errorMessage);
    }

    const { dl_link, fileName, fileType } = data.result;
    const file_name = fileName || "mediafire_download";
    const mime_type = fileType || "application/octet-stream";

    await conn.sendMessage(from, {
      react: { text: "⬆️", key: m.key }
    });

    const caption = `╭━━━〔 *MEDIAFIRE DOWNLOADER* 〕━━━⊷\n`
      + `┃▸ *File Name:* ${file_name}\n`
      + `┃▸ *File Type:* ${mime_type}\n`
      + `╰━━━⪼\n\n`
      + `📥 *Downloading your file...*\n\n`
      + `🔗 *Powered By Caseyrhodes tech*`;

    const messageOptions = addNewsletterContext({
      document: { url: dl_link },
      mimetype: mime_type,
      fileName: file_name,
      caption: caption
    });

    await conn.sendMessage(from, messageOptions, { quoted: m });

  } catch (error) {
    console.error("Error:", error);
    const errorMessage = addNewsletterContext({
      text: "❌ An error occurred while processing your request. Please try again."
    });
    reply(errorMessage);
  }
});

cmd({
  pattern: "apk",
  desc: "Download APK from Aptoide.",
  category: "download",
  filename: __filename
}, async (conn, m, store, { from, quoted, q, reply }) => {
  try {
    if (!q) {
      const errorMessage = addNewsletterContext({
        text: "❌ Please provide an app name to search."
      });
      return reply(errorMessage);
    }

    await conn.sendMessage(from, { react: { text: "⏳", key: m.key } });

    const apiUrl = `http://ws75.aptoide.com/api/7/apps/search/query=${q}/limit=1`;
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (!data || !data.datalist || !data.datalist.list.length) {
      const errorMessage = addNewsletterContext({
        text: "⚠️ No results found for the given app name."
      });
      return reply(errorMessage);
    }

    const app = data.datalist.list[0];
    const appSize = (app.size / 1048576).toFixed(2);

    const caption = `╭━━━〔 *APK Downloader* 〕━━━┈⊷
┃ 📦 *Name:* ${app.name}
┃ 🏋 *Size:* ${appSize} MB
┃ 📦 *Package:* ${app.package}
┃ 📅 *Updated On:* ${app.updated}
┃ 👨‍💻 *Developer:* ${app.developer.name}
╰━━━━━━━━━━━━━━━┈⊷
🔗 *Powered By Caseyrhodes tech*`;

    await conn.sendMessage(from, { react: { text: "⬆️", key: m.key } });

    const messageOptions = addNewsletterContext({
      document: { url: app.file.path_alt },
      fileName: `${app.name}.apk`,
      mimetype: "application/vnd.android.package-archive",
      caption: caption
    });

    await conn.sendMessage(from, messageOptions, { quoted: m });
    await conn.sendMessage(from, { react: { text: "✅", key: m.key } });

  } catch (error) {
    console.error("Error:", error);
    const errorMessage = addNewsletterContext({
      text: "❌ An error occurred while fetching the APK. Please try again."
    });
    reply(errorMessage);
  }
});

cmd({
  pattern: "gdrive",
  desc: "Download Google Drive files.",
  react: "🌐",
  category: "download",
  filename: __filename
}, async (conn, m, store, { from, quoted, q, reply }) => {
  try {
    if (!q) {
      const errorMessage = addNewsletterContext({
        text: "❌ Please provide a valid Google Drive link."
      });
      return reply(errorMessage);
    }

    await conn.sendMessage(from, { react: { text: "⬇️", key: m.key } });

    const apiUrl = `https://api.fgmods.xyz/api/downloader/gdrive?url=${q}&apikey=mnp3grlZ`;
    const response = await axios.get(apiUrl);
    const downloadUrl = response.data.result.downloadUrl;

    if (downloadUrl) {
      await conn.sendMessage(from, { react: { text: "⬆️", key: m.key } });

      const messageOptions = addNewsletterContext({
        document: { url: downloadUrl },
        mimetype: response.data.result.mimetype,
        fileName: response.data.result.fileName,
        caption: "*© Powered By Caseyrhodes tech*"
      });

      await conn.sendMessage(from, messageOptions, { quoted: m });
      await conn.sendMessage(from, { react: { text: "✅", key: m.key } });
    } else {
      const errorMessage = addNewsletterContext({
        text: "⚠️ No download URL found. Please check the link and try again."
      });
      return reply(errorMessage);
    }
  } catch (error) {
    console.error("Error:", error);
    const errorMessage = addNewsletterContext({
      text: "❌ An error occurred while fetching the Google Drive file. Please try again."
    });
    reply(errorMessage);
  }
});
