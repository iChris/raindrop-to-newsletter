import { format, addDays, startOfWeek, subDays } from 'date-fns';

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
  const referenceDate = subDays(todayDate, 1);
  const mostRecentTuesday = startOfWeek(referenceDate, { weekStartsOn: 2 });
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
    let htmlOutput = [];
    const linksByTag = {};
    const untaggedLinks = [];

    data.items.forEach(item => {
      const markdownLink = `[${item.title}](${item.link})`;
      const description = item.note ? ` - ${item.note.replace(/\n/g, ' ')}` : '';
      const markdownLine = `- ${markdownLink}${description}`;

      const escapedTitle = item.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const escapedLink = item.link.replace(/&/g, '&amp;');
      const escapedDescription = item.note ? ` - ${item.note.replace(/\n/g, ' ').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}` : '';
      const htmlLine = `<li><a href="${escapedLink}">${escapedTitle}</a>${escapedDescription}</li>`;

      if (item.tags && item.tags.length > 0) {
        item.tags.forEach(tag => {
          if (!linksByTag[tag]) {
            linksByTag[tag] = { markdown: [], html: [] };
          }
          linksByTag[tag].markdown.push(markdownLine);
          linksByTag[tag].html.push(htmlLine);
        });
      } else {
        untaggedLinks.push({ markdown: markdownLine, html: htmlLine });
      }
    });

    for (const tag in linksByTag) {
      const header = tag.charAt(0).toUpperCase() + tag.slice(1);
      markdownOutput.push(`## ${header}\n`);
      linksByTag[tag].markdown.forEach(line => markdownOutput.push(line));
      markdownOutput.push("\n");

      htmlOutput.push(`<h2>${header}</h2><ul>`);
      linksByTag[tag].html.forEach(line => htmlOutput.push(line));
      htmlOutput.push('</ul>');
    }

    if (untaggedLinks.length > 0) {
      markdownOutput.push("## General Links\n");
      untaggedLinks.forEach(item => markdownOutput.push(item.markdown));
      markdownOutput.push("\n");

      htmlOutput.push('<h2>General Links</h2><ul>');
      untaggedLinks.forEach(item => htmlOutput.push(item.html));
      htmlOutput.push('</ul>');
    }

    const fullMarkdown = markdownOutput.join('\n');
    const fullHtml = htmlOutput.join('\n');
    const filename = `${filenameDate} - links for newsletter.md`;

    return {
        markdown: fullMarkdown,
        html: fullHtml,
        count: data.items.length,
        filename: filename
    };
}
