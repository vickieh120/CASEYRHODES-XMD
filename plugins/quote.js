const axios = require("axios");
const { cmd } = require("../command");

cmd({
  pattern: "quote",
  desc: "Get a random inspiring quote.",
  category: "fun",
  react: '💬',
  filename: __filename
}, async (Void, citel, text, { from, reply }) => {
  try {
    // Fetch random quote from API
    const response = await axios.get("https://api.quotable.io/random");
    const quoteData = response.data;
    
    // Format the quote message
    const formattedQuote = `
💬 *Quote of the Moment* 💬

"${quoteData.content}"

- _${quoteData.author}_

📡 *Powered by Caseyrhodes tech*
    `;
    
    // Send the formatted quote
    return await reply(formattedQuote);
    
  } catch (error) {
    console.error("Error fetching quote:", error);
    return await reply("❌ Failed to fetch quote. Please try again later.");
  }
});
