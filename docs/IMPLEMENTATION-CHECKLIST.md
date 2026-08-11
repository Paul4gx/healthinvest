# HIA Implementation Checklist

Track progress against **Brief v1.1** (`docs/HIA-DEVELOPMENT-BRIEF.md`).  
Images: use current placeholders until HIA supplies authentic assets.

**Legend:** `[x]` done · `[ ]` todo · `[~]` partial · `[!]` blocked on client

---

## Phase A — Possible now (in progress / shipping)

### Brand, content & data
- [x] Rename public brand to Health Invest Africa (HIA) in site constants
- [x] British English labelling (centres, specialised, etc.)
- [x] Update homepage metrics to 12 / 200+ / 250+
- [x] Replace mission with approved “We bring specialty care to the underserved”
- [x] Remove unsupported accelerator / dialysis-machine gap statistics from public copy
- [x] Dynamic copyright year (no hard-coded 2025)
- [x] Partner With Us as primary header CTA
- [x] Distinct About page copy (no homepage “One Patient at a Time” clone)
- [ ] Final management sign-off on all metrics `[!]`
- [ ] Official POCCH hospital name + website URL `[!]`
- [ ] Approved Privacy / Cookie / Terms / Accessibility legal copy `[!]`

### Information architecture
- [x] Main nav: About · Our Model · Our Operations · Impact · Leadership · Insights · Contact
- [x] `/our-model/` page
- [x] `/impact/` page
- [x] `/leadership/` (replaces Team in nav)
- [x] `/insights/` (replaces Blog in nav)
- [x] `/our-operations/` landing with three platforms
- [x] `/our-operations/oncoclinics-africa/`
- [x] `/our-operations/rencare-africa/`
- [x] `/our-operations/pocch/`
- [x] Contact patient-routing cards before corporate form
- [x] Footer: corporate + platform + legal stubs + dynamic year
- [x] 301 redirects from old URLs (`/about-us`, `/our-team`, `/blog`, `/operations`, etc.)
- [~] Gallery kept off main nav; route retained as optional archive
- [ ] Breadcrumbs on all L2/L3 pages
- [ ] Phase-two: Careers, case studies, media centre, reports

### Forms & compliance
- [x] Contact form fields: name, organisation, email, phone (optional), enquiry type, message, privacy ack
- [x] Privacy disclaimer on form (no clinical data)
- [~] Privacy / Cookie / Terms / Accessibility stub pages (placeholder copy)
- [ ] Wire form to production mailbox / your CMS API
- [ ] Newsletter subscription via your CMS API

### Design / assets (placeholders OK)
- [x] Continue using available Figma-exported / placeholder images
- [ ] Replace with authentic HIA photography shot list `[!]`
- [ ] Platform logos from master brand files (not screenshots) `[!]`
- [ ] Leadership portraits from approved register `[!]`
- [ ] Accent cyan confirm `#00CFF3` vs brand file `[!]`

### SEO & QA (baseline)
- [x] Per-route metadata updated toward brief titles
- [x] Sitemap / robots include new routes
- [ ] Structured data (Organisation, Person, Article, BreadcrumbList)
- [ ] Full WCAG 2.2 AA pass
- [ ] Licensed Neue Montreal / Aeonik fonts

---

## Phase B — Client-dependent

- [ ] Dated metrics register
- [ ] POCCH clinical service descriptions sign-off
- [ ] LinkedIn URL + final contact block
- [ ] CMS decision (see below) and API contract

---

## CMS decision log

**Your existing CMS API** (newsletter, blog/insights, etc.) remains a strong default for content you already manage there.

**Sanity** is a good option if you want: portable GROQ content, live preview, structured leadership/locations, and editor UX without owning admin UI. Cost/complexity rises if you *also* keep a custom API—avoid dual systems for the same content types.

**Recommendation (pending your choice):**  
1. Keep **your API** for newsletter + insights/blog if it already works.  
2. Use **Sanity** only if you need richer structured corporate content (locations, leadership, platforms) *and* are willing to migrate or federate.  
3. Or: Sanity as headless source → your API as middleware (one write path).

Do not build a second blog store until the contract is chosen.

---

## Changelog

| Date | Notes |
|------|--------|
| 2026-08-06 | Brief-aligned IA, copy, metrics, new pages, contact routing, checklist created |
| 2026-08-06 | Shipped Phase A possible updates; placeholder images retained; legal stubs added |
