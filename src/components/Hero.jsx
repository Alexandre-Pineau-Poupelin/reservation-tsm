export default function Hero() {
  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-ocean-900 via-ocean-800 to-ocean-700">
      {/* Subtle dot-grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Warm light glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-coral-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Location badge */}
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sand-200 text-sm font-medium tracking-widest uppercase mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-coral-400 animate-pulse" />
          La Tranche-sur-Mer · Vendée
        </span>

        {/* Main heading */}
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-white font-bold leading-[1.1] mb-6">
          Votre Maison<br />
          <span className="text-sand-300">Face à l'Océan</span>
        </h1>

        {/* Tagline */}
        <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-xl mx-auto mb-10 leading-relaxed">
          Une maison de caractère à deux pas de la plage, pour des vacances inoubliables en famille ou entre amis.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => scrollTo('booking')}
            className="px-8 py-4 bg-coral-500 hover:bg-coral-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Réserver maintenant
          </button>
          <button
            onClick={() => scrollTo('calendar')}
            className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold rounded-xl transition-all duration-200 backdrop-blur-sm"
          >
            Voir les disponibilités
          </button>
        </div>

        {/* Feature pills */}
        <div className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-3">
          {[
            { icon: '🏖️', label: 'Accès direct à la plage' },
            { icon: '👥', label: "Jusqu'à 10 personnes" },
            { icon: '✨', label: 'Wi-Fi & climatisation' },
          ].map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-white/50 text-sm">
              <span>{icon}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Wave transition to next section */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 72"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full block"
        >
          <path
            d="M0,36 C240,72 480,0 720,36 C960,72 1200,0 1440,36 L1440,72 L0,72 Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>
  )
}
