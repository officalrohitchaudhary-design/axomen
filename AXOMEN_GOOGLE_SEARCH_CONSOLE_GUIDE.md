# Complete Google Search Console Setup & Indexing Guide for AxoMen

> **Document Type:** Senior Technical SEO Engineering Playbook & Step-by-Step Operator Manual  
> **Brand:** AxoMen ([https://axomen.com/](https://axomen.com/))  
> **Target Audience:** India (Men's Sexual Health & Habit Recovery)  
> **Framework:** Next.js (App Router, Turbopack)  
> **Hosting & Infrastructure:** Vercel (Production Edge) | Authoritative DNS: Hostinger (`dns-parking.com`)  
> **Objective:** Comprehensive domain registration, DNS ownership verification, sitemap validation, and rapid Google search engine indexing.

---

## Executive Summary & Live Audit Findings

Before submitting anything to Google Search Console (GSC), we performed a live network audit of `axomen.com` across DNS, HTTP response codes, SSL certificates, sitemaps, and robots directives. 

### Key Findings from Our Live Audit:
1. **Host & DNS Architecture:**
   - Authoritative Nameservers: `artemis.dns-parking.com` / `hermes.dns-parking.com` (Managed at **Hostinger**).
   - A-Record Target: `216.198.79.1` (Points directly to **Vercel** edge routing).
2. **Current Redirect Behaviour:**
   - Requesting `https://axomen.com/` returns `HTTP/2 308 Permanent Redirect` pointing to `https://www.axomen.com/`.
   - *Action Required:* If you want `https://axomen.com/` (apex / non-www) to be your primary preferred domain, this redirect direction must be aligned in Vercel Project Settings (explained in Step 3).
3. **Live Deployment Notice:**
   - The live production instance on Vercel currently serves a cached build where `/robots.txt` and `/sitemap.xml` reference legacy URLs.
   - The updated AxoMen Next.js code (`app/robots.ts` and `app/sitemap.ts`) is configured with `https://axomen.com/` in the local codebase.
   - **Crucial Rule:** Deploy your latest Git changes to Vercel production **before** submitting the sitemap to Google Search Console to avoid Google caching outdated URLs.

---

## Official Google Documentation Reference Links

Save and reference these official Google Search Central standards throughout the setup:

- **Google Search Console Portal:**  
  [https://search.google.com/search-console/](https://search.google.com/search-console/)
- **Google Search Central Documentation:**  
  [https://developers.google.com/search](https://developers.google.com/search)
- **Google URL Inspection Tool Official Guide:**  
  [https://support.google.com/webmasters/answer/9012289](https://support.google.com/webmasters/answer/9012289)
- **Google Sitemap Submission & Building Standard:**  
  [https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)

---

## Step 1 — Pre-Registration Domain Health & Infrastructure Check

Never attempt to register a domain in Google Search Console blind. Always verify your HTTP responses and SSL certificates in your browser or terminal first.

### URLs to Test in Your Browser:
1. **Preferred Apex Domain:**  
   [https://axomen.com/](https://axomen.com/)
2. **Alternative Subdomain (www):**  
   [https://www.axomen.com/](https://www.axomen.com/)
3. **Robots Exclusion File:**  
   [https://axomen.com/robots.txt](https://axomen.com/robots.txt)
4. **Dynamic XML Sitemap:**  
   [https://axomen.com/sitemap.xml](https://axomen.com/sitemap.xml)

---

### What to Look For (Inspection Checklist):

| Check Item | Desired Result | Current Live Audit Finding | Next Step |
| :--- | :--- | :--- | :--- |
| **HTTPS Security** | Green lock icon, valid TLS/SSL certificate without security warnings. | **Passed:** Vercel auto-provisions valid Let's Encrypt / DigiCert SSL certificates. | Ready for registration. |
| **Domain Resolution** | Homepage loads quickly with HTTP 200 on the preferred URL. | **Passed:** Resolves cleanly on Vercel infrastructure. | Ready. |
| **WWW vs Non-WWW Redirect** | One version must 301/308 redirect to the single preferred version. | **Attention:** `https://axomen.com/` redirects to `https://www.axomen.com/`. | If you prefer apex (`https://axomen.com`), switch the primary domain in Vercel settings. |
| **`robots.txt` Availability** | Must return text/plain containing `User-agent: *`, `Allow: /`, and `Sitemap: https://axomen.com/sitemap.xml`. | **Notice:** Currently displays legacy host until new Git deploy is pushed. | Push latest Next.js commit to Vercel. |
| **`sitemap.xml` Validity** | Must return valid XML starting with `<?xml version="1.0" encoding="UTF-8"?><urlset...>` containing only 200 OK canonical URLs. | **Notice:** Live sitemap currently lists legacy domain until deployment. | Push latest Next.js commit to Vercel. |

> **Warning for Developers:** If `https://axomen.com/sitemap.xml` returns a 404 error or a 500 internal server error, **do not submit it to Google Search Console**. Google will flag it with a *"Couldn't fetch"* error and delay crawling. Always confirm that the sitemap returns a 200 HTTP code in your browser first.

---

## Step 2 — Register AxoMen in Google Search Console (Domain Property)

Google Search Console offers two property types: **Domain property** and **URL-prefix property**.

```
┌─────────────────────────────────────────────────────────────┐
│                   Property Type Comparison                  │
├──────────────────────────────┬──────────────────────────────┤
│       Domain Property        │     URL-Prefix Property      │
│     (Recommended: Best)      │          (Limited)           │
├──────────────────────────────┼──────────────────────────────┤
│ • Covers https://axomen.com  │ • Covers ONLY exact match:   │
│ • Covers https://www.axomen  │   e.g. https://axomen.com/   │
│ • Covers http:// (insecure)  │ • Ignores www traffic        │
│ • Covers future subdomains   │ • Ignores http traffic       │
│ • Verified via DNS TXT       │ • Verified via HTML file/tag │
└──────────────────────────────┴──────────────────────────────┘
```

We **strongly recommend a Domain property** for `axomen.com`. It aggregates all protocols, subdomains, and historical variations into a single, unified search performance dashboard.

---

### Step-by-Step Registration & DNS Verification:

#### 1. Open Google Search Console
- Navigate to: [https://search.google.com/search-console/](https://search.google.com/search-console/)
- Log in with your dedicated company Google Workspace or Gmail account (e.g., `support@axomen.com` or your primary administrator account).

#### 2. Click "Add property"
- If you have an existing property open, click the property dropdown in the top-left corner and click **+ Add property**.
- If this is a fresh account, the property selection modal opens automatically.

#### 3. Select the "Domain" Card (Left Card)
- You will see two boxes: **Domain** (left) and **URL prefix** (right).
- Click inside the **Domain** input box.

#### 4. Enter the Bare Domain
- Enter exactly: `axomen.com`
- **Do not include:** `https://`, `http://`, `www.`, or trailing slashes `/`.
- Click **Continue**.

#### 5. Copy Your Unique DNS TXT Record
- Search Console will generate a modal titled: **"Verify domain ownership via DNS record"**.
- Ensure the record type selected is **TXT** (default and recommended).
- You will see a unique verification string that looks similar to:  
  `google-site-verification=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`
- Click the **COPY** button next to the string.
- *Note: Never guess or invent this string. It is unique to your Google account.*

---

### Adding the TXT Record at Your Authoritative DNS Provider:

Our audit confirmed your nameservers point to **Hostinger** (`artemis.dns-parking.com`). Follow these exact steps inside Hostinger:

1. **Log in to Hostinger hPanel:** Navigate to [https://hpanel.hostinger.com/](https://hpanel.hostinger.com/).
2. **Go to Domains:** In the top menu, click **Domains** and select `axomen.com`.
3. **Open DNS / Nameservers:** In the left sidebar, click **DNS / Nameservers** (or **DNS Zone Editor**).
4. **Create a New Record:**
   - **Type:** Select `TXT` from the dropdown.
   - **Name / Host:** Enter `@` (or leave blank if Hostinger defaults to the root domain).
   - **TXT Value / Content:** Paste the Google verification string you copied:  
     `google-site-verification=...`
   - **TTL:** Select `300` (5 minutes) or `3600` (1 hour) default.
5. **Click "Add Record":** Save the entry.

*(Alternative Check: If your DNS is ever migrated to Cloudflare, GoDaddy, or Vercel DNS, open that provider's DNS management tab and add the exact same TXT record with Name `@`).*

### Completing DNS TXT Verification:
1. Return to the open Google Search Console tab.
2. Click the blue **Verify** button.
3. **What to expect:**
   - *Instant Success:* A green box will appear: **"Ownership verified"**. Click **Go to property**.
   - *Ownership not verified yet:* DNS changes can take between 2 to 30 minutes to propagate across global DNS caches. **Do not panic.** Click **Verify later**, wait 10–15 minutes, reopen Search Console, and click **Verify** again.
4. **Critical Rule:** **Never delete the TXT record** from Hostinger. Google periodically re-checks ownership. If the record is deleted, you will lose access to Search Console data.

---

### Alternative Verification Method: HTML Tag (Already Installed in Codebase)

If you also register a **URL-prefix property** (`https://axomen.com/`) or prefer instant verification via HTML meta tag instead of waiting for DNS propagation:
- The required meta tag has already been configured in `app/layout.tsx`:
  ```html
  <meta name="google-site-verification" content="7MbYoER0bE8f3vyhqynyTkejTaj6kMaFfyZoNY04m3c" />
  ```
- **How to verify via HTML tag in GSC:**
  1. In the verification options list, expand **HTML tag**.
  2. Confirm it matches `7MbYoER0bE8f3vyhqynyTkejTaj6kMaFfyZoNY04m3c`.
  3. Deploy your latest commit to Vercel.
  4. Click **Verify** in Search Console. It verifies instantly without waiting for DNS propagation.

---

## Step 3 — Confirm the Preferred Canonical Domain

Google considers `https://axomen.com/` and `https://www.axomen.com/` to be two entirely distinct websites. Having both versions accessible without a clean redirect will split your ranking authority and cause duplicate content penalties.

Your stated preferred domain is: **`https://axomen.com/`** (Apex / Non-WWW).

---

### Technical Alignment Checklist:

#### 1. Vercel Domain Configuration (Host-Level Redirect)
1. Go to your **Vercel Dashboard** → Select the AxoMen project.
2. Click **Settings** → **Domains**.
3. You will see both `axomen.com` and `www.axomen.com`.
4. Ensure `axomen.com` is designated as the **Primary Domain**.
5. Set `www.axomen.com` to **"Redirect to axomen.com"** (Status code: 308/301 Permanent).
6. Verify in terminal:
   ```bash
   curl -Is https://www.axomen.com/ | grep -i location
   # Expected output: location: https://axomen.com/
   ```

#### 2. Canonical Meta Tag in Next.js (`app/layout.tsx`)
In Next.js App Router, ensure `metadataBase` is set to the preferred domain:
```typescript
// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL("https://axomen.com"),
  alternates: {
    canonical: "./",
  },
  // ...
};
```
This guarantees every page automatically emits:
```html
<link rel="canonical" href="https://axomen.com/your-page" />
```

#### 3. Internal Links Consistency
Check all internal navigation links in `components/Navbar.tsx` and `components/Footer.tsx`. All links must use root-relative paths (e.g., `href="/services/porn-habit-support"` or `href="/booking"`) so the browser never requests `www.axomen.com`.

---

## Step 4 — Find and Verify the XML Sitemap

A sitemap is an XML file that tells Google's web crawlers which URLs are genuine, high-quality, canonical pages that should be discovered and indexed.

### How Next.js Generates the Sitemap:
In Next.js App Router, the sitemap is dynamically generated using `app/sitemap.ts`. When compiled and deployed, Next.js automatically maps this route to:  
**`https://axomen.com/sitemap.xml`**

---

### Step-by-Step Pre-Submission Verification:

Open `https://axomen.com/sitemap.xml` in Google Chrome or run:
```bash
curl -sL https://axomen.com/sitemap.xml | head -n 25
```

#### What You Must Verify Before Submission:
1. **HTTP Status:** The response header must be `200 OK` (not 301, 308, 404, or 500).
2. **Content-Type:** Must be `application/xml` or `text/xml`.
3. **XML Structure:** Starts with:
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://axomen.com</loc>
       <lastmod>2026-10-13T07:00:00.000Z</lastmod>
       <changefreq>weekly</changefreq>
       <priority>1.0</priority>
     </url>
   ...
   ```
4. **Canonical Consistency:** Every single `<loc>` URL must start with `https://axomen.com/`. None should contain `www.axomen.com`, `http://`, or localhost.
5. **Clean Status:** Ensure no staging URLs, non-existent 404 paths, or pages with `<meta name="robots" content="noindex" />` are included.

---

## Step 5 — Submit the Sitemap to Google Search Console

Once you have verified that `https://axomen.com/sitemap.xml` loads cleanly in your browser and returns valid XML for the AxoMen domain:

### Detailed Instructions:
1. Open [Google Search Console](https://search.google.com/search-console/).
2. Select your verified **`axomen.com`** property from the top-left dropdown.
3. In the left navigation menu under the **Indexing** section, click **Sitemaps**.
4. You will see a box labelled **"Add a new sitemap"**.
5. The input field already prefixes your domain: `https://axomen.com/`.
6. In the text box, enter **only the relative filename**:  
   `sitemap.xml`  
   *(Do NOT type `https://axomen.com/sitemap.xml` again; only type `sitemap.xml`).*
7. Click the **Submit** button.
8. A confirmation modal will appear: *"Sitemap submitted successfully. Google will periodically process it and look for changes."* Click **Got it**.

---

### Understanding the Sitemaps Report Status:

| Status Label | Meaning | Action Required |
| :--- | :--- | :--- |
| **Success (Green)** | Google successfully fetched, parsed, and recorded your URLs for crawling. | None. Google will now queue these pages for indexing. |
| **Couldn't fetch** | Google tried to fetch the sitemap but encountered a timeout, DNS failure, 404 error, or Vercel cold-start delay. | **Troubleshooting:** Test the sitemap in your browser. If it loads, wait 24 hours. Often, GSC displays "Couldn't fetch" temporarily on brand-new domains while DNS caches warm up. If it persists, inspect your Vercel deployment logs. |
| **Has errors** | The sitemap was fetched, but contains invalid XML, syntax errors, or URLs blocked by `robots.txt`. | Click on the error row inside Search Console to view line-by-line errors and fix them in `app/sitemap.ts`. |

> **Critical Warning:** Never enter `robots.txt` into the "Add a new sitemap" field. `robots.txt` is an instruction file, not a sitemap. Submitting it will produce an XML parsing error.

---

## Step 6 — Request Instant Indexing for High-Priority Pages

Submitting a sitemap informs Google of your overall architecture. However, for a brand-new domain, Google's scheduler may take days to crawl every page in the sitemap. 

To expedite the crawl of your most critical conversion and service pages, use the **URL Inspection Tool**.

---

### How to Use the URL Inspection Tool:
1. Open your `axomen.com` property in [Google Search Console](https://search.google.com/search-console/).
2. Look at the very top of the screen: there is an inspection search bar with the placeholder:  
   `Inspect any URL in "axomen.com"`
3. Paste the **full, absolute URL** (including `https://axomen.com/...`).
4. Press **Enter**.
5. GSC will query the Google index and show: *"URL is not on Google"*.
6. Click the **TEST LIVE URL** button in the top right. Googlebot will perform an on-demand live HTTP request and DOM render.
7. Wait 30–60 seconds. Once the live test passes with a green checkmark (*"URL is available to Google"*), click **REQUEST INDEXING**.
8. A confirmation will appear: *"Indexing requested. URL was added to a priority crawl queue."*

---

### Priority Indexing Queue for AxoMen:
Inspect and request indexing for these **13 verified, active routes** in order of priority:

```
Priority 1 — Core Brand & Services
[ ] https://axomen.com/
[ ] https://axomen.com/services/porn-habit-support
[ ] https://axomen.com/services/masturbation-habit-support
[ ] https://axomen.com/services/porn-and-masturbation-support

Priority 2 — Journey & Conversion Pathways
[ ] https://axomen.com/how-it-works
[ ] https://axomen.com/faqs
[ ] https://axomen.com/booking

Priority 3 — Trust, Transparency & Editorial
[ ] https://axomen.com/about
[ ] https://axomen.com/contact
[ ] https://axomen.com/stories
[ ] https://axomen.com/blog

Priority 4 — Interactive Recovery Toolkits
[ ] https://axomen.com/books
[ ] https://axomen.com/exercises
```

> **Quota Note:** Google enforces a daily quota on "Request Indexing" (typically 10 to 20 requests per day). Do not spam the button. Submitting the homepage and the 3 core service pages on Day 1 is sufficient to trigger Googlebot's initial crawl of the entire site graph.

---

## Step 7 — Master Indexing Statuses & Troubleshooting Playbook

When you check the **Pages** report in Search Console, Google categorises every discovered URL under specific technical statuses. Here is the diagnostic playbook:

### 1. "URL is on Google"
- **Meaning:** The page has been crawled, rendered, accepted, and is actively searchable in Google search results.
- **Action:** None. Ensure the page remains fast, accessible, and up to date.

### 2. "URL is not on Google" / "URL is unknown to Google"
- **Meaning:** Google has never seen this URL before, or it has been dropped from the index due to historical issues.
- **Action:** Verify the URL is live (returns 200 OK), click **Test Live URL**, and click **Request Indexing**.

### 3. "Discovered — currently not indexed"
- **Meaning:** Google knows the URL exists (from your sitemap or an internal link), but has not yet crawled it because of crawler budget scheduling.
- **Action:** Common for new domains. Do not resubmit repeatedly. Ensure strong internal linking from the homepage to these pages. Google will crawl them as domain reputation grows.

### 4. "Crawled — currently not indexed"
- **Meaning:** Googlebot fetched and rendered the page, but decided not to index it. This usually occurs if content is perceived as duplicate, thin, or low quality.
- **Action:** Ensure the page provides substantial, unique value. On service pages, verify that clear headings, FAQs, original copy, and structured schema are present.

### 5. "Excluded by ‘noindex’ tag"
- **Meaning:** Google encountered a `<meta name="robots" content="noindex" />` tag or `X-Robots-Tag: noindex` header on the page and respected your request to keep it out of Google.
- **Action:** If this was intentional (e.g. `/api/`, internal admin), no action needed. If accidental on a public page, search your code for `noindex` and remove it.

### 6. "Blocked by robots.txt"
- **Meaning:** The URL is matched by a `Disallow:` rule in `robots.txt`.
- **Action:** Check `app/robots.ts`. Ensure your public pages (like `/about` or `/services/*`) are not caught by disallow patterns.

### 7. "Duplicate without user-selected canonical"
- **Meaning:** Google found multiple versions of the page (e.g., with query parameters or trailing slashes) and none specified a canonical tag.
- **Action:** Verify that `metadataBase` and `alternates.canonical` are properly configured in Next.js layout/pages.

### 8. "Alternate page with proper canonical tag"
- **Meaning:** Google identified that this page points to a canonical version elsewhere (e.g., `https://www.axomen.com/` pointing to `https://axomen.com/`, or `?lang=hi` pointing to the main URL).
- **Action:** No action needed. This confirms your canonical tags are functioning as designed.

### 9. "Page with redirect"
- **Meaning:** Google crawled a URL that issued a 301, 302, 307, or 308 redirect to another destination.
- **Action:** Ensure you do not include redirecting URLs inside `app/sitemap.ts`. The sitemap must only list destination URLs.

### 10. "Not found (404)"
- **Meaning:** Google attempted to crawl a URL that returns a 404 response.
- **Action:** If the URL is obsolete (e.g., from an old website), let it 404 or set up a 301 redirect in `next.config.ts`. Remove dead links from `app/sitemap.ts`.

---

## Step 8 — Next.js Technical Configuration Review

As a Next.js App Router application, AxoMen manages SEO directives dynamically via code. Below is the reference architecture running in this repository:

### 1. Robots Directive Architecture (`app/robots.ts`)
```typescript
// Verified implementation in app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
    ],
    sitemap: "https://axomen.com/sitemap.xml",
    host: "https://axomen.com",
  };
}
```
- **Allow:** All public marketing, service, and educational routes.
- **Disallow:** Private API endpoints (`/api/`), internal Next.js assets (`/_next/`), and admin views.
- **Sitemap Link:** Points directly to the absolute canonical sitemap location.

---

### 2. Sitemap Generator Architecture (`app/sitemap.ts`)
- Configured with `export const revalidate = 3600;` (regenerates dynamically every 60 minutes).
- Automatically includes all static core routes, alternate language routes (`?lang=hi`), published recovery books, and active dynamic blog posts fetched from the database.
- Automatically excludes unpublished articles or records marked with `no_index: true`.

---

### Browser Checks vs Developer Tasks:

```
┌─────────────────────────────────────────────────────────────┐
│                    Division of Responsibilities             │
├──────────────────────────────┬──────────────────────────────┤
│    Browser / Operator Tasks  │    Developer Code Tasks      │
│     (No Code Knowledge)      │      (Repository Edits)      │
├──────────────────────────────┼──────────────────────────────┤
│ • Open https://axomen.com/   │ • Modify app/robots.ts       │
│ • Copy DNS TXT string        │ • Modify app/sitemap.ts      │
│ • Paste TXT in Hostinger DNS │ • Adjust next.config.ts      │
│ • Submit sitemap.xml in GSC  │ • Update OpenGraph schemas   │
│ • Click "Request Indexing"   │ • Git commit & push to main  │
└──────────────────────────────┴──────────────────────────────┘
```

---

## Step 9 — Verify Google Indexing in the Real World

After you have registered the domain, submitted the sitemap, and requested initial indexing, how do you verify that Google has actually indexed AxoMen?

### Verification Technique 1: URL Inspection Live Result
1. Paste `https://axomen.com/` into the GSC search bar.
2. If indexed, the header box turns green:  
   **"URL is on Google"**
3. Expand **Page availability** to see:
   - *Crawl date:* When Googlebot last visited.
   - *Crawled as:* Googlebot smartphone (Google uses Mobile-First Indexing).
   - *User-declared canonical:* `https://axomen.com/`
   - *Google-selected canonical:* `https://axomen.com/` (Must match user-declared!).

### Verification Technique 2: Search Console "Pages" Report
- Navigate to **Indexing** → **Pages**.
- Review the graph showing **Indexed** (green) vs **Not indexed** (grey).
- New websites typically show 1 to 5 indexed pages within 3 to 7 days, expanding as Google crawls deeper.

### Verification Technique 3: Google `site:` Search Operator
Open [Google.com](https://www.google.com/) and search:
```
site:axomen.com
```
- **What this does:** Returns a list of pages from `axomen.com` currently stored in Google's index.
- **Important Technical Limitation:** The `site:` operator is an approximate diagnostic tool. It does not reflect 100% of indexed pages and can lag behind Search Console by several days. If GSC says *"URL is on Google"*, your page is indexed even if `site:` hasn't refreshed yet.

### Verification Technique 4: Branded Keyword Search
Once indexed, test exact-match brand queries:
```
"AxoMen"
AxoMen men sexual health
AxoMen porn habit support India
```
*Tip: As a new domain, your site may initially appear on pages 2–5 for broad queries, but should rank #1 for its exact branded name `AxoMen` within 1 to 3 weeks.*

---

## Step 10 — Follow-Up Monitoring Routine

SEO is not a one-time setup; it requires structured monitoring during the initial 30 days of domain launch. Follow this schedule:

### Day 1 (Launch Day):
- [ ] Complete Hostinger DNS TXT verification for Domain property `axomen.com`.
- [ ] Deploy latest Next.js build to Vercel so `/robots.txt` and `/sitemap.xml` are live.
- [ ] Verify `https://axomen.com/sitemap.xml` in browser (200 OK, valid XML).
- [ ] Submit `sitemap.xml` inside Google Search Console Sitemaps menu.
- [ ] Run URL Inspection on homepage `https://axomen.com/` and 3 core service pages; click **Request Indexing**.

### Week 1 (Discovery & Crawl Phase):
- [ ] Check Sitemaps tab: Confirm status is green **Success** and note the count of *Discovered URLs*.
- [ ] Check Pages tab: Look for initial green bars under **Indexed**.
- [ ] Check for *Excluded* issues: Ensure no legitimate pages are stuck in *Excluded by ‘noindex’* or *Blocked by robots.txt*.
- [ ] Test mobile usability: Check **Core Web Vitals** and **Page Experience** in GSC.

### Month 1 (Performance & Growth Phase):
- [ ] Open **Performance** report in Search Console:
  - Analyze **Total Clicks**, **Total Impressions**, **Average CTR**, and **Average Position**.
- [ ] Review Top Indian Queries: Identify which search terms (e.g., *"how to stop porn urge"*, *"masturbation recovery India"*) are triggering impressions.
- [ ] Identify High-Opportunity Keywords: Pages with high impressions but low clicks (low CTR) need more compelling meta titles and meta descriptions.
- [ ] Review Coverage & Crawl Stats: Confirm Googlebot is regularly revisiting updated blog posts and service pages.

---

*Playbook authored for AxoMen Engineering & Marketing Teams.*  
*Maintained at repository root: `AXOMEN_GOOGLE_SEARCH_CONSOLE_GUIDE.md`*
