// 1. Import the functions you need
import { format, addDays, startOfWeek } from 'date-fns';
import { writeFile } from 'fs/promises';
import path from 'path';
import 'dotenv/config'; // <-- 1. LOAD THE .env FILE

// --- Configuration ---
// 2. READ THE VARIABLES FROM 'process.env'
const API_TOKEN = process.env.RAINDROP_API_TOKEN;
const COLLECTION_ID = process.env.RAINDROP_COLLECTION_ID;
// ---

// 3. Your date logic
const todayDate = new Date();

// Find the most recent Tuesday.
const mostRecentTuesday = startOfWeek(todayDate, { weekStartsOn: 2 });

// The end of our period is the *next* Monday (6 days after Tuesday).
const nextMonday = addDays(mostRecentTuesday, 6);

// --- Format dates for API query ---
const queryStartDate = format(mostRecentTuesday, "yyyy-MM-dd");
const queryEndDate = format(addDays(nextMonday, 1), "yyyy-MM-dd");

// --- Format date for the filename ---
const filenameDate = queryStartDate;


// 4. Your fetch function (with error handling)
async function fetchLinks() {
  const search = new URLSearchParams({
    search: `created:>=${queryStartDate} created:<${queryEndDate}`,
  });

  const url = new URL(`https://api.raindrop.io/rest/v1/raindrops/${COLLECTION_ID}`);
  url.search = search;

  console.log(`Fetching links from: ${url}`);
  console.log(`Querying from ${mostRecentTuesday.toDateString()} to ${nextMonday.toDateString()}`);


  const rsp = await fetch(url, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  if (!rsp.ok) {
    throw new Error(`API Error: ${rsp.status} - ${await rsp.text()}`);
  }
  
  return await rsp.json();
}

// 5. A main function to run the script and save the file
async function main() {
  // Add a check to make sure variables were loaded
  if (!API_TOKEN || !COLLECTION_ID) {
    console.error("\n--- ❌ Error: Secrets not found! ---");
    console.error("Please make sure you have a .env file with RAINDROP_API_TOKEN and RAINDROP_COLLECTION_ID.");
    return;
  }

  try {
    const data = await fetchLinks();

    if (!data.items || data.items.length === 0) {
      console.log("\n--- 🟡 No links found for this date range. ---");
      console.log(`Query was: created:>=${queryStartDate} created:<${queryEndDate}`);
      return;
    }
    
    // --- 1. Build the Markdown Output ---
    
    let markdownOutput = [];
    const linksByTag = {};
    const untaggedLinks = [];

    data.items.forEach(item => {
      const markdownLink = `[${item.title}](${item.link})`;
      const description = item.note ? ` - ${item.note.replace(/\n/g, ' ')}` : '';
      const markdownLine = `- ${markdownLink}${description}`;

      if (item.tags && item.tags.length > 0) {
        item.tags.forEach(tag => {
          if (!linksByTag[tag]) {
            linksByTag[tag] = [];
          }
          linksByTag[tag].push(markdownLine);
        });
      } else {
        untaggedLinks.push(markdownLine);
      }
    });

    for (const tag in linksByTag) {
      const header = tag.charAt(0).toUpperCase() + tag.slice(1);
      markdownOutput.push(`## ${header}\n`);
      linksByTag[tag].forEach(line => markdownOutput.push(line));
      markdownOutput.push("\n");
    }

    if (untaggedLinks.length > 0) {
      markdownOutput.push("## General Links\n");
      untaggedLinks.forEach(line => markdownOutput.push(line));
      markdownOutput.push("\n");
    }

    // --- 2. Save to File ---
    const filename = `${filenameDate} - links for newsletter.md`;
    const fullMarkdown = markdownOutput.join('\n');
    const filePath = path.join(process.cwd(), filename);

    await writeFile(filePath, fullMarkdown);

    // --- 3. Log Success to Terminal ---
    console.log("\n--- ✅ Success! ---");
    console.log(`Saved ${data.items.length} links to: ${filePath}`);

  } catch (error) {
    console.error("\n--- ❌ Error running script ---");
    console.error(error.message);
  }
}

// 6. Run the main function
main();