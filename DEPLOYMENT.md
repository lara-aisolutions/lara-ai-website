# LARA.ai — Deployment Guide

**Domain:** lara-ai.in (registered at Hostinger under latika.sharmav@gmail.com)
**Hosting:** Cloudflare Pages (free tier, forever)
**Deployment account:** ravi.verma@lara-ai.in
**Contact form:** Formspree (free tier)

---

## Overview

The website is a fully static site (HTML + CSS + JS, no backend).
Deployment flow: **GitHub repo → Cloudflare Pages → custom domain via DNS**

```
Your computer
    ↓  git push
GitHub (lara-ai-website repo)
    ↓  automatic deploy on every push
Cloudflare Pages
    ↓  serves the site
lara-ai.in  ←  DNS at Hostinger points here
```

---

## PART 1 — Formspree (do this first)

Formspree handles your contact form. You need a free account and a form ID.

### Steps

1. Go to **https://formspree.io** and click **Sign Up**.
2. Use the email **ravi.verma@lara-ai.in** to register.
3. Verify your email address via the confirmation link.
4. Once logged in, click **New Form**.
5. Name it: `LARA.ai Contact Form` — and set the email to **ravi.verma@lara-ai.in**.
6. Copy the **Form Endpoint** — it looks like: `https://formspree.io/f/abcdefgh`
7. Open `index.html` in any text editor and find this line:

   ```html
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```

8. Replace `YOUR_FORM_ID` with the actual ID from step 6. Example:

   ```html
   action="https://formspree.io/f/abcdefgh"
   ```

9. Save the file.

That's it. Form submissions from the website will now arrive at ravi.verma@lara-ai.in.

---

## PART 2 — GitHub Setup

GitHub will be your code host. Cloudflare Pages connects directly to it.

### 2a. Create a GitHub account (if you don't have one)

1. Go to **https://github.com** and click **Sign Up**.
2. Use the email **ravi.verma@lara-ai.in**.
3. Choose a username (e.g., `lara-ai-studio` or `ravi-lara-ai`).
4. Verify your email.

### 2b. Create a new repository

1. Once logged in, click the **+** icon (top right) → **New repository**.
2. Repository name: **`lara-ai-website`**
3. Set visibility to **Public** (required for Cloudflare Pages free tier).
4. Do NOT add a README, .gitignore, or license — the files already exist locally.
5. Click **Create repository**.
6. GitHub will show you a set of commands. Copy the repo URL
   (it looks like: `https://github.com/YOUR_USERNAME/lara-ai-website.git`).

### 2c. Push the project to GitHub

Open Terminal and run these commands one by one:

```bash
# Navigate to the project folder
cd "/Users/raviverma/Library/Mobile Documents/com~apple~CloudDocs/LARA-ai Website"

# Initialize git
git init

# Stage all files
git add index.html style.css script.js .gitignore DEPLOYMENT.md experience.md
git add logo/

# Create the first commit
git commit -m "Initial commit: LARA.ai production website"

# Add GitHub as the remote (replace YOUR_USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/lara-ai-website.git

# Push
git branch -M main
git push -u origin main
```

Your files are now on GitHub. Every time you make changes later, run:

```bash
git add .
git commit -m "Brief description of what changed"
git push
```

Cloudflare Pages will automatically redeploy within 30 seconds.

---

## PART 3 — Cloudflare Pages Setup

### 3a. Create a Cloudflare account

1. Go to **https://pages.cloudflare.com** and click **Sign Up**.
2. Use the email **ravi.verma@lara-ai.in**.
3. Verify your email.

### 3b. Create a new Pages project

1. From the Cloudflare dashboard, click **Pages** in the left sidebar.
2. Click **Create a project** → **Connect to Git**.
3. Click **Connect GitHub** and authorise Cloudflare to access your GitHub account.
4. Select the **`lara-ai-website`** repository.
5. Click **Begin setup**.

### 3c. Configure the build

On the build settings page:

| Setting | Value |
|---|---|
| Project name | `lara-ai-website` |
| Production branch | `main` |
| Framework preset | **None** (select "None" — this is a static site) |
| Build command | *(leave empty)* |
| Build output directory | *(leave empty or type `/`)* |

Click **Save and Deploy**.

Cloudflare will deploy your site. After 1–2 minutes it will be live at a URL like:
`https://lara-ai-website.pages.dev`

Open that URL to verify the site looks correct.

---

## PART 4 — Add Your Custom Domain (lara-ai.in)

### 4a. Add the domain in Cloudflare Pages

1. In Cloudflare Pages, open your `lara-ai-website` project.
2. Click the **Custom domains** tab.
3. Click **Set up a custom domain**.
4. Type: `lara-ai.in` and click **Continue**.
5. Also add `www.lara-ai.in` as a second custom domain (optional but recommended for redirects).
6. Cloudflare will show you DNS records to add. **Keep this page open** — you'll need the values.

### 4b. Update DNS in Hostinger

Your domain lara-ai.in is registered at Hostinger. You need to log in there and add the DNS records Cloudflare gives you.

1. Go to **https://www.hostinger.com** and log in with **latika.sharmav@gmail.com**.
2. Click **Domains** → click **lara-ai.in** → **DNS / Nameservers**.
3. You need to add (or update) CNAME records. Cloudflare will show you the exact values
   on their "Custom domains" page. They will look like this:

**For the root domain (`lara-ai.in`):**

Hostinger may not support a CNAME for the root domain. In that case, Cloudflare Pages
provides two `A` records to add instead:

| Type | Name | Value |
|---|---|---|
| A | @ | 192.0.2.1 *(use the IP Cloudflare shows you)* |
| CNAME | www | lara-ai-website.pages.dev |

> **Important:** Use the exact IP addresses or CNAME values that Cloudflare Pages shows
> you on the custom domain setup page — do not use the placeholder values above.

**Typical record for a CNAME-compatible setup:**

| Type | Name | Value | TTL |
|---|---|---|---|
| CNAME | @ | lara-ai-website.pages.dev | Auto |
| CNAME | www | lara-ai-website.pages.dev | Auto |

4. Save the DNS records in Hostinger.

### 4c. Wait for DNS propagation

DNS changes take **5 minutes to 48 hours** to take effect worldwide (usually under 30 minutes).

You can check if it's propagating at: **https://dnschecker.org** — search for `lara-ai.in`.

Once propagated, visiting **https://lara-ai.in** will load your LARA.ai website.

### SSL / HTTPS

Cloudflare Pages provides free SSL automatically. No setup needed — your site will be served
over HTTPS as soon as the domain is connected.

---

## PART 5 — After Launch Checklist

- [ ] Formspree form ID replaced in `index.html`
- [ ] Test the contact form by submitting a test message
- [ ] Check form submission arrived at ravi.verma@lara-ai.in
- [ ] Verify the site loads at https://lara-ai.in
- [ ] Verify SSL padlock appears in browser
- [ ] Test the site on a mobile device
- [ ] Check all nav links scroll to the correct sections
- [ ] Confirm logo images load correctly
- [ ] Check favicon shows in browser tab
- [ ] Test the incpuducherry.in link in the Products section
- [ ] Share the URL with Anthropic partner contact

---

## Making Updates Later

Whenever you want to update the website:

1. Edit the files locally (index.html, style.css, etc.)
2. Open Terminal and run:

```bash
cd "/Users/raviverma/Library/Mobile Documents/com~apple~CloudDocs/LARA-ai Website"
git add .
git commit -m "What you changed"
git push
```

3. Cloudflare Pages will automatically detect the push and redeploy within 30–60 seconds.
4. Hard-refresh your browser (Cmd+Shift+R on Mac) to see the changes.

---

## Costs

| Service | Cost |
|---|---|
| Cloudflare Pages | **Free** forever (static sites, no bandwidth limits) |
| Formspree | **Free** tier: 50 submissions/month. Upgrade to paid ($10/mo) if you need more. |
| GitHub | **Free** for public repositories |
| Hostinger domain (lara-ai.in) | You already own this — renewal cost only |

Total monthly cost to run lara-ai.in: **$0**

---

## Support Contacts

- **Cloudflare Pages docs:** https://developers.cloudflare.com/pages/
- **Formspree docs:** https://help.formspree.io/
- **GitHub docs:** https://docs.github.com/en/get-started
- **Hostinger DNS help:** https://support.hostinger.com → search "DNS records"
- **LARA.ai tech contact:** ravi.verma@lara-ai.in
