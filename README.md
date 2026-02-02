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
   Put the image (e.g. `my-painting.jpg` or `.png`) in **`public/images/`**. Then run **`npm run optimize-images`** to resize and compress it for faster loading (max 1200px, good quality).

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
   Run `npm run build`, then push to your Git repo. The site is deployed via GitHub Actions on push to `main`.

---

## Deploying

This repo is set up for **GitHub Pages**: push to `main` and the workflow in `.github/workflows/deploy.yml` builds and deploys. In the repo go to **Settings** → **Pages** → Source: **GitHub Actions**. To use a custom domain, add it under **Pages** → Custom domain and configure the DNS records your host shows at your registrar.

---

## Project structure

- `public/images/` – artwork image files  
- `src/data/gallery.json` – list of gallery items (add new art here)  
- `src/pages/index.astro` – homepage and gallery  
- `src/layouts/Layout.astro` – layout and lightbox  
- `src/styles/global.css` – gaming-themed styles  
- `netlify.toml` – Netlify build config  
- `.github/workflows/deploy.yml` – GitHub Pages deploy workflow  
- `scripts/optimize-images.mjs` – resize/compress images (run `npm run optimize-images` when adding new art)  

---

## License

Private/family use.
