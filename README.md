## Tarot Chain — tarot keychain website

Tarot Chain is a daily Major Arcana reading designed to accompany a set of physical keychains. It combines one shared card of the day with personal and celestial modifiers.

## How it works

- Homepage `/tarot/`: **guest mode**, with an Unbound modifier and a shared daily card.
- `/tarot/?id=01` through `?id=22`: binds one permanent Arcana to the reading.
- Everyone receives the same deterministic daily Arcana and orientation for the date in **Australia/Brisbane** time. A repeated visit on the same day returns the same reading.
- The complete reading combines the daily card with Bound/Unbound status, card direction, lunar phase, zodiac season, and planetary weekday.
- IDs 01–22 are fixed to the traditional Major Arcana sequence, starting at The Fool and ending at The World.
- Unknown or malformed `id` values fall back to guest mode. NFC IDs are **not security tokens**; anyone can modify the URL to view another ID.

## Interface

- Desktop uses an expanded synthesis panel, central daily card, and five-tab modifier rail.
- On narrow screens, the synthesis and modifier details open from the left and right edges while the card remains central.

## Development notes

This project was developed with the assistance of AI tools and is intended as a focused, self-contained web experience.
