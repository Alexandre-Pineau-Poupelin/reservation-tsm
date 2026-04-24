# reservation-tsm

Application de réservation pour une maison de vacances à La Tranche-sur-Mer (Vendée).

## Stack

- **Frontend** : React 18 + Vite
- **Style** : TailwindCSS v3
- **Automatisation** : n8n (réception des demandes via webhook)

## Installation

```bash
npm install
```

## Configuration

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `VITE_N8N_WEBHOOK_URL` | URL du webhook n8n — **requis** pour la soumission du formulaire |
| `VITE_GOOGLE_CALENDAR_SRC` | URL d'embed Google Calendar — optionnel |

### Obtenir l'URL du webhook n8n

Dans n8n, créez un workflow avec un nœud **Webhook** (méthode POST), copiez l'URL générée et collez-la dans `VITE_N8N_WEBHOOK_URL`.

### Obtenir l'URL du calendrier Google

1. Ouvrir Google Calendar
2. Paramètres de l'agenda → **Intégrer l'agenda**
3. Copier la valeur de l'attribut `src` de l'`<iframe>`

## Développement

```bash
npm run dev
```

## Production

```bash
npm run build    # génère le dossier dist/
npm run preview  # prévisualise le build
```

## Architecture

```
src/
├── App.jsx                 # Layout principal + logique de soumission
├── index.css               # Directives Tailwind
├── main.jsx                # Point d'entrée React
└── components/
    ├── Hero.jsx            # Section hero plein écran
    ├── CalendarSection.jsx # Embed Google Calendar
    ├── BookingForm.jsx     # Formulaire avec validation
    ├── FormField.jsx       # Champ réutilisable (input / textarea)
    └── Footer.jsx          # Pied de page
```

Le formulaire envoie un payload JSON au webhook n8n :

```json
{
  "prenom": "Jean",
  "nom": "Dupont",
  "dateDebut": "2025-07-15",
  "dateFin": "2025-07-22",
  "personnes": 4,
  "description": "Message optionnel"
}
```

n8n prend ensuite en charge la confirmation (email, agenda, CRM, notification…).
