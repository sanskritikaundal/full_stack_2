# Post Composer

A responsive social media post composer with per-platform character validation,
live feedback, and a local draft-saving flow. Built with React + Vite + Tailwind CSS.

## Setup

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/
    PostComposer.jsx     # main composed component
    PlatformSelector.jsx # stamp-style platform picker
    CharacterCounter.jsx # counter + word/hashtag/mention/reading-time chips
    ProgressBar.jsx       # usage meter
    ValidationMessage.jsx # live status line
    Header.jsx / Footer.jsx
    Toast.jsx             # transient notifications
  hooks/
    useCharacterCount.js  # word/hashtag/mention/reading-time derivation
    useValidation.js      # status + remaining chars + percent used
  utils/
    platformRules.js      # the 4 supported platforms and their limits
    constants.js           # warn/danger thresholds
  App.jsx
  main.jsx
  index.css
```

## Features

- Platform selection (Twitter/X, LinkedIn, Facebook, Instagram) with per-platform limits
- Live character counter, word count, hashtag count, mention count, reading time estimate
- Colour-coded progress bar and validation message (green / amber / red)
- Dynamic placeholder text per platform
- Auto-resizing textarea
- Save-as-draft flow with a restorable draft list (in-memory; add persistence if needed)
- Copy-to-clipboard and clear actions
- Dark mode toggle
- Accessible: ARIA roles/labels, keyboard navigation, visible focus states

## Notes

- Drafts are stored in component state only — refreshing the page clears them.
  Swap in `localStorage`, IndexedDB, or a backend call in `handleSaveDraft` /
  on mount if you want them to persist.
- Colours and fonts are defined as CSS custom properties + `tailwind.config.js`
  theme extensions so the light/dark palette stays in one place.
