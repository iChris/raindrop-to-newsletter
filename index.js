// 1. Import the functions you need
import { writeFile } from 'fs/promises';
import path from 'path';
import 'dotenv/config'; // <-- 1. LOAD THE .env FILE
import { getNewsletterData } from './lib/newsletter.js';

// --- Configuration ---
// 2. READ THE VARIABLES FROM 'process.env'
// const API_TOKEN = process.env.RAINDROP_API_TOKEN;
// const COLLECTION_ID = process.env.RAINDROP_COLLECTION_ID;
// ---

async function main() {
  // 2. READ THE VARIABLES FROM 'process.env'
  const API_TOKEN = process.env.RAINDROP_API_TOKEN;
  const COLLECTION_ID = process.env.RAINDROP_COLLECTION_ID;

  // Add a check to make sure variables were loaded
  if (!API_TOKEN || !COLLECTION_ID) {
    console.error("\n--- ❌ Error: Secrets not found! ---");
    console.error("Please make sure you have a .env file with RAINDROP_API_TOKEN and RAINDROP_COLLECTION_ID.");
    return;
  }

    try {
        const result = await getNewsletterData(API_TOKEN, COLLECTION_ID);
        
        if (result.count === 0) {
             console.log("\n--- 🟡 No links found for this date range. ---");
             return;
        }

        // --- 2. Save to File ---
        const filePath = path.join(process.cwd(), result.filename);
        await writeFile(filePath, result.markdown);

        // --- 3. Log Success to Terminal ---
        console.log("\n--- ✅ Success! ---");
        console.log(`Saved ${result.count} links to: ${filePath}`);

    } catch (error) {
        console.error("\n--- ❌ Error running script ---");
        console.error(error.message);
    }
}

// 6. Run the main function if executed directly
import { fileURLToPath } from 'url';
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}