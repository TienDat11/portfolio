import { useEffect, useState } from 'react'

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value))

const REDUCED_QUERY = '(prefers-reduced-motion: reduce)'

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(REDUCED_QUERY).matches,
  )

  useEffect(() => {
    const query = window.matchMedia(REDUCED_QUERY)
    const onChange = () => setReduced(query.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return reduced
}
