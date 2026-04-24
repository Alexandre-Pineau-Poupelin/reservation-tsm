import { useState } from 'react'
import Hero from './components/Hero'
import CalendarSection from './components/CalendarSection'
import BookingForm from './components/BookingForm'
import Footer from './components/Footer'

const WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL

export default function App() {
  const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'success' | 'error' | 'unavailable'
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(formData) {
    if (!WEBHOOK_URL) {
      setStatus('error')
      setErrorMessage(
        "La configuration du webhook est manquante. Veuillez contacter l'administrateur.",
      )
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok || data.available === false) {
        setStatus('unavailable')
        setErrorMessage(data.message || 'Ces dates ne sont pas disponibles.')
        return
      }

      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMessage('Une erreur est survenue. Veuillez réessayer.')
    }
  }

  function handleReset() {
    setStatus('idle')
    setErrorMessage('')
  }

  return (
    <>
      <Hero />
      <CalendarSection />

      <section id="booking" className="py-20 px-6 bg-sand-50">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-ocean-700 text-sm font-semibold tracking-widest uppercase">
              Réservation
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-stone-800 mt-3 mb-4">
              Faites votre Demande
            </h2>
            <p className="text-stone-500 max-w-sm mx-auto">
              Remplissez le formulaire ci-dessous. Nous vous confirmerons votre réservation dans les plus brefs délais.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
            {status === 'success' ? (
              <SuccessMessage onReset={handleReset} />
            ) : (
              <>
                <BookingForm
                  onSubmit={handleSubmit}
                  isLoading={status === 'loading'}
                  error={status === 'error' ? errorMessage : null}
                />
                {status === 'unavailable' && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-start gap-3">
                    <span className="text-2xl">📅</span>
                    <div>
                      <p className="font-semibold">Dates non disponibles</p>
                      <p className="text-sm mt-1">{errorMessage}</p>
                      <p className="text-sm mt-1">Consultez le calendrier ci-dessus pour choisir d'autres dates.</p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

function SuccessMessage({ onReset }) {
  return (
    <div className="text-center py-6">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg
          className="w-8 h-8 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h3 className="font-display text-2xl text-stone-800 mb-3">Demande envoyée !</h3>
      <p className="text-stone-500 mb-8 max-w-sm mx-auto leading-relaxed">
        Merci pour votre demande. Nous l'avons bien reçue et vous contacterons rapidement pour confirmer votre séjour.
      </p>
      <button
        onClick={onReset}
        className="px-6 py-3 text-ocean-800 border border-ocean-200 rounded-xl hover:bg-ocean-50 transition-colors duration-150 font-medium text-sm"
      >
        Faire une nouvelle demande
      </button>
    </div>
  )
}
