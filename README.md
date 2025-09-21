# Story ToDo

A client‑side web app that turns your to‑do list into a short, fun story and generates a matching image using pollinations.ai.

- Live site: https://story-todo.jamedev.top
- Entry point: [index.html](index.html)

## Features

- Add/delete tasks with localStorage persistence
- Generate a short creative story linking all tasks
- Generate a matching AI image
- Dark mode toggle
- Fully static (no server required)

## How it works

- Text generation is fetched from pollinations.ai and cleaned from sponsors before display via [`genPollinations.generatePrivateText`](scripts/genPollinations.js).
- Getting Image from pollinations.ai 
- UI state and task persistence are handled entirely in the browser in [scripts/script.js](scripts/script.js).

## Project structure

- Markup: [index.html](index.html)
- Styles: [css/tailwind.css](css/tailwind.css) (generated), source: [css/style.css](css/style.css), config: [tailwind.config.js](tailwind.config.js)
- Scripts:
  - App logic: [scripts/script.js](scripts/script.js)
  - Pollinations API helpers: [scripts/genPollinations.js](scripts/genPollinations.js)
  - Legacy Gemini Version: [scripts/old/gemini.js](scripts/old/gemini.js), [scripts/old/gemini-new.js](scripts/old/gemini-new.js)

## Quick start

Open with a static server:

```sh
# Option A: VS Code → "Live Server" extension (Open with Live Server)
# Option B: Python (3.x)
python -m http.server 5173

# Option C: npx
npx serve -l 5173
```

## Development

- Rebuild Tailwind (if you change [css/style.css](css/style.css) or config):

```sh
npx @tailwindcss/cli -i ./css/style.css -o ./css/tailwind.css --watch
```

## Deployment

This is a static site. Host the contents of the repo on any static host or GitHub Pages. The custom domain is configured via [CNAME](CNAME).

## Notes

- The app uses localStorage; clearing tasks via “Clear All” wipes stored items for this origin.
- The legacy Gemini files in [scripts/old](scripts/old) are earlier versions of the app that require an api key from google.

## License

- [MIT License](LICENSE)