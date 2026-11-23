---
paths:
  - "src/**/*.tsx"
  - "src/**/*.css"
---

# Marketing site design

The shared and web design rules cover the site. This adds what is particular to it.

- The home page logo card is kept as designed: the bordered, shadowed box, a 13rem logo and the "Lunar Turtle LLC" text under it, centered above the title.
- The logo spins once on load (`logo-flip`, 1.3 seconds). The spin starts only after the image has loaded, so it never plays on an empty box.
- Don't list game names in site copy, because they go stale. The Tossback page reads them from the games list in code.
