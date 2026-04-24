const calendarSrc = import.meta.env.VITE_GOOGLE_CALENDAR_SRC

export default function CalendarSection() {
  return (
    <section id="calendar" className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-ocean-700 text-sm font-semibold tracking-widest uppercase">
            Disponibilités
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-stone-800 mt-3 mb-4">
            Consultez le Calendrier
          </h2>
          <p className="text-stone-500 max-w-md mx-auto">
            Vérifiez les dates disponibles avant d'effectuer votre demande de réservation.
          </p>
        </div>

        {calendarSrc ? (
          <div className="rounded-2xl overflow-hidden shadow-lg border border-stone-100">
            <iframe
              src={calendarSrc}
              style={{ border: 0 }}
              width="100%"
              height="520"
              frameBorder="0"
              scrolling="no"
              title="Calendrier de disponibilités"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="rounded-2xl bg-sand-50 border-2 border-dashed border-sand-300 p-14 text-center">
            <div className="text-5xl mb-5">📅</div>
            <p className="text-stone-500 text-sm leading-relaxed max-w-sm mx-auto">
              Configurez{' '}
              <code className="bg-sand-200 px-1.5 py-0.5 rounded text-stone-700 font-mono text-xs">
                VITE_GOOGLE_CALENDAR_SRC
              </code>{' '}
              dans votre fichier{' '}
              <code className="bg-sand-200 px-1.5 py-0.5 rounded text-stone-700 font-mono text-xs">
                .env
              </code>{' '}
              pour afficher le calendrier.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
