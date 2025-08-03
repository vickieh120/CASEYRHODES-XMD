const axios = require("axios");
const { cmd } = require("../command");
const { sleep } = require('../lib/functions');

cmd({
  pattern: "screenshot",
  react: "🌐",
  alias: ["ss", "ssweb"],
  desc: "Capture a full-page screenshot of a website.",
  category: "main",
  use: ".screenshot <url>",
  filename: __filename,
}, async (conn, mek, msg, { from, args, reply, sender }) => {
  try {
    const url = args[0];
    if (!url) return reply("❌ Please provide a URL\nExample: .screenshot https://google.com");
    if (!url.startsWith("http")) return reply("❌ URL must start with http:// or https://");

    // Newsletter configuration
    const newsletterConfig = {
      contextInfo: {
        mentionedJid: [sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: 'CASEYRHODES TECH 🌟',
          serverMessageId: 143
        }
      }
    };

    // ASCII loading bars with percentage
    const loadingBars = [
        { percent: 10, bar: "[▓░░░░░░░░░]", text: "✦ Initializing capture..." },
        { percent: 20, bar: "[▓▓░░░░░░░░]", text: "✦ Connecting to website..." },
        { percent: 30, bar: "[▓▓▓░░░░░░░]", text: "✦ Loading page content..." },
        { percent: 40, bar: "[▓▓▓▓░░░░░░]", text: "✦ Rendering elements..." },
        { percent: 50, bar: "[▓▓▓▓▓░░░░░]", text: "✦ Processing JavaScript..." },
        { percent: 60, bar: "[▓▓▓▓▓▓░░░░]", text: "✦ Capturing viewport..." },
        { percent: 70, bar: "[▓▓▓▓▓▓▓░░░]", text: "✦ Scrolling page..." },
        { percent: 80, bar: "[▓▓▓▓▓▓▓▓░░]", text: "✦ Finalizing screenshot..." },
        { percent: 90, bar: "[▓▓▓▓▓▓▓▓▓░]", text: "✦ Optimizing image..." },
        { percent: 100, bar: "[▓▓▓▓▓▓▓▓▓▓]", text: "✓ Capture complete!" }
    ];

    // Send initial message
    const loadingMsg = await conn.sendMessage(from, {
        text: "🔄 Starting screenshot capture...\n✦ Please wait...",
        ...newsletterConfig
    }, { quoted: mek });

    // Animate loading progress
    for (const frame of loadingBars) {
        await sleep(800);
        await conn.relayMessage(from, {
            protocolMessage: {
                key: loadingMsg.key,
                type: 14,
                editedMessage: {
                    conversation: `📸 ${frame.bar} ${frame.percent}%\n${frame.text}`
                }
            }
        }, {});
    }

    // Final update before sending
    await sleep(800);
    await conn.relayMessage(from, {
        protocolMessage: {
            key: loadingMsg.key,
            type: 14,
            editedMessage: {
                conversation: "✅ Screenshot Captured!\n✦ Sending now..."
            }
        }
    }, {});

    await sleep(1000);

    // Send the actual screenshot with newsletter context
    await conn.sendMessage(from, {
        image: { 
          url: `https://image.thum.io/get/fullpage/${url}`,
          mimetype: "image/jpeg"
        },
        caption: "🖼️ *Screenshot Generated*\n\n" +
                "🔗 *Website:* " + url + "\n\n" +
                "⚡ *Powered by CASEYRHODES-TECH*",
        ...newsletterConfig
    }, { quoted: mek });

    // Send newsletter update message (without image)
    await conn.sendMessage(from, { 
        text: "🌟 *CASEYRHODES TECH UPDATE* 🌟\n\nStay updated with our latest features!",
        ...newsletterConfig
    }, { quoted: mek });

  } catch (error) {
    console.error("Screenshot Error:", error);
    reply("❌ Failed to capture screenshot\n✦ Please try again later");
  }
});
