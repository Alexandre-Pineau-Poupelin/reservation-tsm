export default function FormField({
  label,
  name,
  type = 'text',
  as,
  value,
  error,
  onChange,
  onBlur,
  className = '',
  ...props
}) {
  const inputClass = [
    'w-full px-4 py-3 rounded-xl border transition-colors duration-150',
    'bg-white text-stone-800 placeholder-stone-400',
    'focus:outline-none focus:ring-2',
    error
      ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
      : 'border-stone-200 focus:border-ocean-600 focus:ring-ocean-100',
  ].join(' ')

  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium text-stone-700 mb-1.5">
        {label}
      </label>

      {as === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`${inputClass} resize-none`}
          {...props}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={inputClass}
          {...props}
        />
      )}

      {error && (
        <p className="mt-1.5 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}
