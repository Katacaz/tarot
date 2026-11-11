# Arcana Signal — tarot keychain website

A mobile-friendly, dependency-free GitHub Pages starter. No build command, package manager, database or accounts needed.

## How it behaves
- Homepage `/tarot/`: **guest mode**, no bound Arcana; click to reveal a daily card.
- `/tarot/?id=01` through `?id=22`: shows a bound Arcana and a separate daily card.
- Deterministically shuffles all 22 Major Arcana for each date in **Australia/Brisbane** time. For any given day, the 22 numbered keychains receive 22 *different* daily cards. A repeated visit on the same day returns the same card.
- IDs 01–22 are fixed to the traditional Major Arcana sequence, starting at The Fool and ending at The World. Guest mode independently selects one daily card; it can overlap with a numbered keychain.
- Unknown or malformed `id` values fall back to guest mode. NFC IDs are **not security tokens**; anyone can modify the URL to view another ID.

## Publish to GitHub Pages
1. Make a **public** GitHub repository (example name: `tarot`) and put **the files inside this folder** in the repository root, not the enclosing directory.
2. In repo **Settings → Pages → Build and deployment**, select **Deploy from a branch**.
3. Choose branch **main**, folder **/(root)**, and **Save**.
4. Visit `https://YOUR-USERNAME.github.io/tarot/` and test `https://YOUR-USERNAME.github.io/tarot/?id=07`.
5. Only program NFC stickers once the final URL is confirmed to work.

If you choose a different repository name, replace `tarot` in the example URLs with that repository name. All code uses relative asset paths so this works for project Pages sites.

## Working locally
Simply open `index.html` in a browser. For a more realistic local test, in this folder run `python -m http.server 8000` and visit `http://localhost:8000/`.

## Customise
- `index.html`: structure and on-screen copy
- `style.css`: colours, typography, layout, mobile breakpoints, animations
- `tarot.js`: card names, interpretations, daily shuffle, ID handling, timezone
- `assets/cards/`: 22 editable SVG **placeholders**; replace with artwork as PNG/JPG/WebP/SVG. If you change file names or extensions, update the `image` field generation in `tarot.js`.

**Important:** If tags have already been programmed, **don't change the mapping of ID numbers to physical cards**. Avoid changing `arcana-signal-v1` after launch unless you deliberately want to change the sequence of daily readings. The daily reading is predetermined per day, not a truly random draw each scan.

## Mobile and NFC
Use NDEF URL records in writable NTAG215 tags. Test actual NFC scan both before and after assembling each fob. Some phones require the screen to be unlocked. Browsers don't need an NFC app to open normal URL records.

## Design / usage notes
- Inspired by high-contrast, diagonal, stylish JRPG UI aesthetics, not copied Persona artwork, logos or assets.
- The provided SVGs are original placeholder designs, not tarot illustrations or memes. Replace them with assets you're licensed to use.
- This is entertainment, not advice.
- The site is fully static, publicly accessible, and does not track visits or users. GitHub can still have its own standard hosting logs.
