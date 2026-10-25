# Crema & Co. — specialty cafe website

A modern, fully responsive, **frontend-only** marketing and ordering site for a fictional
specialty cafe. No backend, no database, no network requests: every price, review, event and
order is mock data held in `src/data/`, and all state lives in React memory or `localStorage`.

Built with **React 18 + Vite 5 + Tailwind CSS 3.4**, animated with **Framer Motion**,
icons from **Lucide**, routing from **React Router 6**.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production bundle in dist/
npm run preview    # serve the built bundle
```

Requires Node.js 18 or newer. Nothing else to configure — no API keys, no `.env`.

> The dev server port and the `@` → `src/` path alias are set in `vite.config.js`.

---

## Design system

| Token | Light | Dark (deep roasted brown) |
| --- | --- | --- |
| `bg-surface` | cream `#F7F1E8` | near-black espresso `#120C09` |
| `bg-surface-raised` | off-white card | `#241913` |
| `text-ink` / `text-ink-muted` / `text-ink-subtle` | espresso browns | cream tones |
| `ring-hairline` | soft tan rule | warm dark rule |
| accents | `caramel #C68B59`, `sage #7A8B69`, `espresso #3B2A20` | same hues, lifted for contrast |

Palette switching is CSS-variable driven (`src/index.css`), so components use semantic classes
(`bg-surface`, `text-ink-muted`) and both themes stay in sync automatically. The theme is applied
before first paint by an inline script in `index.html`, so there is no wrong-theme flash on load.

- **Type**: Fraunces (display serif) + DM Sans (body), loaded from Google Fonts.
- **Shape**: `rounded-3xl`/`rounded-4xl`, `shadow-soft` / `shadow-soft-lg`, generous whitespace.
- **Motion**: scroll reveals (`Reveal`), hover lifts (`Card interactive`), page transitions
  (`Layout`), parallax hero, steaming-cup loading screen. Everything collapses gracefully under
  `prefers-reduced-motion`, and the footer has a manual "force animations" switch.
- **Photography**: Unsplash URLs, all funnelled through `src/data/photos.js` so the asset set can
  be replaced in one file. `ImageWithFallback` lazy-loads, reserves layout space by aspect ratio
  and renders a branded placeholder if a URL ever fails.

---

## Structure

```
src/
  main.jsx              providers + router
  App.jsx               route table (all pages listed below)
  index.css             tokens, base styles, custom scrollbar, utilities
  components/
    ui/                 primitives: Button, Card, Badge, Chip, Modal, Drawer, SectionHeading,
                        Rating, Reveal, Icon, ImageWithFallback, Skeleton, Accordion, Fields,
                        QuantityStepper, Seo
    layout/             Navbar, MobileNav, AnnouncementBar, Footer, Layout, CartButton,
                        ThemeToggle, PrefsMenu, Logo, CookieBanner, FloatingButtons, LoadingScreen
    cart/               CartDrawer (global slide-in cart)
    home/               Hero, AboutTeaser, SignatureDrinks, WhyChooseUs, PopularItems,
                        PromoBanners, GalleryStrip, TestimonialSlider, Newsletter
    menu/               MenuCard, ItemModal (size / milk / add-ons / notes / live price)
                        Every other page keeps its sections inside src/pages/<Page>.jsx.
  contexts/             ThemeContext (theme + motion), PrefsContext (currency + language),
                        ToastContext, WishlistContext, CartContext (cart, promo, tip,
                        fulfilment, orders and the loyalty record)
  data/                 site, menu, testimonials, events, gallery, team, blog, faq, careers,
                        offers, loyalty, promoCodes, reservations, giftCards, photos
  hooks/                useLocalStorage, useMediaQuery (useIsDesktop/useIsMobile),
                        useScroll + useParallax, useLockBodyScroll, useFocusTrap,
                        useOpenNow + useOpenNowLive
  pages/                Home, Menu, Checkout, OrderConfirmation, Reservations, About, Gallery,
                        Events, Loyalty, Blog, BlogPost, Contact, GiftCards, Faq, Careers,
                        Privacy, Terms, Admin, NotFound
  stores/               contentStore — the localStorage overlay the /admin page writes to
```

### Routes

`/` · `/menu` · `/checkout` · `/order-confirmation` · `/reservations` · `/about` · `/gallery` ·
`/events` · `/loyalty` · `/blog` · `/blog/:slug` · `/contact` · `/gift-cards` · `/faq` ·
`/careers` · `/privacy` · `/terms` · `/admin` · `*` (404)

`/menu` also accepts query params: `?category=cold-brew`, `?search=latte` (the 404 page's
menu search uses this) and `?wishlist=1` (favourites only).

---

## Feature map

**Ordering.** Add items from the home carousel, the menu grid or the customise modal → the cart
drawer handles quantities, pickup/delivery, tip (0–20%), promo codes (`COFFEE10`, `HAPPY20`,
`BAKERY5`, `FREEDRIVE`, `FIRSTPOUR`), tax at 8.5% and free delivery over $30. Checkout is a
three-step flow (details → mock payment → review) with per-field validation; confirming places a
mock order, spends the cart, pays out loyalty stamps and lands on an animated status tracker with
a copyable order number. Cart, orders and the checkout draft persist across refreshes.

**Reservations.** Date picker bounded to the next 60 days, half-hourly slot chips with
deterministic simulated availability (some slots return "Fully booked" or "Rush — only counter
seats"), guest count, seating preference, occasion and requests, ending in a confirmation modal
whose "Add to calendar" generates a real `.ics` file in the browser.

**Loyalty.** Ten-slot digital stamp card with an animated stamp, tiers, rewards progress and a
frontend-only sign-up / sign-in modal. The card lives in `CartContext` (`crema.loyalty` in
localStorage), so placing an order really does fill it: stamps cap at a full card, redemption
clears the card and lifetime stamps keep counting towards tiers and the multi-card rewards.

**Content.** About (timeline, team, bean origins, sustainability, awards and press), Gallery
(masonry + lightbox with keyboard arrows and swipe), Events (filters, seat counts, RSVP modal),
Blog (categories, article layout with reading progress and related posts), Contact (validated
form, map embed, live "Open now" badge driven by `openingHours`), Gift cards (live preview +
mock code), FAQ (search + accordion), Careers, Privacy, Terms and a branded 404.

**Staff admin (`/admin`, linked discreetly in the footer).** Frontend-only editor for the counter
menu and the shop's contact details, gated by the mock password `crema`. Add, edit or hide menu
items (name, section, price, calories, prep time, description, photo, customisation preset,
rating, badge, featured/popular and diet tags) and change the displayed number, email, WhatsApp
digits and street address. `tel:`/`wa.me` links, the full address and the Google Maps embed and
directions URLs are all derived, so the navbar, footer, floating buttons, contact page and menu
update the moment you save — no reload.

**Your own photos on the menu.** Each item form has a *Site photo* dropdown (the shipped Unsplash
set) plus a *Your own photo* card with two ways to override it:

1. **Choose a photo** — the file is read in the browser, redrawn on a `<canvas>` at up to 1000 px
   on the longest edge, and re-encoded as a JPEG quality .82 (`toStoredPhoto` in
   `src/pages/Admin.jsx`). The result is stored as a `data:` URL, so it stays inside the ~5 MB
   `localStorage` quota (~14 KB per photo). "Use the site photo" removes the override. This photo
   is visible **only in the browser that uploaded it**.
2. **Or type a photo address** — drop the real file into `public/photos/` and enter
   `/photos/name.jpg`. Vite (and the built bundle) serves it at that path, so it shows for every
   visitor. Keep files near 1000 px and under ~300 KB; see `public/photos/_readme.txt`.

`menuItemImage(item)` resolves `photoUrl` first and falls back to `imageKey`; `lineImage(line)`
reads through the live item, so an admin photo also appears in the cart drawer, checkout and
receipt without a second copy of the URL. A path that does not exist yet fails through to the
branded `ImageWithFallback` placeholder rather than breaking the layout.

Changes are stored as a small *overlay* under one key, `crema.admin.content`: `{ added, updated,
removed, contact }` (an item's override lives in its `photoUrl` field). `src/data/*` remains the
seed, so edits you never touched still follow the data files, and "Discard local changes" wipes the
key and puts the seed values back. The unlocked state is remembered for the browser session, and
corrupt or missing storage falls back to the seed.

**Global chrome.** Sticky transparent navbar that solidifies on scroll with cart badge and mobile
drawer, cookie consent banner, floating WhatsApp / call / back-to-top buttons, toast system,
loading screen, wishlist hearts saved locally, currency + language switcher (display-only mock),
Schema.org JSON-LD for the local business and menu, Open Graph and Twitter meta per route.

---

## Accessibility

Skip-to-content link, semantic landmarks and heading order, `aria-label` on icon-only controls,
`aria-pressed` on toggles, `role="dialog"`/`aria-modal` with focus trapping and Escape on every
modal and drawer, labelled form fields with inline error messaging, visible focus rings, contrast
checked in both themes, and full reduced-motion support.

---

## Notes and limits

- No real payment, booking, email or analytics code runs anywhere; the copy says so where relevant.
- `/admin` is not authentication. The password is a literal string in `src/pages/Admin.jsx` and the
  unlocked flag is a session value, so anyone with devtools can bypass it. It keeps a curious
  customer out of the form, nothing more — a real deployment needs a server-side gate. Admin edits
  are visible only in the browser that made them, since they live in `localStorage`.
- Fonts and imagery come from Google Fonts and Unsplash CDNs, so a fully offline environment falls
  back to system fonts and the `ImageWithFallback` placeholder. Replace them via
  `src/data/photos.js` and `index.html` if you need self-hosted assets.
- `npm run build` produces a static bundle. Because the app uses client-side routing, deep links
  (`/menu`) need a SPA fallback on your host (Netlify `_redirects`, Vercel rewrite, or nginx
  `try_files $uri /index.html`).
