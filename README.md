# Reyansh Art Portfolio

A static gallery site for Reyansh's paintings and drawings, with a gaming (Roblox / Minecraft) inspired theme. Built with [Astro](https://astro.build/).

## Quick start

1. **Install dependencies** (requires [Node.js](https://nodejs.org/) 18+):
   ```bash
   npm install
   ```

2. **Run locally**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:4321](http://localhost:4321).

3. **Build for production**:
   ```bash
   npm run build
   ```
   Output is in the `dist/` folder.

---

## Adding new art

To add a new painting or drawing:

1. **Add the image file**  
   Put the image (e.g. `my-painting.jpg` or `.png`) in **`public/images/`**.

2. **Add an entry to the gallery**  
   Edit **`src/data/gallery.json`** and add a new object (use the next `id` and your image path):
   ```json
   {
     "id": "4",
     "title": "Your artwork title",
     "date": "2025-02-01",
     "image": "/images/my-painting.jpg",
     "medium": "Acrylic"
   }
   ```
   - `id`: unique string (e.g. `"4"`, `"5"`).  
   - `title`: name of the piece.  
   - `date`: any date string (e.g. `YYYY-MM-DD`).  
   - `image`: path from site root, e.g. `/images/filename.jpg`.  
   - `medium`: optional (e.g. Watercolor, Digital).

3. **Rebuild and deploy**  
   Run `npm run build`, then push to your Git repo. Netlify or GitHub Pages will rebuild and publish the updated site.

You can replace the placeholder images in `public/images/` (art1.svg, art2.svg, art3.svg) with real photos of Reyansh's art; just update the `image` paths in `gallery.json` if you change filenames.

---

## Deploying and custom domain (reyansh.art from Porkbun)

### Step 1: Deploy the site first

**Option A: Netlify**

1. Push this repo to GitHub (or GitLab).
2. Log in at [netlify.com](https://www.netlify.com/) → **Add new site** → **Import an existing project**.
3. Connect your repo. Build command: `npm run build`. Publish directory: `dist`.
4. Deploy. You’ll get a URL like `something.netlify.app`.

**Option B: GitHub Pages**

1. Push this repo to GitHub.
2. In the repo: **Settings** → **Pages** → Source: **GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` will build and deploy on every push to `main`.
4. Your site will be at `https://<username>.github.io/<repo-name>/` until you add the custom domain.

### Step 2: Add reyansh.art in your host

- **Netlify:** Site settings → **Domain management** → **Add custom domain** → enter `reyansh.art`. Netlify will show the DNS records to use below.
- **GitHub Pages:** Repo → **Settings** → **Pages** → **Custom domain** → enter `reyansh.art` and save. GitHub will show the DNS record (usually one CNAME or one A record).

### Step 3: Point reyansh.art at the host (Porkbun)

1. Log in at [porkbun.com](https://porkbun.com) → **Account** → **Domain List** → click **reyansh.art** → **DNS** (or **Manage DNS**).
2. Add the records your host gave you:

   **If using Netlify:**
   - **A** — Name: `@` (or leave blank) — Value: `75.2.60.5` (Netlify’s load balancer).
   - **CNAME** — Name: `www` — Value: `your-site-name.netlify.app` (replace with your actual Netlify subdomain).
   - Remove any conflicting A or CNAME for `@` or `www` if Porkbun added defaults.

   **If using GitHub Pages:**
   - **A** — Name: `@` — Value: `185.199.108.153` (and optionally `185.199.109.153`, `185.199.110.153`, `185.199.111.153` for redundancy).
   - **CNAME** — Name: `www` — Value: `YOUR_USERNAME.github.io` (replace with your GitHub username).
   - Or follow exactly what GitHub shows under **Pages** → **Custom domain**.

3. Save. DNS can take 5–60 minutes (sometimes longer). The host will issue a free SSL certificate once DNS is correct.

---

## Domain: check and buy

Suggested names (check availability on [Namecheap](https://namecheap.com/domains/domain-name-search) or [GoDaddy](https://www.godaddy.com/domains)):

- **reyansh.art** – great for an art portfolio  
- **reyansh.com** – classic  
- **artbyreyansh.com** – descriptive fallback  

**Where to buy:** Namecheap or Porkbun (often good prices and free WHOIS privacy). Enable WHOIS privacy when you buy. Compare 5-year total cost (first year + renewals), not just the first year.

After you buy a domain, follow the “Custom domain” steps above for your chosen host (Netlify or GitHub Pages).

---

## Project structure

- `public/images/` – artwork image files  
- `src/data/gallery.json` – list of gallery items (add new art here)  
- `src/pages/index.astro` – homepage and gallery  
- `src/layouts/Layout.astro` – layout and lightbox  
- `src/styles/global.css` – gaming-themed styles  
- `netlify.toml` – Netlify build config  
- `.github/workflows/deploy.yml` – GitHub Pages deploy workflow  

---

## License

Private/family use. Replace placeholder art with Reyansh’s real work and publish when ready.
