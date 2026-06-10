# HeimWerk Düsseldorf — Luxury Restaurant Website

## Tech Stack
- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Prisma ORM** (SQLite dev / PostgreSQL prod)
- **Resend** (Email delivery)
- **Zod** (Validation)

---

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Setup environment
```bash
cp .env.example .env
```
Edit `.env` and add your keys:
- `DATABASE_URL` — SQLite for dev, PostgreSQL for production
- `RESEND_API_KEY` — Get free key at resend.com (100 emails/day free)
- `FROM_EMAIL` / `TO_EMAIL` — Your restaurant email

### 3. Setup database
```bash
npm run db:push       # Create tables
npm run db:generate   # Generate Prisma client
npx tsx prisma/seed.ts # Seed menu data
```

### 4. Run development server
```bash
npm run dev
```
Open http://localhost:3000

---

## Features

### Frontend
- Fullscreen cinematic hero
- Animated scroll ticker
- Brand story section
- Philosophy pillars
- **Dynamic menu from database** (tabs, categories, all items)
- Gallery with hover effects
- Drinks section
- Reservation form with real backend
- Google Maps location
- Instagram + Facebook social links
- Cookie banner
- Fully responsive (mobile + tablet + desktop)

### Backend (API Routes)
| Endpoint | Method | Description |
|---|---|---|
| `/api/reservations` | POST | Create reservation + send emails |
| `/api/reservations` | GET | List reservations (admin use) |
| `/api/menu` | GET | Get full menu from database |
| `/api/contact` | POST | Save contact message |

### Database (Prisma)
| Model | Description |
|---|---|
| `Reservation` | Guest bookings with status tracking |
| `MenuKategorie` | Menu categories (Vorweg, Schnitzel, etc.) |
| `Gericht` | Individual menu items with price, vegan flags |
| `Kontakt` | Contact form messages |

---

## Deployment (Vercel — Recommended)

```bash
# 1. Push to GitHub
git init && git add . && git commit -m "init"
git remote add origin https://github.com/yourname/heimwerk.git
git push -u origin main

# 2. Connect Vercel to GitHub repo
# 3. Add environment variables in Vercel dashboard
# 4. Change DATABASE_URL to PostgreSQL (e.g. Neon.tech — free tier)
# 5. Run prisma migrate on production:
npx prisma migrate deploy
```

## Production Checklist
- [ ] Set `NODE_ENV=production`
- [ ] Switch to PostgreSQL (`DATABASE_URL`)
- [ ] Add `RESEND_API_KEY`
- [ ] Set `FROM_EMAIL` and `TO_EMAIL`
- [ ] Run `npm run db:migrate`
- [ ] Run seed script for menu data
- [ ] Configure custom domain in Vercel

---

## File Structure
```
heimwerk/
├── app/
│   ├── api/
│   │   ├── reservations/route.ts   ← Booking API
│   │   ├── menu/route.ts           ← Menu API
│   │   └── contact/route.ts        ← Contact API
│   ├── layout.tsx                  ← Root layout + fonts + SEO
│   ├── page.tsx                    ← Main page (all sections)
│   └── globals.css                 ← Tailwind + custom classes
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx              ← Fixed navbar + mobile menu
│   │   └── Footer.tsx              ← Footer + social links
│   └── sections/
│       ├── MenuSection.tsx         ← Tabbed menu (client)
│       └── ReservationForm.tsx     ← Booking form (client)
├── lib/
│   ├── db.ts                       ← Prisma client singleton
│   ├── email.ts                    ← Resend email functions
│   └── utils.ts                    ← cn(), formatPrice(), etc.
├── prisma/
│   ├── schema.prisma               ← Database models
│   └── seed.ts                     ← Menu data seeder
├── types/
│   └── index.ts                    ← TypeScript interfaces
├── .env.example                    ← Environment template
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```
