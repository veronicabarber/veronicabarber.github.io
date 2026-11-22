# Personal Brand Site (GitHub Pages)

A static, no-build site: plain HTML + CSS. Dark navy, serif/sans pairing, quiet tech accents.

## Preview locally (before publishing)

Unzip the folder and double-click `index.html`. Every page links to the others with relative paths, so it works straight from your computer.

## Folder structure

```
personal-site/
├── index.html        Landing page: portrait + four buttons
├── about.html        About Me, book, research interests, engagements, publications
├── cv.html           Embedded CV + download button
├── substack.html     Essay list with "Continue reading" links
├── contact.html      Contact form
├── css/style.css     All styling (colors and fonts are variables at the top)
└── assets/           Put your files here (see below)
    ├── portrait.jpg      Your photo (portrait orientation, ~800x1000 works well)
    ├── book-cover.jpg    Your book cover
    └── cv.pdf            Your CV
```

## Things to fill in

1. **Your Name**: search every file for `Your Name` and replace it.
2. **Assets**: add `portrait.jpg`, `book-cover.jpg`, and `cv.pdf` to the `assets/` folder (exact names, or edit the paths in the HTML).
3. **about.html**: book title, description and link; the six conference cards (name, Presenter/Discussant, year); publications.
4. **substack.html**: copy an `<article class="essay">` block per essay; update title, month, preview, and URL. Update the "Visit the Substack" link.
5. **contact.html**: see below.

## Making the contact form email you

GitHub Pages is static, so it can't send email on its own. The form uses [Formspree](https://formspree.io) (free tier available):

1. Create a Formspree account and a new form using your email address.
2. Copy your form ID (the part after `/f/` in the endpoint URL).
3. In `contact.html`, replace `YOUR_FORM_ID` in the form's `action`.
4. Submit one test message and confirm your email address when Formspree asks.

## Publishing on GitHub Pages

1. Create a new repository on GitHub. For a root address (`https://USERNAME.github.io`), name it exactly `USERNAME.github.io`.
2. Upload the contents of the `personal-site` folder (so `index.html` sits at the top level of the repo).
3. Go to **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, and save.
4. Your site will be live in a minute or two.

## Customizing the look

At the top of `css/style.css`, the `:root` block controls colors (`--navy-800` background, `--gold` accent, `--parchment` text) and fonts (`--serif`, `--sans`, `--mono`).
