## Tarot Chain - tarot keychain website

A relatively simple web project which allows the drawing of a daily tarot reading to give insight into your day. Developed purely as a small project intended to be utilised alongside a set of keychains.

## How it works
- Homepage `/tarot/`: **guest mode**, no bound Arcana; click to reveal a daily card.
- `/tarot/?id=01` through `?id=22`: shows a bound Arcana and a separate daily card.
- Deterministically shuffles all 22 Major Arcana for each date in **Australia/Brisbane** time. For any given day, the 22 numbered keychains receive 22 *different* daily cards. A repeated visit on the same day returns the same card.
- IDs 01–22 are fixed to the traditional Major Arcana sequence, starting at The Fool and ending at The World. Guest mode independently selects one daily card; it can overlap with a numbered keychain.
- Unknown or malformed `id` values fall back to guest mode. NFC IDs are **not security tokens**; anyone can modify the URL to view another ID.

## Development Notes

This project was developed through the use of AI-tools, it is not intended to be further developed or maintained in future once all core features are set.