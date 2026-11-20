# scotthaeger.com

Personal portfolio and resume site for Scott Haeger. A single-page static site
built with Next.js and hosted on Cloudflare Pages, with a small serverless
function behind the contact form.

Live at <https://scotthaeger.com> (`www` redirects to the bare domain).

## Stack

- [Next.js](https://nextjs.org) 16 (App Router), static export (`output: "export"`)
- React 19, TypeScript, [Tailwind CSS](https://tailwindcss.com) 4
- Cloudflare Pages for hosting, plus one Pages Function (`functions/api/contact.ts`)
- [Resend](https://resend.com) for contact-form email
- GitHub Actions for deploys

## Project layout

```
src/
  app/
    layout.tsx        Page metadata and root layout
    page.tsx          The whole single page (hero, portfolio, resume, skills, contact)
    ContactForm.tsx   Client-side contact form
    globals.css       Theme variables and shared styles
  content/
    site.ts           All site copy: name, summary, projects, experience, skills
functions/
  api/contact.ts      POST /api/contact: validates input and emails via Resend
.github/workflows/
  deploy.yml          Build and deploy to Cloudflare Pages
.githooks/
  pre-push            Blocks direct pushes to main
next.config.mjs       Static export config
```

To change what the site says, edit `src/content/site.ts`. To change layout or
styling, edit `src/app/page.tsx` and `src/app/globals.css`.

## Local development

Requires Node 22 (see `.nvmrc`).

```sh
npm install      # also enables the pre-push hook via the "prepare" script
npm run dev      # http://localhost:3000
```

Other scripts:

| Script | What it does |
| --- | --- |
| `npm run build` | Type-checks and builds the static site into `out/` |
| `npm run preview` | Serves `out/` locally to check the production build |
| `npm run deploy` | Builds and deploys `out/` to Cloudflare Pages by hand (normally CI does this) |

`npm run dev` serves the page only. The contact form posts to `/api/contact`,
which is a Cloudflare Pages Function, so it does not run under `next dev`.

## Deploying

Changes go live through pull requests:

1. Branch from `main` and open a pull request.
2. GitHub Actions builds the site and deploys a **preview** to Cloudflare Pages,
   then comments the preview link on the PR. Previews sit behind Cloudflare
   Access, so you need to sign in to open them.
3. Merging to `main` deploys to **production**.

`main` is branch-protected: it requires a pull request and a passing `deploy`
check. A local `pre-push` hook also blocks direct pushes to `main` (a guardrail,
not a security boundary).

### GitHub Actions secrets

Set in the repository's Actions secrets:

| Secret | Purpose |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | Token with **Account → Cloudflare Pages → Edit** |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account that owns the Pages project |

### Cloudflare Pages variables

The contact function reads these at runtime. Set them under the Pages project
(`scotthaeger`) → Settings → Variables and secrets, in **both** the Production
and Preview environments. Variables only apply to deployments made after they
are saved.

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key (store as a secret) |
| `CONTACT_TO` | Address that receives contact-form messages |
| `CONTACT_FROM` | Sender, in the form `Name <address@scotthaeger.com>`. The domain must be verified in Resend. Falls back to `onboarding@resend.dev`, which only delivers to the Resend account owner |

If the variables are missing the form returns "Contact form is not configured
yet." If Resend rejects a message the form returns a generic send error, and
the details are logged with `console.error` in the function's logs.

## Contact form

`ContactForm.tsx` posts JSON to `/api/contact`. The function validates the
name, email and message, ignores submissions that fill the hidden `website`
honeypot field, and sends the message through Resend with the visitor's address
as `reply_to`. The recipient address is never exposed on the page.

## Hosting and DNS

- Registrar: GoDaddy. DNS: Cloudflare (nameservers delegated from GoDaddy).
- `scotthaeger.com` and `www.scotthaeger.com` are custom domains on the Pages
  project, with proxied CNAME records to `scotthaeger.pages.dev`.
- A Cloudflare Redirect Rule sends `www` to the bare domain (301, path and query
  preserved). This rule lives in the Cloudflare dashboard, not in this repo.
- Resend's DKIM and SPF records for sending mail from `scotthaeger.com` are also
  in Cloudflare DNS.
