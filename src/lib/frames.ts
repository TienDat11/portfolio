import { clamp } from './motion'

export const FRAME_COUNT = 60

/** Frames are 1280x800 renders (scripts/generate-3d-sequence.mjs); the stage lays its layers out at this aspect. */
export const FRAME_ASPECT = 1280 / 800

export interface FrameLayer {
  image: HTMLImageElement
  alpha: number
}

export function frameIndexFor(progress: number): number {
  return Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(progress * (FRAME_COUNT - 1))))
}

function frameSource(index: number): string {
  return `${import.meta.env.BASE_URL}sequence/frame-${String(index + 1).padStart(2, '0')}.webp`
}

/** Starts loading every frame into `target`. Missing files simply never become ready. */
export function preloadFrames(target: HTMLImageElement[]): void {
  for (let i = 0; i < FRAME_COUNT; i++) {
    const image = new Image()
    image.decoding = 'async'
    image.src = frameSource(i)
    target[i] = image
  }
}

function isReady(image: HTMLImageElement | undefined): image is HTMLImageElement {
  return image !== undefined && image.complete && image.naturalWidth > 0
}

/**
 * Fills `layers` with the frames to draw for `progress` (0..1), cross-blending
 * between the two neighbouring frames. Returns an empty list when no frame is ready,
 * which tells the renderer to draw the procedural device instead.
 */
export function selectFrameLayers(
  frames: HTMLImageElement[],
  progress: number,
  layers: FrameLayer[],
): void {
  layers.length = 0
  const i0 = frameIndexFor(progress)
  const i1 = Math.min(FRAME_COUNT - 1, i0 + 1)
  const t = clamp(progress, 0, 1) * (FRAME_COUNT - 1) - i0
  const a = frames[i0]
  const b = frames[i1]

  if (isReady(a) && isReady(b) && i1 !== i0) {
    layers.push({ image: a, alpha: 1 }, { image: b, alpha: t })
  } else if (isReady(a)) {
    layers.push({ image: a, alpha: 1 })
  } else if (isReady(b)) {
    layers.push({ image: b, alpha: 1 })
  }
}
