# Nandini — Sveltia CMS Playground

A super-simple static site with Sveltia CMS wired in. No build step, no backend — just HTML files and a Git repo.

## What's inside

```
nandini-site/
├── index.html                   ← the homepage
├── admin/
│   ├── index.html               ← loads Sveltia CMS
│   └── config.yml               ← defines what's editable
├── content/
│   ├── about.md                 ← "About" page content
│   └── projects/
│       └── hello-world.md       ← sample project
└── images/                      ← CMS uploads go here
```

## Setup in ~5 minutes

### 1. Create a GitHub repo and push this code

```bash
cd nandini-site
git init
git add .
git commit -m "initial Sveltia CMS setup"
# create a new repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

### 2. Update `admin/config.yml`

Change this line to match your repo:

```yaml
repo: YOUR_GITHUB_USERNAME/YOUR_REPO_NAME
```

Commit and push the change.

### 3. Deploy to Cloudflare Pages

- Go to **Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git**
- Pick your repo
- **Framework preset:** None
- **Build command:** *(leave empty)*
- **Build output directory:** `/` (or leave empty)
- Deploy

Your site is now live at `https://your-project.pages.dev`.

### 4. Set up GitHub auth (so Sveltia can write to your repo)

Sveltia uses GitHub's **fine-grained personal access tokens** — no OAuth proxy needed. This is the whole reason we picked Sveltia over Decap.

1. Visit `https://your-project.pages.dev/admin/`
2. Click **Sign in with GitHub (Token)**
3. It will prompt you to create a fine-grained PAT — follow the link, give it **read/write access to your repo only**, paste it back
4. Done. You're in.

### 5. Play

- Edit the About page
- Create new projects under Acting / Dance / Film
- Upload images — they land in `/images/` and commit to your repo
- Every save is a Git commit. Every edit is versioned.

## Notes

- **No local dev needed** — it's static HTML, just open `index.html` in a browser. The CMS admin won't work locally without a tiny config tweak, but the site preview does.
- **Want to preview CMS locally?** Add `local_backend: true` under `backend:` in `config.yml` and run `npx @sveltia/cms-proxy-server`. Remove before deploying.
- **To actually render projects on the homepage**, you'd need a static site generator (11ty, Astro, Hugo) or some JavaScript to read the Markdown files. This playground is just the CMS wiring — the front-end can come later.
