# westbridge.agency

Website for Westbridge College Professionals. Every commit to `main` is published to https://westbridge.agency by Vercel automatically.

## Files

| Path | What it is |
| --- | --- |
| `index.html` | Home page (scrolling sections: hero, about, services, process, insights, contact) |
| `resources.html` | Resources page served at `/resources`: four resource cards, every Substack article, guides placeholder, The Prestige Trap, LinkedIn essays |
| `success-stories.html` | Success Stories page at `/success-stories`. The three stories are labelled samples until real, approved stories replace them |
| `assets/i18n-zh.js` | All Chinese text. Edit the Chinese on the right of each line; the English lives in the HTML |
| `assets/site.css` | Styles. Colours are the variables at the top (`--red`, `--navy`) |
| `assets/site.js` | Language toggle, phone menu, section highlighting |
| `assets/img/` | Photos and the book cover |
| `assets/fonts/` | Plus Jakarta Sans, hosted here because Google Fonts is blocked in mainland China (SIL Open Font License) |
| `vercel.json` | Clean URLs and security headers |

## Placeholders still to replace

Search the HTML for `PLACEHOLDER` to find the photo slots waiting for Warren's originals (home hero, services header, resources header, success-story photos). The Substack list is a snapshot; new posts are added by updating the list.

## Language toggle

Every translatable element has a `data-i18n="key"` attribute. The same key in `assets/i18n-zh.js` holds its Chinese.
Link straight to a language with `?lang=zh` or `?lang=en`, e.g. https://westbridge.agency/?lang=zh for WeChat.

## Previous version

The first version of the site (October 2026) is kept on the `v1-original` branch.

## Rules

- Never commit passwords, API keys or other secrets.
- No forms or tracking without a privacy notice and Warren's approval (PIPL applies).
- Only publish facts Warren has confirmed.
