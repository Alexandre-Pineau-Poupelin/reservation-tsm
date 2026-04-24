import { useState } from 'react'
import FormField from './FormField'

const INITIAL = {
  nom: '',
  prenom: '',
  email: '',
  dateDebut: '',
  dateFin: '',
  personnes: '',
  description: '',
}

function validate(fields) {
  const errors = {}

  if (!fields.nom.trim()) errors.nom = 'Le nom est requis.'
  if (!fields.prenom.trim()) errors.prenom = 'Le prénom est requis.'
  if (!fields.email.trim()) {
    errors.email = "L'email est requis."
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "L'adresse email n'est pas valide."
  }
  if (!fields.dateDebut) errors.dateDebut = "La date d'arrivée est requise."
  if (!fields.dateFin) {
    errors.dateFin = 'La date de départ est requise.'
  } else if (fields.dateDebut && fields.dateDebut >= fields.dateFin) {
    errors.dateFin = "La date de départ doit être postérieure à la date d'arrivée."
  }
  if (!fields.personnes) {
    errors.personnes = 'Le nombre de personnes est requis.'
  } else if (parseInt(fields.personnes, 10) < 1) {
    errors.personnes = 'Minimum 1 personne.'
  }

  return errors
}

export default function BookingForm({ onSubmit, isLoading, error }) {
  const [fields, setFields] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const today = new Date().toISOString().split('T')[0]

  function handleChange(e) {
    const { name, value } = e.target
    const next = { ...fields, [name]: value }
    setFields(next)
    if (touched[name]) {
      setErrors(validate(next))
    }
  }

  function handleBlur(e) {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors(validate(fields))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const allTouched = Object.keys(INITIAL).reduce((acc, k) => ({ ...acc, [k]: true }), {})
    setTouched(allTouched)
    const validationErrors = validate(fields)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    await onSubmit({ ...fields, personnes: parseInt(fields.personnes, 10) })
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          label="Prénom"
          name="prenom"
          value={fields.prenom}
          error={touched.prenom && errors.prenom}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Jean"
          autoComplete="given-name"
        />
        <FormField
          label="Nom"
          name="nom"
          value={fields.nom}
          error={touched.nom && errors.nom}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Dupont"
          autoComplete="family-name"
        />
        <FormField
          label="Email"
          name="email"
          type="email"
          value={fields.email}
          error={touched.email && errors.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="jean.dupont@email.com"
          autoComplete="email"
          className="sm:col-span-2"
        />
        <FormField
          label="Date d'arrivée"
          name="dateDebut"
          type="date"
          value={fields.dateDebut}
          error={touched.dateDebut && errors.dateDebut}
          onChange={handleChange}
          onBlur={handleBlur}
          min={today}
        />
        <FormField
          label="Date de départ"
          name="dateFin"
          type="date"
          value={fields.dateFin}
          error={touched.dateFin && errors.dateFin}
          onChange={handleChange}
          onBlur={handleBlur}
          min={fields.dateDebut || today}
        />
        <FormField
          label="Nombre de personnes"
          name="personnes"
          type="number"
          value={fields.personnes}
          error={touched.personnes && errors.personnes}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="4"
          min="1"
          max="20"
          className="sm:col-span-2"
        />
        <FormField
          label="Message (optionnel)"
          name="description"
          as="textarea"
          value={fields.description}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Questions, besoins particuliers, informations complémentaires…"
          rows={4}
          className="sm:col-span-2"
        />
      </div>

      {error && (
        <div className="mt-5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm leading-relaxed">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="mt-6 w-full py-4 px-6 bg-ocean-800 hover:bg-ocean-900 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2.5"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Envoi en cours…
          </>
        ) : (
          'Envoyer ma demande de réservation'
        )}
      </button>
    </form>
  )
}
