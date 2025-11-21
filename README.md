# Raindrop to Newsletter Web App

This is a web application that fetches bookmarks from a specific Raindrop.io collection over a defined date range. It formats these links into a Markdown file, grouped by tag, making it easy to copy and paste into a newsletter.

I personally recommend using [Buttondown](https://buttondown.email/refer/lemoncasting) for your email newsletter writing and sending, but anything that supports Markdown will work.

**It was coded using Gemini 3 Pro. Use at your own risk.**

## Features

*   **Web Interface**: Easy-to-use web interface to generate your newsletter.
*   **Secure**: Enter your API Token and Collection ID directly in the browser. Credentials can be saved to your local browser storage for convenience.
*   **Weekly Links**: Fetches links for a weekly period (from the most recent Tuesday to the upcoming Monday).
*   **Grouped by Tag**: Groups all links by their tags into Markdown H2 (`##`) headings.
*   **Notes Included**: Uses the **Note** field from Raindrop as the description for each link.
*   **Clipboard Copy**: One-click button to copy the generated Markdown to your clipboard.

## Requirements

*   [Node.js](https://nodejs.org/) (v18 or later)
*   A [Raindrop.io account](https://raindrop.io)
*   A [Raindrop.io API Token](https://app.raindrop.io/settings/integrations)

## Setup Instructions

1.  **Clone this repository:**
    ```bash
    git clone https://github.com/ichris/raindrop-to-newsletter.git
    cd raindrop-to-newsletter
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the server:**
    ```bash
    npm start
    ```

4.  **Open the app:**
    Open your browser and go to `http://localhost:3000`.

## Usage

1.  **Enter Credentials**:
    *   **API Token**: Get this from [Raindrop Settings > Integrations > For Developers](https://app.raindrop.io/settings/integrations).
    *   **Collection ID**: Open your collection on Raindrop.io. The ID is the number at the end of the URL (e.g., `app.raindrop.io/my/12345678`).

2.  **Generate**: Click "Generate links from last week".

3.  **Copy**: Click "Copy to Clipboard" and paste it into your newsletter editor.

## Deployment

This app is ready to be deployed to Vercel or Render. See [DEPLOY.md](DEPLOY.md) for detailed instructions.

## Legacy CLI Usage

You can still use the CLI if you prefer. Create a `.env` file with your credentials (see `.env.example`) and run:

```bash
npm run cli
```
