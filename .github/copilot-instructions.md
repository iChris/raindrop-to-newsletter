# Raindrop to Newsletter - AI Agent Instructions

This document guides AI coding agents on the key patterns and workflows of this Node.js script that generates newsletter content from Raindrop.io bookmarks.

## Project Overview

This is a Node.js script that:
1. Fetches bookmarks from a Raindrop.io collection within a specific date range (Tuesday to Monday)
2. Groups the links by their tags
3. Formats them into a Markdown file suitable for newsletter content

Key files:
- `index.js` - Main script containing all the logic
- `.env` - Environment configuration (API token and collection ID)

## Environment & Dependencies

- Uses ES Modules (note `"type": "module"` in `package.json`)
- Requires Node.js v18+ for native fetch support
- Key dependencies:
  - `date-fns` - Date manipulation
  - `dotenv` - Environment variable management

## Core Patterns

### Date Handling
- Script uses Tuesday as the start of the week
- Date calculations in `index.js` use `date-fns` functions:
```javascript
const mostRecentTuesday = startOfWeek(todayDate, { weekStartsOn: 2 });
const nextMonday = addDays(mostRecentTuesday, 6);
```

### API Integration
- API calls use native fetch with bearer token authentication
- Error handling includes specific checks for:
  - Missing environment variables
  - API response status
  - Empty result sets

### Output Formatting
- Links are grouped by tags into H2 (`##`) sections
- Untagged links go into a "General Links" section
- Each link follows the format:
```markdown
- [Title](URL) - Description from note field
```

## Working with the Code

### Development Setup
1. Copy `.env.example` to `.env`
2. Configure Raindrop.io credentials:
   - `RAINDROP_API_TOKEN` from Raindrop.io Developer settings
   - `RAINDROP_COLLECTION_ID` from collection URL

### Running the Script
```bash
node index.js
```
This creates a date-stamped markdown file (e.g., `2025-11-04 - links for newsletter.md`)

### Error Cases to Handle
- Missing or invalid environment variables
- API authentication failures
- No links found in the date range
- Network connectivity issues

## Extension Points

When modifying the code, consider these common enhancement areas:
- Custom date ranges beyond the Tuesday-Monday week
- Additional metadata from Raindrop.io API
- Different grouping strategies beyond tags
- Alternative output formats beyond Markdown