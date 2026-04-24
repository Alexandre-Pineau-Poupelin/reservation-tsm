export default function Footer() {
  return (
    <footer className="bg-ocean-900 text-white/50 py-10 px-6">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="font-display text-lg text-white/80">La Tranche-sur-Mer</p>
        <p className="text-sm">&copy; {new Date().getFullYear()} — Tous droits réservés</p>
      </div>
    </footer>
  )
}
