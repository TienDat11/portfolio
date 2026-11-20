import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { portfolioData } from '../data/portfolio'
import { getContainRect, getDeviceBox, getStageRegion, renderStage } from '../lib/deviceRenderer'
import { FRAME_ASPECT, preloadFrames, selectFrameLayers, type FrameLayer } from '../lib/frames'
import { clamp, usePrefersReducedMotion } from '../lib/motion'
import CvMenu from './CvMenu'

/** Per-frame damping at 60 fps; scaled by real frame time elsewhere. */
const SCROLL_DAMPING = 0.14
const ORBIT_DAMPING = 0.05
/** One full forward-and-back orbit takes 16 seconds. */
const ORBIT_OMEGA = (2 * Math.PI) / 16

/** Canvas backing-store scale cap. The canvas draws only the thin orbit ring and brackets (frames are DOM layers), so 1x is enough. */
const MAX_DPR = 1
/** While idle, the procedural device still animates; redraw it at about 20 fps instead of every frame. */
const IDLE_REDRAW_MS = 50

/** Feathers all four edges of the frame layers into transparency so they blend into the backdrop. */
const FEATHER = 'linear-gradient(to right, transparent, #000 10%, #000 90%, transparent), linear-gradient(to bottom, transparent, #000 10%, #000 90%, transparent)'
const DEVICE_MASK_STYLE: CSSProperties = {
  maskImage: FEATHER,
  WebkitMaskImage: FEATHER,
  maskComposite: 'intersect',
  WebkitMaskComposite: 'source-in',
}

interface Motion {
  /** Scroll position through the pinned stage, 0..1. */
  target: number
  /** Damped scroll position that drives the frames. */
  current: number
  /** 0 = scroll-locked, 1 = fully auto-orbiting. */
  orbitMix: number
  hasScrolled: boolean
  degrees: number
  act: number
}

const ACT_COUNT = portfolioData.showcase.length

export default function HeroScrollStage() {
  const { profile, showcase } = portfolioData
  const reduced = usePrefersReducedMotion()

  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cardRefs = useRef<(HTMLElement | null)[]>([])
  const degreeRef = useRef<HTMLSpanElement>(null)
  const barRef = useRef<HTMLSpanElement>(null)
  const framesRef = useRef<HTMLImageElement[]>([])
  const deviceRef = useRef<HTMLDivElement>(null)
  const slotRefs = useRef<(HTMLImageElement | null)[]>([])
  const sheenRef = useRef<HTMLDivElement>(null)
  const reducedRef = useRef(reduced)
  const orbitRef = useRef(!reduced)
  const motionRef = useRef<Motion>({
    target: 0,
    current: 0,
    orbitMix: 0,
    hasScrolled: false,
    degrees: -1,
    act: -1,
  })

  const [autoOrbit, setAutoOrbit] = useState(!reduced)
  const [act, setAct] = useState(0)

  useEffect(() => {
    reducedRef.current = reduced
    if (reduced) {
      // Reduced motion: no auto-orbit, and the toggle must not claim it is on.
      orbitRef.current = false
      setAutoOrbit(false)
    }
  }, [reduced])

  useEffect(() => {
    if (framesRef.current.length === 0) {
      const start = () => preloadFrames(framesRef.current)
      if (document.readyState === 'complete') {
        start()
      } else {
        window.addEventListener('load', start, { once: true })
        return () => window.removeEventListener('load', start)
      }
    }
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const stage = canvas?.parentElement
    const device = deviceRef.current
    if (!section || !canvas || !ctx || !stage || !device) return

    const motion = motionRef.current
    const layers: FrameLayer[] = []
    let box = getDeviceBox(stage.clientWidth, stage.clientHeight)
    let drawnProgress = Number.NaN
    let drawnProcedural: boolean | null = null
    let lastDraw = 0
    let visible = true
    let last = performance.now()

    // The canvas covers only the device region of the stage; its transform maps stage coordinates onto it.
    const resize = () => {
      const width = stage.clientWidth
      const height = stage.clientHeight
      const region = getStageRegion(width, height)
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
      canvas.style.left = `${region.x}px`
      canvas.style.top = `${region.y}px`
      canvas.style.width = `${region.w}px`
      canvas.style.height = `${region.h}px`
      canvas.width = Math.round(region.w * dpr)
      canvas.height = Math.round(region.h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, -region.x * dpr, -region.y * dpr)
      box = getDeviceBox(width, height)
      const rect = getContainRect(box, FRAME_ASPECT)
      device.style.left = `${rect.x}px`
      device.style.top = `${rect.y}px`
      device.style.width = `${rect.w}px`
      device.style.height = `${rect.h}px`
      drawnProgress = Number.NaN
    }

    const measure = () => {
      const range = section.offsetHeight - window.innerHeight
      const top = section.getBoundingClientRect().top
      motion.target = range > 0 ? clamp(-top / range, 0, 1) : 0
    }

    // Passive listener only writes a ref; all visual work happens in the rAF loop.
    const onScroll = () => {
      motion.hasScrolled = true
      measure()
    }

    resize()
    measure()
    if (window.scrollY > 0) motion.hasScrolled = true

    const resizeObserver = new ResizeObserver(() => {
      resize()
      measure()
    })
    resizeObserver.observe(stage)
    window.addEventListener('scroll', onScroll, { passive: true })

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
      },
      { rootMargin: '120px 0px' },
    )
    visibilityObserver.observe(section)

    let frame = 0
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick)
      const frames60 = clamp((now - last) / (1000 / 60), 0, 3)
      last = now
      if (!visible) return

      motion.current += (motion.target - motion.current) * (1 - Math.pow(1 - SCROLL_DAMPING, frames60))

      const orbiting = orbitRef.current && !reducedRef.current && !motion.hasScrolled
      motion.orbitMix += ((orbiting ? 1 : 0) - motion.orbitMix) * (1 - Math.pow(1 - ORBIT_DAMPING, frames60))

      const seconds = now / 1000
      const pingPong = 0.5 + 0.5 * Math.sin(seconds * ORBIT_OMEGA)
      const progress = motion.current + (pingPong - motion.current) * motion.orbitMix

      // Chapter cards: each card is fully opaque within a quarter act of its centre and gone
      // by half an act away, so neighbouring cards never both show and their headlines can't stack.
      // The first and last cards hold at the ends of the range, so card 01 is fully visible at 0%.
      const position = progress * ACT_COUNT
      for (let i = 0; i < ACT_COUNT; i++) {
        const card = cardRefs.current[i]
        if (!card) continue
        let distance = position - (i + 0.5)
        if (i === 0 && distance < 0) distance = 0
        if (i === ACT_COUNT - 1 && distance > 0) distance = 0
        const weight = clamp(1 - (Math.abs(distance) - 0.25) / 0.25, 0, 1)
        card.style.opacity = weight.toFixed(3)
        card.style.transform = `translate3d(0, ${(-distance * 36).toFixed(1)}px, 0)`
        card.style.pointerEvents = weight > 0.5 ? 'auto' : 'none'
      }

      const degrees = Math.round(progress * 360)
      if (degrees !== motion.degrees) {
        motion.degrees = degrees
        if (degreeRef.current) degreeRef.current.textContent = `${degrees}°`
      }
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress.toFixed(4)})`

      const actIndex = Math.min(ACT_COUNT - 1, Math.floor(progress * ACT_COUNT))
      if (actIndex !== motion.act) {
        motion.act = actIndex
        setAct(actIndex)
      }

      selectFrameLayers(framesRef.current, progress, layers)
      const procedural = layers.length === 0

      // Frames are DOM layers: two slots crossfaded by opacity, so frame changes cost no canvas raster.
      for (let i = 0; i < 2; i++) {
        const slot = slotRefs.current[i]
        const layer = layers[i]
        if (!slot) continue
        if (!layer) {
          slot.style.opacity = '0'
          continue
        }
        if (slot.src !== layer.image.src) slot.src = layer.image.src
        slot.style.opacity = layer.alpha.toFixed(3)
      }
      device.style.opacity = procedural ? '0' : '1'
      const sheen = sheenRef.current
      if (sheen) {
        const sweep = ((seconds * 0.12) % 1.6) / 1.6
        sheen.style.transform = `translate3d(${(sweep * 350 - 100).toFixed(2)}%, 0, 0)`
      }

      // The canvas holds the orbit ring and brackets (and the whole procedural device). Redraw on motion;
      // the procedural device is animated, so it also refreshes at a slow idle rate.
      const moved = Math.abs(progress - drawnProgress) >= 1e-4 || procedural !== drawnProcedural
      const idleRefresh = procedural && now - lastDraw >= IDLE_REDRAW_MS
      if (!moved && !idleRefresh) return
      drawnProgress = progress
      drawnProcedural = procedural
      lastDraw = now

      renderStage(ctx, {
        box,
        yaw: progress * Math.PI * 2,
        tilt: -0.2 + 0.02 * Math.sin(seconds * 0.5),
        time: seconds,
        procedural,
      })
    }

    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const goToAct = (index: number) => {
    const section = sectionRef.current
    if (!section) return
    const range = section.offsetHeight - window.innerHeight
    const top =
      window.scrollY + section.getBoundingClientRect().top + ((index + 0.5) / ACT_COUNT) * range
    window.scrollTo({ top, behavior: reducedRef.current ? 'auto' : 'smooth' })
  }

  const toggleOrbit = () => {
    const next = !autoOrbit
    orbitRef.current = next
    if (next) motionRef.current.hasScrolled = false
    setAutoOrbit(next)
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      aria-label={`${profile.name}: scroll-driven showcase`}
      className="relative h-[320vh] max-md:h-[240vh]"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-obsidian text-slate-100">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_42%,#1d2945_0%,#0c1220_40%,#07090e_80%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,1)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,1)_1px,transparent_1px)] bg-[size:56px_56px] opacity-[0.05] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]"
        />
        {/* Device frames as composited DOM layers: crossfaded by opacity, feathered into the backdrop by mask. */}
        <div ref={deviceRef} aria-hidden className="pointer-events-none absolute overflow-hidden" style={DEVICE_MASK_STYLE}>
          <img
            ref={(el) => {
              slotRefs.current[0] = el
            }}
            alt=""
            draggable={false}
            className="absolute inset-0 h-full w-full"
            style={{ opacity: 0 }}
          />
          <img
            ref={(el) => {
              slotRefs.current[1] = el
            }}
            alt=""
            draggable={false}
            className="absolute inset-0 h-full w-full"
            style={{ opacity: 0 }}
          />
          <div
            ref={sheenRef}
            className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"
          />
        </div>
        <canvas ref={canvasRef} aria-hidden className="absolute" />
        {/* Mobile: the device band sits behind the copy, so it is dimmed to keep the copy legible. */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-obsidian/90 via-obsidian/55 to-obsidian/90 md:hidden" />

        <div className="relative z-10 flex h-full flex-col px-6 pb-7 pt-24 md:px-14 md:pb-10 md:pt-28">
          <header className="max-w-xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-sky-300/80">
              {profile.title}
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-[1.02] tracking-tight text-white sm:text-5xl md:text-6xl">
              {profile.name}
            </h1>
            <p className="mt-4 hidden max-w-lg text-sm leading-relaxed text-slate-400 md:block">
              {profile.tagline}
            </p>
          </header>

          <div className="relative mt-6 min-h-[15rem] flex-1 md:mt-10 md:min-h-[17rem] md:max-w-[44%]">
            {showcase.map((item, i) => (
              <article
                key={item.id}
                ref={(el) => {
                  cardRefs.current[i] = el
                }}
                aria-hidden={i !== act}
                className="absolute inset-x-0 top-0 will-change-[transform,opacity]"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <p className="font-mono text-xs text-sky-300">
                  {item.id} · {item.label}
                </p>
                <h2 className="mt-3 text-2xl font-semibold leading-snug text-white md:text-3xl">
                  {item.headline}
                </h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-400">{item.body}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {item.stats.map((stat) => (
                    <li
                      key={stat}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-slate-300"
                    >
                      {stat}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <CvMenu tone="dark" />
            <a
              href="#projects"
              className="rounded-full border border-white/15 px-5 py-2.5 font-mono text-xs text-slate-200 transition-colors hover:border-sky-300/60 hover:text-white"
            >
              Explore 9 Production Systems
            </a>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/15 px-5 py-2.5 font-mono text-xs text-slate-200 transition-colors hover:border-sky-300/60 hover:text-white"
            >
              GitHub (@{profile.github})
            </a>
          </div>

          <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-5 md:flex-row md:items-center md:justify-between">
            <nav aria-label="Showcase chapters" className="grid grid-cols-3 gap-2 md:flex">
              {showcase.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goToAct(i)}
                  aria-current={act === i ? 'step' : undefined}
                  className={`rounded-lg border px-3 py-2 text-left font-mono text-[11px] transition-colors ${
                    act === i
                      ? 'border-sky-300/60 bg-sky-300/10 text-white'
                      : 'border-white/10 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {item.id}
                  <span className="hidden sm:inline"> · {item.label}</span>
                </button>
              ))}
            </nav>

            <div className="flex flex-wrap items-center gap-4 font-mono text-[11px] text-slate-400">
              <span className="tabular-nums text-slate-200">
                {String(act + 1).padStart(2, '0')} / {String(ACT_COUNT).padStart(2, '0')}
              </span>
              <span className="tabular-nums">
                <span ref={degreeRef}>0°</span> → 360°
              </span>
              <div className="relative h-px w-20 overflow-hidden bg-white/10">
                <span
                  ref={barRef}
                  className="absolute inset-0 origin-left bg-sky-300"
                  style={{ transform: 'scaleX(0)' }}
                />
              </div>
              <span className="hidden lg:inline">60 FPS STUDIO STAGE</span>
              <button
                type="button"
                onClick={toggleOrbit}
                disabled={reduced}
                aria-pressed={autoOrbit}
                className="rounded-full border border-white/15 px-3 py-1.5 transition-colors hover:text-white disabled:opacity-40"
              >
                Auto-Orbit · {autoOrbit ? 'On' : 'Off'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
