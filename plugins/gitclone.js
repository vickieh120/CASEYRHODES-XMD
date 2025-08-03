const {
  cmd
} = require("../command");
const fetch = require("node-fetch");

cmd({
  'pattern': 'gitclone',
  'alias': ["git"],
  'desc': "Download GitHub repository as a zip file with preview image",
  'react': '📦',
  'category': "downloader",
  'filename': __filename
}, async (message, client, args, { reply }) => {
  if (!args[0]) {
    return reply("Please provide a GitHub link!\n\nExample:\n.gitclone https://github.com/caseyweb/CASEYRHODES-XMD");
  }
  
  if (!/^(https:\/\/)?github\.com\/.+/.test(args[0])) {
    return reply("⚠️ Invalid GitHub link. Please provide a valid GitHub repository URL.");
  }

  try {
    const githubRegex = /github\.com\/([^\/]+)\/([^\/]+)(?:\.git)?/i;
    const [, username, repoName] = args[0].match(githubRegex) || [];
    
    if (!username || !repoName) {
      throw new Error("Invalid GitHub URL format.");
    }

    const zipUrl = `https://api.github.com/repos/${username}/${repoName}/zipball`;
    const repoUrl = `https://github.com/${username}/${repoName}`;
    const imageUrl = `https://opengraph.githubassets.com/1/${username}/${repoName}`;

    // Verify repository exists
    const response = await fetch(zipUrl, { method: "HEAD" });
    if (!response.ok) {
      throw new Error("Repository not found or access denied.");
    }

    // Get filename from headers or default to repo name
    const contentDisposition = response.headers.get("content-disposition");
    const fileName = contentDisposition ? 
      contentDisposition.match(/filename=(.*)/)[1] : 
      `${repoName}-${Date.now()}.zip`;

    // Send repository preview image
    await client.sendMessage(message.from, {
      image: { url: imageUrl },
      caption: `*📂 GitHub Repository Preview*\n\n` +
               `*Name:* ${repoName}\n` +
               `*Author:* ${username}\n` +
               `*URL:* ${repoUrl}\n\n` +
               `_Downloading zip file..._`
    }, { quoted: message });

    // Send the zip file
    await client.sendMessage(message.from, {
      document: { url: zipUrl },
      fileName: fileName,
      mimetype: 'application/zip',
      caption: `✅ Successfully downloaded: ${username}/${repoName}`,
      contextInfo: {
        mentionedJid: [message.sender],
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title: `${username}/${repoName}`,
          body: "GitHub Repository Download",
          thumbnailUrl: "https://files.catbox.moe/is9ayz.jpg",
          sourceUrl: repoUrl,
          mediaType: 1
        }
      }
    }, { quoted: message });

  } catch (error) {
    console.error("GitClone Error:", error);
    reply("❌ Failed to process your request. Error: " + error.message);
  }
});
