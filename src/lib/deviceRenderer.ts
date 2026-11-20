import { clamp } from './motion'

export interface Box {
  x: number
  y: number
  w: number
  h: number
}

export interface StageFrame {
  /** Device box in full-stage coordinates; the canvas may cover only part of the stage. */
  box: Box
  /** Turntable rotation around the vertical axis, in radians. */
  yaw: number
  /** Fixed camera tilt, in radians (negative looks slightly down onto the stage). */
  tilt: number
  /** Seconds since start; drives the procedural animation. */
  time: number
  /** True when no WebP frame is ready: the whole device is then drawn procedurally on the canvas. */
  procedural: boolean
}

type Vec3 = [number, number, number]
type Point = [number, number]

interface View {
  cx: number
  cy: number
  scale: number
  yaw: number
  tilt: number
}

interface UiRect {
  u0: number
  v0: number
  u1: number
  v1: number
  color: string
}

/** A flat quad in object space: origin + a*u + b*v for a, b in [0, 1]. */
interface Panel {
  origin: Vec3
  u: Vec3
  v: Vec3
  normal: Vec3
  fill: Vec3
  screen: boolean
  ui: UiRect[]
}

interface SolidObject {
  pos: Vec3
  /** Hinge rotation around X applied before the position (used for the laptop lid). */
  rx: number
  panels: Panel[]
}

/** Distance from the lens to the stage origin, in world units. */
const CAMERA = 7

const add = (a: Vec3, b: Vec3): Vec3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]]
const scale = (v: Vec3, s: number): Vec3 => [v[0] * s, v[1] * s, v[2] * s]
const dot = (a: Vec3, b: Vec3): number => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
const axisVec = (axis: number, value: number): Vec3 => {
  const v: Vec3 = [0, 0, 0]
  v[axis] = value
  return v
}

function normalize(v: Vec3): Vec3 {
  const length = Math.hypot(v[0], v[1], v[2])
  return scale(v, 1 / length)
}

function rotX(p: Vec3, angle: number): Vec3 {
  const c = Math.cos(angle)
  const s = Math.sin(angle)
  return [p[0], p[1] * c - p[2] * s, p[1] * s + p[2] * c]
}

function rotY(p: Vec3, angle: number): Vec3 {
  const c = Math.cos(angle)
  const s = Math.sin(angle)
  return [p[0] * c + p[2] * s, p[1], -p[0] * s + p[2] * c]
}

const LIGHT = normalize([-0.45, 0.75, -0.55])

function boxPanels(center: Vec3, half: Vec3, fill: Vec3): Panel[] {
  const panels: Panel[] = []
  for (let axis = 0; axis < 3; axis++) {
    const uAxis = (axis + 1) % 3
    const vAxis = (axis + 2) % 3
    const u = axisVec(uAxis, 2 * half[uAxis])
    const v = axisVec(vAxis, 2 * half[vAxis])
    for (const sign of [-1, 1]) {
      const faceCenter = add(center, axisVec(axis, sign * half[axis]))
      panels.push({
        origin: add(faceCenter, scale(add(u, v), -0.5)),
        u,
        v,
        normal: axisVec(axis, sign),
        fill,
        screen: false,
        ui: [],
      })
    }
  }
  return panels
}

function markScreen(panels: Panel[], ui: UiRect[]): void {
  const front = panels.find((panel) => panel.normal[2] < 0)
  if (!front) throw new Error('box has no front panel')
  front.screen = true
  front.ui = ui
}

const LAPTOP_BODY: Vec3 = [30, 37, 54]
const PHONE_BODY: Vec3 = [22, 26, 38]

const KANBAN_UI: UiRect[] = [
  { u0: 0, v0: 0.9, u1: 1, v1: 1, color: '#111c33' },
  { u0: 0.03, v0: 0.93, u1: 0.06, v1: 0.96, color: '#f43f5e' },
  { u0: 0.08, v0: 0.93, u1: 0.11, v1: 0.96, color: '#f59e0b' },
  { u0: 0.13, v0: 0.93, u1: 0.16, v1: 0.96, color: '#10b981' },
  { u0: 0.04, v0: 0.06, u1: 0.31, v1: 0.86, color: '#0f1a30' },
  { u0: 0.36, v0: 0.06, u1: 0.63, v1: 0.86, color: '#0f1a30' },
  { u0: 0.68, v0: 0.06, u1: 0.96, v1: 0.86, color: '#0f1a30' },
  { u0: 0.07, v0: 0.7, u1: 0.28, v1: 0.8, color: '#2563eb' },
  { u0: 0.07, v0: 0.5, u1: 0.28, v1: 0.62, color: '#0ea5e9' },
  { u0: 0.07, v0: 0.3, u1: 0.28, v1: 0.4, color: '#334155' },
  { u0: 0.39, v0: 0.66, u1: 0.6, v1: 0.78, color: '#8b5cf6' },
  { u0: 0.39, v0: 0.42, u1: 0.6, v1: 0.56, color: '#2563eb' },
  { u0: 0.71, v0: 0.6, u1: 0.93, v1: 0.8, color: '#10b981' },
  { u0: 0.71, v0: 0.35, u1: 0.93, v1: 0.5, color: '#f59e0b' },
  { u0: 0.71, v0: 0.15, u1: 0.93, v1: 0.27, color: '#334155' },
]

const PHONE_UI: UiRect[] = [
  { u0: 0.36, v0: 0.94, u1: 0.64, v1: 0.975, color: '#05070c' },
  { u0: 0.08, v0: 0.86, u1: 0.62, v1: 0.9, color: '#e2e8f0' },
  { u0: 0.08, v0: 0.62, u1: 0.46, v1: 0.8, color: '#2563eb' },
  { u0: 0.54, v0: 0.62, u1: 0.92, v1: 0.8, color: '#0ea5e9' },
  { u0: 0.08, v0: 0.4, u1: 0.46, v1: 0.58, color: '#8b5cf6' },
  { u0: 0.54, v0: 0.4, u1: 0.92, v1: 0.58, color: '#10b981' },
  { u0: 0.08, v0: 0.28, u1: 0.92, v1: 0.32, color: '#1e293b' },
  { u0: 0.08, v0: 0.2, u1: 0.7, v1: 0.24, color: '#1e293b' },
  { u0: 0.08, v0: 0.12, u1: 0.55, v1: 0.16, color: '#1e293b' },
]

function buildScene(): SolidObject[] {
  const base: SolidObject = {
    pos: [-0.35, -0.55, 0.1],
    rx: 0,
    panels: boxPanels([0, 0, 0], [1.2, 0.05, 0.8], LAPTOP_BODY),
  }
  const lid: SolidObject = {
    pos: [-0.35, -0.5, 0.9],
    rx: 0.22,
    panels: boxPanels([0, 0.75, 0], [1.2, 0.75, 0.025], LAPTOP_BODY),
  }
  markScreen(lid.panels, KANBAN_UI)
  const phone: SolidObject = {
    pos: [1.25, 0.12, -0.25],
    rx: 0,
    panels: boxPanels([0, 0, 0], [0.36, 0.78, 0.06], PHONE_BODY),
  }
  markScreen(phone.panels, PHONE_UI)
  return [base, lid, phone]
}

const SCENE = buildScene()

function pointOn(panel: Panel, a: number, b: number): Vec3 {
  return add(panel.origin, add(scale(panel.u, a), scale(panel.v, b)))
}

function sceneToWorld(p: Vec3, yaw: number, tilt: number): Vec3 {
  return rotX(rotY(p, yaw), tilt)
}

function objectToWorld(p: Vec3, obj: SolidObject, yaw: number, tilt: number): Vec3 {
  return sceneToWorld(add(rotX(p, obj.rx), obj.pos), yaw, tilt)
}

function objectDirToWorld(n: Vec3, obj: SolidObject, yaw: number, tilt: number): Vec3 {
  return sceneToWorld(rotX(n, obj.rx), yaw, tilt)
}

function project(p: Vec3, view: View): Point | null {
  const depth = p[2] + CAMERA
  if (depth < 0.5) return null
  const k = (view.scale * CAMERA) / depth
  return [view.cx + p[0] * k, view.cy - p[1] * k]
}

function projectRect(
  panel: Panel,
  obj: SolidObject,
  view: View,
  u0: number,
  v0: number,
  u1: number,
  v1: number,
): Point[] | null {
  const corners: Point[] = []
  for (const [a, b] of [
    [u0, v0],
    [u1, v0],
    [u1, v1],
    [u0, v1],
  ] as const) {
    const point = project(objectToWorld(pointOn(panel, a, b), obj, view.yaw, view.tilt), view)
    if (!point) return null
    corners.push(point)
  }
  return corners
}

function fillQuad(ctx: CanvasRenderingContext2D, quad: Point[], style: string | CanvasGradient): void {
  ctx.beginPath()
  ctx.moveTo(quad[0][0], quad[0][1])
  for (let i = 1; i < quad.length; i++) ctx.lineTo(quad[i][0], quad[i][1])
  ctx.closePath()
  ctx.fillStyle = style
  ctx.fill()
}

interface VisiblePanel {
  panel: Panel
  obj: SolidObject
  depth: number
  shade: number
}

function drawProcedural(ctx: CanvasRenderingContext2D, view: View, time: number): void {
  const visible: VisiblePanel[] = []
  for (const obj of SCENE) {
    for (const panel of obj.panels) {
      const center = objectToWorld(pointOn(panel, 0.5, 0.5), obj, view.yaw, view.tilt)
      const normal = objectDirToWorld(panel.normal, obj, view.yaw, view.tilt)
      const towardCamera: Vec3 = [-center[0], -center[1], -CAMERA - center[2]]
      if (dot(normal, towardCamera) <= 0) continue
      visible.push({
        panel,
        obj,
        depth: center[2],
        shade: 0.42 + 0.58 * Math.max(0, dot(normal, LIGHT)),
      })
    }
  }
  // Painter's algorithm: far panels first.
  visible.sort((a, b) => b.depth - a.depth)

  for (const { panel, obj, shade } of visible) {
    const quad = projectRect(panel, obj, view, 0, 0, 1, 1)
    if (!quad) continue
    const [r, g, b] = panel.fill
    fillQuad(ctx, quad, `rgb(${Math.round(r * shade)}, ${Math.round(g * shade)}, ${Math.round(b * shade)})`)

    for (const rect of panel.ui) {
      const rectQuad = projectRect(panel, obj, view, rect.u0, rect.v0, rect.u1, rect.v1)
      if (rectQuad) fillQuad(ctx, rectQuad, rect.color)
    }

    if (panel.screen) {
      const left = project(objectToWorld(pointOn(panel, 0, 0.5), obj, view.yaw, view.tilt), view)
      const right = project(objectToWorld(pointOn(panel, 1, 0.5), obj, view.yaw, view.tilt), view)
      if (left && right) {
        // Specular sweep: a soft light band travelling across the glass.
        const sweep = ((time * 0.12) % 1.6) - 0.3
        const glare = ctx.createLinearGradient(left[0], left[1], right[0], right[1])
        glare.addColorStop(clamp(sweep - 0.2, 0, 1), 'rgba(255, 255, 255, 0)')
        glare.addColorStop(clamp(sweep, 0, 1), 'rgba(255, 255, 255, 0.22)')
        glare.addColorStop(clamp(sweep + 0.2, 0, 1), 'rgba(255, 255, 255, 0)')
        fillQuad(ctx, quad, glare)
      }
    }

    ctx.beginPath()
    ctx.moveTo(quad[0][0], quad[0][1])
    for (let i = 1; i < quad.length; i++) ctx.lineTo(quad[i][0], quad[i][1])
    ctx.closePath()
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.16)'
    ctx.lineWidth = 1
    ctx.stroke()
  }
}

function drawShadow(ctx: CanvasRenderingContext2D, view: View): void {
  const ground = rotX([0, -0.66, 0.1], view.tilt)
  const center = project(ground, view)
  if (!center) return
  const k = (view.scale * CAMERA) / (ground[2] + CAMERA)
  const rx = 2.1 * k
  const ry = 0.32 * k
  ctx.save()
  ctx.translate(center[0], center[1])
  ctx.scale(1, ry / rx)
  const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, rx)
  gradient.addColorStop(0, 'rgba(2, 6, 23, 0.7)')
  gradient.addColorStop(1, 'rgba(2, 6, 23, 0)')
  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.arc(0, 0, rx, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
}

/** Orbit ring with a marker riding the current turntable angle. */
function drawOrbitRing(ctx: CanvasRenderingContext2D, view: View): void {
  const rx = 2.3 * view.scale
  const ry = 0.6 * view.scale
  const cy = view.cy + 0.62 * view.scale
  ctx.beginPath()
  ctx.ellipse(view.cx, cy, rx, ry, 0, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(125, 211, 252, 0.16)'
  ctx.lineWidth = 1
  ctx.stroke()

  const markerX = view.cx + rx * Math.cos(view.yaw)
  const markerY = cy + ry * Math.sin(view.yaw)
  ctx.beginPath()
  ctx.arc(markerX, markerY, 3.5, 0, Math.PI * 2)
  ctx.fillStyle = '#7dd3fc'
  ctx.shadowColor = '#38bdf8'
  ctx.shadowBlur = 14
  ctx.fill()
  ctx.shadowBlur = 0
}

function drawBrackets(ctx: CanvasRenderingContext2D, box: Box, yaw: number): void {
  const L = 18
  const { x, y, w, h } = box
  ctx.beginPath()
  ctx.moveTo(x, y + L)
  ctx.lineTo(x, y)
  ctx.lineTo(x + L, y)
  ctx.moveTo(x + w - L, y)
  ctx.lineTo(x + w, y)
  ctx.lineTo(x + w, y + L)
  ctx.moveTo(x + w, y + h - L)
  ctx.lineTo(x + w, y + h)
  ctx.lineTo(x + w - L, y + h)
  ctx.moveTo(x + L, y + h)
  ctx.lineTo(x, y + h)
  ctx.lineTo(x, y + h - L)
  ctx.strokeStyle = 'rgba(125, 211, 252, 0.35)'
  ctx.lineWidth = 1
  ctx.stroke()

  const degrees = Math.round((((yaw * 180) / Math.PI) % 360) + 360) % 360
  ctx.fillStyle = 'rgba(148, 163, 184, 0.8)'
  ctx.font = '11px "JetBrains Mono", monospace'
  ctx.fillText(`YAW ${degrees}°`, x + 14, y + 30)
}

export function getDeviceBox(width: number, height: number): Box {
  if (width < 768) {
    return { x: width * 0.06, y: height * 0.17, w: width * 0.88, h: height * 0.36 }
  }
  return { x: width * 0.5, y: height * 0.1, w: width * 0.46, h: height * 0.8 }
}

/**
 * The part of the stage the canvas must cover: the device box plus its orbit ring.
 * Sizing the canvas to this instead of the full viewport cuts per-frame raster work.
 */
export function getStageRegion(width: number, height: number): Box {
  if (width < 768) return { x: 0, y: height * 0.1, w: width, h: height * 0.6 }
  return { x: width * 0.4, y: 0, w: width * 0.6, h: height }
}

/** Largest rectangle with the given aspect that fits centred in `box` (CSS object-fit: contain). */
export function getContainRect(box: Box, aspect: number): Box {
  const w = Math.min(box.w, box.h * aspect)
  const h = w / aspect
  return { x: box.x + (box.w - w) / 2, y: box.y + (box.h - h) / 2, w, h }
}

/**
 * Draws the canvas layer of the stage. With frames, the WebP images, feather and sheen are DOM layers
 * beneath it, so the canvas only adds the orbit ring and brackets. Without frames it draws the device.
 */
export function renderStage(ctx: CanvasRenderingContext2D, frame: StageFrame): void {
  const { box, yaw, tilt, time, procedural } = frame
  ctx.save()
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ctx.restore()

  const view: View = {
    cx: box.x + box.w / 2,
    cy: box.y + box.h / 2,
    scale: Math.min(box.w / 3.3, box.h / 2.0),
    yaw,
    tilt,
  }

  if (procedural) {
    drawShadow(ctx, view)
    drawProcedural(ctx, view, time)
  }
  drawOrbitRing(ctx, view)
  drawBrackets(ctx, box, yaw)
}
