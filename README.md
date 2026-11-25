# APW Electrical: website redesign mockup

Mockup rebuild of http://apwelectrical.com.au for **APW Electrical Pty Ltd** (Andrew Whall, Rockingham WA).
Plain HTML, CSS and a small JS file. No build step: open `index.html` in a browser.

## Pages

| File | Page | Content source on the old site |
|---|---|---|
| `index.html` | Home | Home page (services, "Our Business", testimonials) |
| `services.html` | Services overview | `/services/` |
| `residential.html` | Residential services | `/residential-services/` |
| `commercial.html` | Commercial, Real Estate & Industrial | `/commercial-real-estate-industrial-services/` |
| `areas.html` | Areas we service | `/service-areas/` plus the 7 "Electrician [suburb]" pages, merged into one |
| `news.html` | Tips & News | `/news/` (the 3 existing blog posts) |
| `contact.html` | Contact + quote form | `/contact-us/` |

Shared files: `css/style.css` and `js/main.js` (mobile menu, footer year, quote form).

All text, phone numbers, address, ABN, licence (EC 8485) and the two testimonials (Rob Weber, John Burnett) come from their current site. Nothing was invented: no prices, awards or opening hours (the old site only says "during office hours", so that's what the mockup says too).

## What changed vs. the old site (sales pitch points, rechecked 24 Nov 2026)

**Lead status: not interested (called 24 Nov 2026).**

- **Easier to call on a phone.** The old site does work on phones. Its only tap-to-call link is the office number at the top, which scrolls away, and the "Call us now" button opens the Contact page instead of calling. The new one has a **sticky "Call 0421 482 284 / Free quote" bar** at the bottom of every page on mobile.
- **Tap-to-call everywhere.** Mobile and office numbers are clickable on every page (header, hero, sidebar, footer).
- **Modern, clean look in their own brand colours.** It keeps their logo yellow (#F6EB13), sky blue (#00AEEF) and charcoal, but drops the old carousel banners.
- **Clearer structure.** The seven near-identical "Electrician Rockingham / Baldivis / Kwinana..." pages are merged into one tidy **Areas** page, and a dedicated **quote request form** replaces the plain contact list.
- **Trust signals up front.** Licence EC 8485, "fully licensed & insured", free no-obligation quotes and the director photo are visible straight away instead of buried.
- **Fixes the old site's problems:** © 2016 footer (now shows the current year automatically), typos ("Electrcial", "thanks goodness", "good understanding or local legislation"). The old site answers on https, but typing the http address doesn't switch to it.
- **Dark mode and smooth motion.** Follows the phone or computer's light/dark setting, with a sun/moon toggle in the header that remembers the visitor's choice. Sections and cards fade up as you scroll, the header blurs and gets a shadow once you scroll, hovers and the mobile menu animate smoothly, images zoom slightly on hover, and there's a back-to-top button and clear keyboard focus outlines. All motion turns off for visitors who set "reduce motion".
- **Faster.** No WordPress, jQuery or slider plugins. Images were resized and compressed (the director photo went from 1.9 MB to 86 KB).

### Don't say

- "It doesn't work on phones." It does, with a proper phone menu.
- "Customers can't tap your number." The office number can be tapped.
- "Your site isn't secure." https works.
- "Your WordPress is out of date." It reports version 7.1.5.

## Images

Every image was downloaded from their own domain (`apwelectrical.com.au/wp-content/uploads/...`), then cropped or resized. Location (GPS) data in the original iPhone photos was removed when they were re-saved.

| File | Original on apwelectrical.com.au | Notes |
|---|---|---|
| `apw-logo.jpg` | `2016/06/APWWebHeader1Final-e1467000225741.jpg` | Logo cropped from the wide header banner |
| `apw-logo-stacked.jpg` | `2016/06/APWWebHeaderyellow1Final.jpg` | Stacked logo cropped from the left half of the banner |
| `multimeter-testing.jpg` | `2016/06/APWWebHeaderyellow1Final.jpg` | Photo half of the banner |
| `data-cabling.jpg` | `2016/06/APWWebHeaderBlueFinal.jpg` | Photo half of the banner |
| `led-lighting.jpg` | `2016/06/APWWebHeaderBlackFinal.jpg` | Photo half of the banner |
| `electrical-tools.jpg` | `2016/06/APWWebHeaderYellow2Final.jpg` | Photo half of the banner |
| `andrew-whall-director.jpg` | `2016/06/Director.jpg` | Resized, GPS removed |
| `apw-office-vans.jpg` | `2016/06/office1-1.jpg` | Resized, GPS removed |
| `switchboard.jpg` | `2016/06/IMG_0515-2-1.png` | Converted to JPG |
| `ceiling-fan.jpg` | `2016/06/Ceiling_Fan_Installed-2.jpg` | Resized |
| `electrician-at-work.jpg` | `2016/06/12219323_xxlSmall.jpg` | Resized. Downloaded but not used on a page yet (spare) |

The banner photos and the ceiling fan and collage images look like stock photos the original designer licensed. Check that APW still holds the rights before going live. The two testimonial profile photos and the Google Maps screenshot on the old site were deliberately left out; the contact page links to Google Maps instead.

## Notes before going live

- The quote form opens the visitor's email app (a `mailto:` link) so the mockup works without a server. For a live site, swap it for a form service (Formspree, Netlify Forms, etc.).
- Fonts load from Google Fonts (Barlow / Barlow Condensed). The site falls back to system fonts if they're blocked.
