# yourname's site

A small personal site: a home page, a few blog posts, a downloads section,
and a photo area for PC builds. Plain HTML, CSS and JS — no build step,
no dependencies, no framework. It's built to run on GitHub Pages exactly
as-is.

The look is drawn from [Omarchy](https://omarchy.org)'s real color
themes (Tokyo Night, Catppuccin, Gruvbox, Nord, Everforest, Kanagawa).
The six dots in the top bar switch between them live, and the choice is
remembered on your next visit.

## Put it on GitHub Pages

1. Create a new GitHub repository.
   - If you want it at `https://yourusername.github.io`, name the repo
     exactly `yourusername.github.io`.
   - Any other name works too — it'll just live at
     `https://yourusername.github.io/repo-name/`.
2. Push everything in this folder to the repo's `main` branch, so
   `index.html` sits at the repo root.
3. On GitHub, go to **Settings → Pages**.
4. Under **Source**, choose **Deploy from a branch**, pick `main` and
   `/ (root)`, then save.
5. GitHub gives you a URL in a minute or two — that's your site.

Optional: to use your own domain, add a file named `CNAME` at the repo
root containing just your domain name, then point your domain's DNS at
GitHub Pages (GitHub's docs walk through the exact records).

## Make it yours

- **Name and bio** — edit the hero panel near the top of `index.html`,
  and the `~/yourname` mark in the top bar on every page (find and
  replace `yourname` across all files is the fastest way).
- **Links** — the GitHub and email links are in the same hero panel on
  `index.html`.
- **Blog posts** — each post is its own file in `blog/`. To add one,
  copy an existing post file, rename it, edit the title/date/body, then
  add a matching entry to the list in `blog/index.html` (and optionally
  to the "latest writing" list on the home page).
- **Downloads** — real files live in `downloads/files/`. Drop a new
  file in there and add a row for it in `downloads/index.html` (copy an
  existing `<li>` block). The "dotfiles" entry is a placeholder — point
  it at your own repo, or delete it.
- **Photos** — `photos/index.html` currently shows placeholder icons.
  To swap one for a real photo, drop the image in `assets/img/builds/`
  and replace that card's `<span class="photo-frame">...</span>` block
  with an `<img>` tag pointing at it (there's a comment in the file
  showing exactly how). Copy a card block to add more.
- **Colors** — all six themes and every color they use are defined at
  the top of `assets/css/style.css`. Change a hex value there and it
  updates everywhere that color is used.

## What's real vs. placeholder

- `downloads/files/tokyo-night-peaks.svg`, `grid-glow.svg` and
  `backup.sh` are genuine, working files — download them and they do
  what they say.
- The "dotfiles" download and every photo card are placeholders,
  clearly marked with comments in the HTML, waiting for your own
  links and photos.
- Post dates, the bio, and the GitHub/email links are sample content —
  update them before you publish.

## Structure

```
index.html                  home page
blog/
  index.html                 post list
  *.html                     individual posts
downloads/
  index.html                 downloads list
  files/                     the actual downloadable files
photos/
  index.html                 build gallery + lightbox
assets/
  css/style.css              all styles + theme colors
  js/main.js                 theme switcher, mobile nav, clock, lightbox
  img/                       favicon; put your own build photos here
```
