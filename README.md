# Oda Wine Bar — Sommelier App
## Deployment Guide

---

## Step 1 — Get your Anthropic API key (5 min)

1. Go to **console.anthropic.com** and create an account
2. Click **API Keys** in the left sidebar → **Create Key**
3. Copy the key — it starts with `sk-ant-...`
4. Add a credit card under **Billing** — add $10 to start
   - Each wine recommendation costs ~$0.003, so $10 = ~3,000 recommendations

---

## Step 2 — Create a GitHub account (3 min)

1. Go to **github.com** → Sign up with your email
2. Free account is all you need

---

## Step 3 — Upload your code to GitHub (5 min)

1. On GitHub, click **+** top right → **New repository**
2. Name it `oda-wine-app`, set to **Private** → **Create repository**
3. Click **uploading an existing file**
4. Unzip `oda-wine-app.zip` on your computer
5. Open the `oda-wine-app` folder — drag **all files and folders inside** into GitHub
6. Click **Commit changes**

---

## Step 4 — Deploy on Vercel (5 min)

1. Go to **vercel.com** → Sign up with your GitHub account
2. Click **Add New Project**
3. Find `oda-wine-app` → click **Import**
4. Leave all settings as default → click **Deploy**
5. Wait ~60 seconds — Vercel builds automatically
6. You'll get a live URL like `oda-wine-app.vercel.app` — copy this, you'll need it

---

## Step 5 — Add your API key (2 min)

1. In Vercel → your project → **Settings** → **Environment Variables**
2. Add:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** your `sk-ant-...` key
3. Click **Save**
4. Go to **Deployments** → three dots on latest deploy → **Redeploy**

---

## Step 6 — Make Google Docs public (2 min)

For each of your 3 docs (glass list, bottle list, food menu):

1. Open the doc → click **Share**
2. Under **General access** → change to **Anyone with the link**
3. Set to **Viewer** → **Done**

---

## Step 7 — Generate your QR code (3 min)

This is what guests scan at the table or bar to open the app.

1. Go to **qr-code-generator.com** (free, no account needed)
2. Select **URL** as the type
3. Paste your Vercel URL (e.g. `https://oda-wine-app.vercel.app`)
   - If you added a custom domain (see Step 8), use that instead
4. Click **Download** → choose **PNG** at high resolution (300 dpi or SVG)
5. **Print options:**
   - Table tent cards — print one per table
   - Sticker on the menu
   - A-frame at the bar
   - Add to your menu PDF

> **Tip:** In the QR generator, you can customize the color to match Oda's branding — use black on white or white on black for best scannability.

---

## Step 8 — Add a custom domain (optional, 10 min)

Instead of `oda-wine-app.vercel.app` you can use something like `wines.odawinebar.com`:

1. In Vercel → **Settings** → **Domains** → type your domain → **Add**
2. Vercel shows you DNS records to add
3. Log into your domain provider (GoDaddy, Squarespace, etc.)
4. Add the DNS records Vercel gives you
5. Takes ~10 minutes to go live
6. **Regenerate your QR code** with the new domain URL

---

## Updating your wine or food lists

Just edit the Google Doc — no code changes, no redeployment needed.
The app fetches the latest version every time a guest opens it.

- **Wine by the glass:** docs.google.com/document/d/1PMvZ6JRQJoAedXmqpTCpam8gfACQG4gDBdc1M_B09LY
- **Wine by the bottle:** docs.google.com/document/d/17-iJ_TwabTE_YgEttHxELJpfHR0BLzczv077H7HU5i8
- **Food menu:** docs.google.com/document/d/1kt9L6nsaMU0v2NDwb0fIk6BqWCoOBNCIXGEjEyTMTjk

---

## Estimated costs

| Item | Cost |
|------|------|
| Vercel hosting | Free |
| Anthropic API | ~$0.003 per recommendation |
| Custom domain | ~$12/year (if you want one) |
| QR code | Free |

**Example:** 100 guests per night, each gets 2 recommendations = ~$0.60/night
