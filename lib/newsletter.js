import { format, addDays, startOfWeek } from 'date-fns';

// 4. Your fetch function (with error handling)
async function fetchLinks(apiToken, collectionId, queryStartDate, queryEndDate, mostRecentTuesday, nextMonday) {
  const search = new URLSearchParams({
    search: `created:>=${queryStartDate} created:<${queryEndDate}`,
  });

  const url = new URL(`https://api.raindrop.io/rest/v1/raindrops/${collectionId}`);
  url.search = search;

  console.log(`Fetching links from: ${url}`);
  console.log(`Querying from ${mostRecentTuesday.toDateString()} to ${nextMonday.toDateString()}`);
  console.log(`Using API Token: ${apiToken ? apiToken.substring(0, 5) + "..." : "undefined"}`);

  const rsp = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
  });

  if (!rsp.ok) {
    throw new Error(`API Error: ${rsp.status} - ${await rsp.text()}`);
  }
  
  return await rsp.json();
}

// 5. A main function to run the script and save the file
export async function getNewsletterData(apiToken, collectionId) {
  // Add a check to make sure variables were loaded
  if (!apiToken || !collectionId) {
    throw new Error("Missing credentials. Please provide API Token and Collection ID.");
  }

  // --- Date Logic moved here ---
  const todayDate = new Date();
  const mostRecentTuesday = startOfWeek(todayDate, { weekStartsOn: 2 });
  const nextMonday = addDays(mostRecentTuesday, 6);
  const queryStartDate = format(mostRecentTuesday, "yyyy-MM-dd");
  const queryEndDate = format(addDays(nextMonday, 1), "yyyy-MM-dd");
  const filenameDate = queryStartDate;
  // -----------------------------

  const data = await fetchLinks(apiToken, collectionId, queryStartDate, queryEndDate, mostRecentTuesday, nextMonday);

  if (!data.items || data.items.length === 0) {
    return {
        markdown: "No links found for this date range.",
        count: 0,
        filename: `${filenameDate} - links for newsletter.md`
    };
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

    const fullMarkdown = markdownOutput.join('\n');
    const filename = `${filenameDate} - links for newsletter.md`;

    return {
        markdown: fullMarkdown,
        count: data.items.length,
        filename: filename
    };
}
