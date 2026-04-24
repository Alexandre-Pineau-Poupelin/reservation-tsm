# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**reservation-tsm** — Booking app for a vacation house in La Tranche-sur-Mer (Vendée, France).  
Stack: React 18 + Vite + TailwindCSS v3 frontend. Reservation submissions POST JSON to an n8n webhook.

## Commands

```bash
npm install       # install dependencies
npm run dev       # dev server (localhost:5173)
npm run build     # production build → dist/
npm run preview   # serve the production build locally
```

## Environment Variables

Configured in `.env` (copy from `.env.example`):

| Variable | Required | Description |
|---|---|---|
| `VITE_N8N_WEBHOOK_URL` | Yes | n8n webhook URL that receives booking submissions |
| `VITE_GOOGLE_CALENDAR_SRC` | No | Google Calendar embed `src` URL for the availability section |

If `VITE_N8N_WEBHOOK_URL` is missing, the form shows a configuration error instead of submitting.  
If `VITE_GOOGLE_CALENDAR_SRC` is missing, the calendar section shows a placeholder.

## Architecture

Single-page app. No router — one scrollable page with three sections:

- **Hero** (`components/Hero.jsx`) — full-screen hero with CTAs that scroll to `#calendar` and `#booking`
- **CalendarSection** (`components/CalendarSection.jsx`) — Google Calendar iframe or placeholder
- **Booking section** (in `App.jsx`) — hosts the form card; manages `idle | loading | success | error` state
  - **BookingForm** (`components/BookingForm.jsx`) — all form fields, per-field validation on blur, full validation on submit
  - **FormField** (`components/FormField.jsx`) — reusable `<input>` / `<textarea>` wrapper with label and error message
  - **SuccessMessage** (inline in `App.jsx`) — shown after a successful POST

### Form submission flow

`BookingForm` calls `onSubmit(formData)` → `App.handleSubmit` fetches `VITE_N8N_WEBHOOK_URL` with `method: POST, Content-Type: application/json`. On success sets status `'success'`; on error sets `errorMessage` and status `'error'`.

### Payload sent to n8n

```json
{
  "prenom": "Jean",
  "nom": "Dupont",
  "dateDebut": "2025-07-15",
  "dateFin": "2025-07-22",
  "personnes": 4,
  "description": "optional message"
}
```

## Design System

Custom Tailwind colors (defined in `tailwind.config.js`):
- `ocean-*` — deep navy blues (hero, buttons, footer)
- `sand-*` — warm sandy tones (backgrounds, accents)
- `coral-*` — terracotta accent (hero CTA)
- `font-display` — Playfair Display serif (headings)
- `font-sans` — Inter (body text)
