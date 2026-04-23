/**
 * generate-manifest.js
 *
 * Scans the /images folder and updates the GALLERY_IMAGES array
 * inside gallery.html so the carousel works locally and on Cloudflare.
 *
 * Run whenever you add or remove images:
 *   node generate-manifest.js
 */

const fs   = require('fs');
const path = require('path');

const IMAGE_DIR  = path.join(__dirname, 'images');
const GALLERY    = path.join(__dirname, 'gallery.html');
const EXTS       = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']);

const files = fs.readdirSync(IMAGE_DIR)
  .filter(f => EXTS.has(path.extname(f).toLowerCase()))
  .sort();

// Build the JS array string
const arrayStr = '[\n' + files.map(f => '  "' + f + '"').join(',\n') + '\n]';

// Patch gallery.html — replace the array between the sentinel comments
let html = fs.readFileSync(GALLERY, 'utf8');
html = html.replace(
  /var GALLERY_IMAGES = \[[\s\S]*?\];/,
  'var GALLERY_IMAGES = ' + arrayStr + ';'
);
fs.writeFileSync(GALLERY, html);

// Also write manifest.json for reference
fs.writeFileSync(
  path.join(IMAGE_DIR, 'manifest.json'),
  JSON.stringify({ images: files }, null, 2)
);

console.log('✓ gallery.html updated — ' + files.length + ' image(s):');
files.forEach(f => console.log('  • ' + f));
