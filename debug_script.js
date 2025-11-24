
import { getNewsletterData } from './index.js';

async function run() {
    const apiToken = "dae5c2fa-a9e7-41f8-9e4e-3971d5a941a9";
    const collectionId = "62882736";

    console.log("Testing getNewsletterData directly...");
    try {
        const result = await getNewsletterData(apiToken, collectionId);
        console.log("Result:", result);
    } catch (error) {
        console.error("Error:", error);
    }
}

run();
