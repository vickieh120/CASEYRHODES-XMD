const axios = require("axios");
const fetch = require("node-fetch");
const { sleep } = require('../lib/functions');
const { cmd } = require("../command");

// Joke command with newsletter
cmd({
    pattern: "joke",
    desc: "😂 Get a random joke",
    react: "🤣",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, reply, sender }) => {
    try {
        const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
        const joke = response.data;

        if (!joke || !joke.setup || !joke.punchline) {
            return reply("❌ Failed to fetch a joke. Please try again.");
        }

        const jokeMessage = `🤣 *Here's a random joke for you!* 🤣\n\n*${joke.setup}*\n\n${joke.punchline} 😆\n\n> *© ᴄᴏᴏᴋᴇᴅ ʙʏ ᴍʀ ᴄᴀsᴇʏʀʜᴏᴅᴇs*`;

        await conn.sendMessage(from, {
            text: jokeMessage,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363302677217436@newsletter',
                    newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐓𝐄𝐂𝐇',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });
    } catch (error) {
        console.error("❌ Error in joke command:", error);
        reply("⚠️ An error occurred while fetching the joke. Please try again.");
    }
});

// Flirt command with newsletter
cmd({
    pattern: "flirt",
    alias: ["masom", "line"],
    desc: "Get a random flirt or pickup line.",
    react: "💘",
    category: "fun",
    filename: __filename,
}, async (conn, mek, m, { from, reply, sender }) => {
    try {
        const shizokeys = 'shizo';
        const apiUrl = `https://shizoapi.onrender.com/api/texts/flirt?apikey=${shizokeys}`;

        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error(`API error: ${await res.text()}`);
        
        const json = await res.json();
        if (!json.result) throw new Error("Invalid response from API.");

        await conn.sendMessage(from, {
            text: json.result,
            mentions: [sender],
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363302677217436@newsletter',
                    newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐓𝐄𝐂𝐇',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error("Error in flirt command:", error);
        reply("Sorry, something went wrong while fetching the flirt line. Please try again later.");
    }
});

// Truth command with newsletter
cmd({
    pattern: "truth",
    alias: ["truthquestion"],
    desc: "Get a random truth question from the API.",
    react: "❓",
    category: "fun",
    filename: __filename,
}, async (conn, mek, m, { from, reply, sender }) => {
    try {
        const shizokeys = 'shizo';
        const res = await fetch(`https://shizoapi.onrender.com/api/texts/truth?apikey=${shizokeys}`);
        
        if (!res.ok) throw new Error(`API request failed with status ${res.status}`);

        const json = await res.json();
        if (!json.result) throw new Error("Invalid API response: No 'result' field found.");

        await conn.sendMessage(from, { 
            text: json.result, 
            mentions: [sender],
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363302677217436@newsletter',
                    newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐓𝐄𝐂𝐇',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error("Error in truth command:", error);
        reply("Sorry, something went wrong while fetching the truth question. Please try again later.");
    }
});

// Dare command with newsletter
cmd({
    pattern: "dare",
    alias: ["truthordare"],
    desc: "Get a random dare from the API.",
    react: "🎯",
    category: "fun",
    filename: __filename,
}, async (conn, mek, m, { from, reply, sender }) => {
    try {
        const shizokeys = 'shizo';
        const res = await fetch(`https://shizoapi.onrender.com/api/texts/dare?apikey=${shizokeys}`);
        
        if (!res.ok) throw new Error(`API request failed with status ${res.status}`);

        const json = await res.json();
        if (!json.result) throw new Error("Invalid API response: No 'result' field found.");

        await conn.sendMessage(from, { 
            text: json.result, 
            mentions: [sender],
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363302677217436@newsletter',
                    newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐓𝐄𝐂𝐇',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error("Error in dare command:", error);
        reply("Sorry, something went wrong while fetching the dare. Please try again later.");
    }
});

// Fact command with newsletter
cmd({
    pattern: "fact",
    desc: "🧠 Get a random fun fact",
    react: "🧠",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, reply, sender }) => {
    try {
        const response = await axios.get("https://uselessfacts.jsph.pl/random.json?language=en");
        const fact = response.data.text;

        if (!fact) return reply("❌ Failed to fetch a fun fact. Please try again.");

        const factMessage = `🧠 *Random Fun Fact* 🧠\n\n${fact}\n\nIsn't that interesting? 😄\n\n> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ғʀᴀɴᴋ*`;

        await conn.sendMessage(from, {
            text: factMessage,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363302677217436@newsletter',
                    newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐓𝐄𝐂𝐇',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });
    } catch (error) {
        console.error("❌ Error in fact command:", error);
        reply("⚠️ An error occurred while fetching a fun fact. Please try again later.");
    }
});

// Pickup line command with newsletter
cmd({
    pattern: "pickupline",
    alias: ["pickup"],
    desc: "Get a random pickup line from the API.",
    react: "💬",
    category: "fun",
    filename: __filename,
}, async (conn, mek, m, { from, reply, sender }) => {
    try {
        const res = await fetch('https://api.popcat.xyz/pickuplines');
        if (!res.ok) throw new Error(`API request failed with status ${res.status}`);

        const json = await res.json();
        const pickupLine = `*Here's a pickup line for you:*\n\n"${json.pickupline}"\n\n> *© ᴅʀᴏᴘᴘᴇᴅ ʙʏ ᴍʀ ғʀᴀɴᴋ*`;

        await conn.sendMessage(from, { 
            text: pickupLine,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363302677217436@newsletter',
                    newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐓𝐄𝐂𝐇',
                    serverMessageId: 143
                }
            }
        }, { quoted: m });

    } catch (error) {
        console.error("Error in pickupline command:", error);
        reply("Sorry, something went wrong while fetching the pickup line. Please try again later.");
    }
});

// Character command with newsletter
cmd({
    pattern: "character",
    alias: ["char"],
    desc: "Check the character of a mentioned user.",
    react: "🔥",
    category: "fun",
    filename: __filename,
}, async (conn, mek, m, { from, isGroup, reply, sender }) => {
    try {
        if (!isGroup) return reply("This command can only be used in groups.");

        const mentionedUser = m.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
        if (!mentionedUser) return reply("Please mention a user whose character you want to check.");

        const userChar = [
            "Sigma", "Generous", "Grumpy", "Overconfident", "Obedient",
            "Good", "Simp", "Kind", "Patient", "Pervert",
            "Cool", "Helpful", "Brilliant", "Sexy", "Hot",
            "Gorgeous", "Cute"
        ];

        const userCharacterSelection = userChar[Math.floor(Math.random() * userChar.length)];
        const message = `Character of @${mentionedUser.split("@")[0]} is *${userCharacterSelection}* 🔥⚡`;

        await conn.sendMessage(from, {
            text: message,
            mentions: [mentionedUser],
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363302677217436@newsletter',
                    newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐓𝐄𝐂𝐇',
                    serverMessageId: 143
                }
            }
        }, { quoted: m });

    } catch (e) {
        console.error("Error in character command:", e);
        reply("An error occurred while processing the command. Please try again.");
    }
});

// Repeat command with newsletter
cmd({
    pattern: "repeat",
    alias: ["rp", "rpm"],
    desc: "Repeat a message a specified number of times.",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, args, reply, sender }) => {
    try {
        if (!args[0]) return reply("✳️ Use this command like:\n*Example:* .repeat 10,I love you");

        const [countStr, ...messageParts] = args.join(" ").split(",");
        const count = parseInt(countStr.trim());
        const message = messageParts.join(",").trim();

        if (isNaN(count) || count <= 0 || count > 300) {
            return reply("❎ Please specify a valid number between 1 and 300.");
        }

        if (!message) return reply("❎ Please provide a message to repeat.");

        const repeatedMessage = Array(count).fill(message).join("\n");
        const response = `🔄 Repeated ${count} times:\n\n${repeatedMessage}\n\n> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ᴄᴀsᴇʏʀʜᴏᴅᴇs*`;

        await conn.sendMessage(from, {
            text: response,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363302677217436@newsletter',
                    newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐓𝐄𝐂𝐇',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error("❌ Error in repeat command:", error);
        reply("❎ An error occurred while processing your request.");
    }
});

// Send command with newsletter
cmd({
    pattern: "send",
    desc: "Send a message multiple times, one by one.",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, args, reply, sender, senderNumber }) => {
    try {
        const botOwner = conn.user.id.split(":")[0];
        if (senderNumber !== botOwner) return reply("❎ Only the bot owner can use this command.");

        if (!args[0]) return reply("✳️ Use this command like:\n *Example:* .send 10,I love you");

        const [countStr, ...messageParts] = args.join(" ").split(",");
        const count = parseInt(countStr.trim());
        const message = messageParts.join(",").trim();

        if (isNaN(count) || count <= 0 || count > 100) {
            return reply("❎ Please specify a valid number between 1 and 100.");
        }

        if (!message) return reply("❎ Please provide a message to send.");

        await reply(`⏳ Sending "${message}" ${count} times. This may take a while...`);

        for (let i = 0; i < count; i++) {
            await conn.sendMessage(from, { 
                text: message,
                contextInfo: {
                    mentionedJid: [sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363302677217436@newsletter',
                        newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐓𝐄𝐂𝐇',
                        serverMessageId: 143
                    }
                }
            }, { quoted: mek });
            await sleep(1000);
        }

        await reply(`✅ Successfully sent the message ${count} times.`);

    } catch (error) {
        console.error("❌ Error in ask command:", error);
        reply("❎ An error occurred while processing your request.");
    }
});

// Readmore command with newsletter
cmd({
    pattern: "readmore",
    alias: ["rm", "rmore", "readm"],
    desc: "Generate a Read More message.",
    category: "convert",
    use: ".readmore <text>",
    react: "📝",
    filename: __filename
}, async (conn, mek, m, { from, args, reply, sender }) => {
    try {
        const inputText = args.join(" ") || "No text provided.";
        const readMore = String.fromCharCode(8206).repeat(4001);
        const message = `${inputText}${readMore}`;

        await conn.sendMessage(from, { 
            text: message,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363302677217436@newsletter',
                    newsletterName: '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐓𝐄𝐂𝐇',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });
    } catch (error) {
        console.error("❌ Error in readmore command:", error);
        reply("❌ An error occurred: " + error.message);
    }
});
