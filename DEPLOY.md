# Deployment Instructions

This web app can be easily deployed to Vercel, Render, or Netlify.

## Platform Comparison

| Feature | Vercel (Recommended) | Render | Netlify |
| :--- | :--- | :--- | :--- |
| **Setup** | Easiest (Zero Config) | Easy | Easy (Requires Config) |
| **Speed** | Very Fast | Fast | Fast |
| **Free Tier** | Generous | Generous but "sleeps" | Generous |
| **Cold Starts** | Fast | Slow (on free tier) | Fast |

**Why Vercel?**
Vercel is recommended because it has native support for Node.js apps with zero configuration. It's extremely fast and the free tier is excellent for personal projects.

**Why not Render?**
Render's free tier "spins down" after inactivity, meaning the first request after a while can take 30+ seconds to load. This is fine for personal use but can be annoying.

**Why Netlify?**
Netlify is great and very similar to Vercel. It requires a small adapter (`serverless-http`) to run Express apps, which we have included.

## Vercel (Recommended)

1.  **Push your code to GitHub.**
2.  **Log in to Vercel** and click "Add New..." > "Project".
3.  **Import your repository.**
4.  **Configure Project:**
    *   **Framework Preset:** Other
    *   **Build Command:** `npm install` (or leave default)
    *   **Output Directory:** `public` (or leave default)
    *   **Environment Variables:** Add the following variables from your `.env` file (Optional, as you can enter them in the app):
        *   `RAINDROP_API_TOKEN`
        *   `RAINDROP_COLLECTION_ID`
5.  Click **Deploy**.

## Render

1.  **Push your code to GitHub.**
2.  **Log in to Render** and click "New" > "Web Service".
3.  **Connect your repository.**
4.  **Configure Service:**
    *   **Runtime:** Node
    *   **Build Command:** `npm install`
    *   **Start Command:** `node server.js`
    *   **Environment Variables:** Add your `RAINDROP_API_TOKEN` and `RAINDROP_COLLECTION_ID` (Optional).
5.  Click **Create Web Service**.

## Netlify

1.  **Push your code to GitHub.**
2.  **Log in to Netlify** and click "Add new site" > "Import an existing project".
3.  **Connect to GitHub** and select your repository.
4.  **Configure Site:**
    *   **Build command:** `npm install`
    *   **Publish directory:** `public`
    *   **Functions directory:** `functions` (Netlify should detect this automatically from `netlify.toml`)
5.  Click **Deploy site**.

## Local Development

1.  Run `npm start`.
2.  Open `http://localhost:3000`.
