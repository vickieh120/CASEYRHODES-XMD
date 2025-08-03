const { cmd } = require("../command");
const fetch = require("node-fetch");

cmd({
  'pattern': 'gitclone',
  'alias': ["git"],
  'desc': "Download GitHub repository as a zip file.",
  'react': '📦',
  'category': "downloader",
  'filename': __filename
}, async (message, client, args, { from, quoted, args: commandArgs, reply }) => {
  if (!commandArgs[0]) {
    return reply("Where is the GitHub link?\n\nExample:\n.gitclone https://github.com/caseyweb/CASEYRHODES-XMD");
  }

  // Validate GitHub URL
  if (!/^(https:\/\/)?github\.com\/.+/.test(commandArgs[0])) {
    return reply("⚠️ Invalid GitHub link. Please provide a valid GitHub repository URL.");
  }

  try {
    const githubRegex = /github\.com\/([^\/]+)\/([^\/]+)(?:\.git)?/i;
    const [, username, repoName] = commandArgs[0].match(githubRegex) || [];
    
    if (!username || !repoName) {
      throw new Error("Invalid GitHub URL format.");
    }

    const zipUrl = `https://api.github.com/repos/${username}/${repoName}/zipball`;
    
    // Check if repository exists
    const headResponse = await fetch(zipUrl, { method: "HEAD" });
    if (!headResponse.ok) {
      throw new Error(`Repository not found or inaccessible (HTTP ${headResponse.status}).`);
    }

    // Get filename from content-disposition header or use default
    const contentDisposition = headResponse.headers.get("content-disposition");
    let fileName = contentDisposition 
      ? contentDisposition.match(/filename=(.*)/)[1] 
      : `${repoName}.zip`;

    // Remove quotes if present in filename
    fileName = fileName.replace(/['"]/g, '');

    reply(`*📥 Downloading Repository...*\n\n*Repository:* ${username}/${repoName}\n*Filename:* ${fileName}\n\n> *© ᴄᴀsᴇʏʀʜᴏᴅᴇs ᴛᴇᴄʜ*`);

    await client.sendMessage(from, {
      document: {
        url: zipUrl
      },
      fileName: fileName,
      mimetype: 'application/zip',
      contextInfo: {
        mentionedJid: [message.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363302677217436@newsletter",
          newsletterName: "CASEYRHODES-XMD GITHUB CLONE",
          serverMessageId: 143
        }
      }
    }, {
      quoted: message
    });

  } catch (error) {
    console.error("GitClone Error:", error);
    reply(`❌ Failed to download the repository. ${error.message || "Please try again later."}`);
  }
});
