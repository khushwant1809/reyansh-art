#!/usr/bin/env node
/**
 * Resize and compress images in public/images/ for faster loading.
 * Max width 1200px, JPEG quality 82. Run when you add new photos.
 */
import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = join(__dirname, '..', 'public', 'images');
const MAX_WIDTH = 1200;
const JPEG_QUALITY = 82;

const EXTENSIONS = new Set(['.jpg', '.jpeg', '.png']);

async function optimizeImages() {
  let files;
  try {
    files = await readdir(IMAGES_DIR);
  } catch (err) {
    console.error('Could not read images directory:', err.message);
    process.exit(1);
  }

  const imageFiles = files.filter((f) => EXTENSIONS.has(extname(f).toLowerCase()));
  if (imageFiles.length === 0) {
    console.log('No images to optimize in public/images/');
    return;
  }

  console.log(`Optimizing ${imageFiles.length} image(s)...`);
  for (const file of imageFiles) {
    const inputPath = join(IMAGES_DIR, file);
    const ext = extname(file).toLowerCase();
    try {
      const before = (await stat(inputPath)).size;
      let pipeline = sharp(inputPath);
      const meta = await pipeline.metadata();
      const needsResize = meta.width > MAX_WIDTH || meta.height > MAX_WIDTH;
      const tmpPath = inputPath + '.opt-tmp';

      if (ext === '.png') {
        pipeline = pipeline
          .resize(needsResize ? MAX_WIDTH : undefined, needsResize ? MAX_WIDTH : undefined, { fit: 'inside' })
          .png({ quality: 80, compressionLevel: 9 });
      } else {
        pipeline = pipeline
          .resize(needsResize ? MAX_WIDTH : undefined, needsResize ? MAX_WIDTH : undefined, { fit: 'inside' })
          .jpeg({ quality: JPEG_QUALITY, mozjpeg: true });
      }
      await pipeline.toFile(tmpPath);

      const { rename, unlink } = await import('fs/promises');
      await unlink(inputPath).catch(() => {});
      await rename(tmpPath, inputPath);
      const after = (await stat(inputPath)).size;
      const saved = ((1 - after / before) * 100).toFixed(1);
      console.log(`  ${file}: ${(before / 1024).toFixed(1)} KB → ${(after / 1024).toFixed(1)} KB (${saved}% smaller)`);
    } catch (err) {
      console.error(`  ${file}: ${err.message}`);
    }
  }
  console.log('Done.');
}

optimizeImages();
