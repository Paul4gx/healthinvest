# Health Invest

Marketing site for Health Invest — specialized healthcare networks (Oncoclinics & Rencare) across Africa.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4 + shadcn/ui
- Framer Motion + Lucide
- React Hook Form + Zod
- `next/image` + `next/font`

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Fonts

- **Montserrat** — body / UI
- **Manrope** — nav / display (Aeonik substitute until licensed files are available)

Drop licensed `.woff2` files into `public/fonts` and switch `lib/fonts.ts` to `next/font/local` for an exact match.

## Scripts

- `npm run dev` — development
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint

## Structure

```
app/                 # routes + API
components/
  layout/            # container, logo, shell
  navigation/        # header
  footer/            # footer
  ui/                # primitives + motion helpers
  sections/          # page sections
content/             # static copy & data
hooks/
lib/
types/
public/
styles/
```

## Design & content sources

- **Figma:** Health Invest New Project (`Yf3jXoks0eGKjpJBFu9TVJ`) — visual reference  
- **Company brief:** `HIA Website Rework Development Brief v1.1.doc`  
- **Working brief reference:** [`docs/HIA-DEVELOPMENT-BRIEF.md`](docs/HIA-DEVELOPMENT-BRIEF.md)  
- **Implementation checklist:** [`docs/IMPLEMENTATION-CHECKLIST.md`](docs/IMPLEMENTATION-CHECKLIST.md)

When Figma and the brief disagree on strategy, metrics, navigation, or approved copy, prefer the brief until management re-approves.
