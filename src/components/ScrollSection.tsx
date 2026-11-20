import { useEffect, useRef, useState, type ReactNode } from 'react'
import { clamp, usePrefersReducedMotion } from '../lib/motion'

interface ScrollSectionProps {
  children: ReactNode
  /** Vertical parallax depth in px; the inner content drifts by up to ±depth/2. */
  depth?: number
  delay?: number
  className?: string
}

/**
 * Reveals its children once when they enter the viewport and drifts them with scroll.
 * Reduced-motion users get the content immediately with no parallax.
 */
export default function ScrollSection({ children, depth = 0, delay = 0, className = '' }: ScrollSectionProps) {
  const reduced = usePrefersReducedMotion()
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(false)
  const isRevealed = revealed || reduced

  useEffect(() => {
    const outer = outerRef.current
    if (!outer || reduced) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    observer.observe(outer)
    return () => observer.disconnect()
  }, [reduced])

  useEffect(() => {
    const inner = innerRef.current
    if (!inner || reduced || depth === 0) return

    let frame = 0
    const update = () => {
      frame = 0
      const rect = inner.getBoundingClientRect()
      const viewport = window.innerHeight
      // 0 when the element enters at the bottom edge, 1 when it leaves at the top edge.
      const p = clamp((viewport - rect.top) / (viewport + rect.height), 0, 1)
      inner.style.transform = `translate3d(0, ${((0.5 - p) * depth).toFixed(1)}px, 0)`
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [depth, reduced])

  return (
    <div
      ref={outerRef}
      className={`transition-[opacity,transform] duration-700 ease-out ${
        isRevealed ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      } ${className}`}
      style={{ transitionDelay: isRevealed ? `${delay}ms` : undefined }}
    >
      <div ref={innerRef} className="will-change-transform">
        {children}
      </div>
    </div>
  )
}
