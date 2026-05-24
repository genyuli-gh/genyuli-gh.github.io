# Personal Academic Website

This folder contains a Ruby-free static academic website for GitHub Pages. It is
plain HTML, CSS, JavaScript, and assets. There is no Jekyll, Ruby, Docker, npm
build step, or generated site folder.

If you are an LLM helping maintain this website, read this README first and use
it as the operating guide.

## Quick Map

- `index.html`: page structure and section anchors.
- `content.js`: main editable content for the homepage.
- `styles.css`: visual design and responsive layout.
- `script.js`: renders `content.js` into the page. Edit only when changing site
  behavior.
- `assets/cv.pdf`: downloadable CV file.
- `assets/portrait-placeholder.png`: current portrait placeholder.
- `notes/`: lecture note pages or files.
- `.nojekyll`: tells GitHub Pages to serve this as a plain static site.
- `preview.ps1` and `Preview Website.cmd`: local preview helpers.
- `publish.ps1` and `Publish Website.cmd`: publish helpers.

## Maintenance Rules For Future Assistants

- Prefer editing `content.js` for ordinary updates to name, bio, links, papers,
  publications, lecture notes, CV path, and last-updated date.
- Do not introduce Jekyll, Ruby, a bundler, npm dependencies, or a build system
  unless explicitly requested.
- Keep the site deployable from the repository root on GitHub Pages.
- Keep `.nojekyll` in place.
- Do not delete or replace the user's CV, portrait, papers, or notes unless the
  user explicitly asks.
- After meaningful edits, preview locally and check that About, Research,
  Lecture Notes, and CV still work.
- Keep content data simple and human-editable. Avoid moving routine content into
  `index.html`.

## How To Edit Content

Most updates happen in `content.js`.

### Profile

Edit:

- `profile.name`
- `profile.title`
- `profile.intro`
- `profile.links`
- `profile.portrait`
- `cvUrl`
- `lastUpdated`

For a real portrait, put the image in `assets/`, for example
`assets/portrait.jpg`, then set:

```js
portrait: {
  src: "assets/portrait.jpg",
  alt: "Portrait of Your Name",
  caption: ""
}
```

### Research

Working papers belong in:

```js
research.workingPapers
```

Published or forthcoming papers belong in:

```js
research.publications
```

Each paper can use this shape:

```js
{
  title: "Paper Title",
  coauthors: "with Coauthor Name",
  status: "Working paper",
  venue: "",
  date: "Updated May 2026",
  abstract: "Short abstract or summary.",
  url: "papers/paper-file.pdf",
  links: [
    { label: "PDF", url: "papers/paper-file.pdf" },
    { label: "Slides", url: "slides/paper-slides.pdf" }
  ]
}
```

Leave `publications: []` if there are no published papers yet. The page will
show a clean empty state.

### Lecture Notes

Put lecture note files in `notes/` and list them in:

```js
lectureNotes.items
```

Example:

```js
{
  title: "Lecture Note Title",
  course: "Course or topic name",
  date: "Spring 2026",
  description: "Short description.",
  url: "notes/lecture-note.pdf"
}
```

Lecture notes can be PDFs, HTML pages, or other static files.

### CV

Replace `assets/cv.pdf` with the current CV PDF. If the file name changes,
update both:

```js
cvUrl: "assets/cv.pdf"
```

and any CV link in `profile.links`.

## Preview Locally

From PowerShell in this folder:

```powershell
.\preview.ps1
```

Or double-click:

```text
Preview Website.cmd
```

The preview script uses Python's built-in local server and opens a local URL.
It serves the same static files GitHub Pages will serve.

## Publish To GitHub Pages

This is intended to be a GitHub Pages user site. The GitHub repository should be
named exactly:

```text
<your-github-username>.github.io
```

The live site URL will be:

```text
https://<your-github-username>.github.io/
```

If the local folder has not been connected to GitHub yet, create the repository
on GitHub, then run:

```powershell
git remote add origin https://github.com/<your-github-username>/<your-github-username>.github.io.git
```

Publish changes with:

```powershell
.\publish.ps1 "Update website"
```

Or double-click:

```text
Publish Website.cmd
```

The publish script stages changed files, creates a commit, and pushes to GitHub.
GitHub Pages may take a minute or two to refresh.

On GitHub, Pages should deploy from the `main` branch and the repository root.

## Common Update Checklist

1. Edit `content.js` or replace files in `assets/`, `notes/`, `papers/`, or
   `slides/`.
2. Update `lastUpdated` in `content.js`.
3. Preview locally.
4. Check the homepage sections and links.
5. Publish when ready.

## Troubleshooting

- If the preview script does not open a browser, copy the local URL shown in the
  PowerShell window and open it manually.
- If PowerShell blocks scripts, double-click `Preview Website.cmd` or run:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\preview.ps1
```

- If publishing says no GitHub remote is configured, add the `origin` remote
  using the command in the publishing section.
- If GitHub Pages does not update immediately, wait a few minutes and refresh.
- If a link is broken, check the file path in `content.js`; paths are relative
  to the website root.
