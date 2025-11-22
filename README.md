# Raindrop.io Newsletter Script

This is a simple Node.js script that fetches bookmarks from a specific Raindrop.io collection over a defined date range. It formats these links into a Markdown file, grouped by tag, making it easy to copy and paste into a newsletter.

I personally recommend using [Buttondown](https://buttondown.email/refer/lemoncasting) for your email newsletter writing and sending, but anything that supports Markdown will work.

**It was coded using Gemini 2.5 Pro. Use at your own risk.**

[![Netlify Status](https://api.netlify.com/api/v1/badges/92b28f76-2651-43bd-a030-749d201e6b51/deploy-status)](https://app.netlify.com/projects/raindroptonewsletter/deploys)

## Features

* Pulls links from a specific Raindrop.io collection.
* Fetches links for a weekly period (from the most recent Tuesday to the upcoming Monday).
* Groups all links by their tags into Markdown H2 (`##`) headings.
* Uses the **Note** field from Raindrop as the description for each link.
* Saves the output to a date-stamped Markdown file (e.g., `2025-11-04 - links for newsletter.md`).
* Securely uses an `.env` file for your API token and collection ID.

## Requirements

* [Node.js](https://nodejs.org/) (v18 or later)
* A [Raindrop.io account](https://raindrop.io)
* A [Raindrop.io API Token](https://app.raindrop.io/settings/integrations)

## Setup Instructions

1.  **Clone this repository:**
    ```bash
    git clone [https://github.com/ichris/your-repo-name.git](https://github.com/ichris/your-repo-name.git)
    cd your-repo-name
    ```

2.  **Install dependencies:**
    This project uses `date-fns` and `dotenv`.
    ```bash
    npm install
    ```

3.  **Create your environment file:**
    Create a file named `.env` in the project's root folder. This file will securely store your API keys and is **ignored by Git** (it will not be uploaded).

    You can copy the example:
    ```bash
    cp .env.example .env
    ```

    Your `.env` file **must** contain the following:

    ```
    # Get this from your Raindrop.io account > Settings > For Developers
    RAINDROP_API_TOKEN=YOUR_API_TOKEN_GOES_HERE

    # Get this by opening your collection on Raindrop.io
    # The URL will be https://app.raindrop.io/my/12345678
    RAINDROP_COLLECTION_ID=YOUR_COLLECTION_ID_GOES_HERE
    ```

## Usage

Once your `.env` file is set up, just run the script:

```bash
node index.js
