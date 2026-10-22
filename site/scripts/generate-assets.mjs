#!/usr/bin/env node
/**
 * Generate publish-ready AFFIX-2026 visual assets (light institutional):
 *   public/og.png (1200×630)
 *   public/icon.png (512)
 *   public/apple-touch-icon.png (180)
 *   public/favicon.ico
 *
 * Palette: near-black YC / warm orange
 * Fonts: Syne + IBM Plex Mono (scripts/fonts) — stand-ins for Bricolage / Source Sans
 */
import { createCanvas, GlobalFonts } from "@napi-rs/canvas"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import pngToIco from "png-to-ico"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, "..")
const publicDir = path.join(root, "public")
const brandDir = path.resolve(root, "../assets/brand")
const fontsDir = path.join(__dirname, "fonts")

const BG = "#050505"
const FG = "#F5F0E8"
const MUTED = "#9A9080"
const ACCENT = "#F59E0B"
const ACCENT_HOT = "#FF8A1A"
const LINE = "rgba(179,58,43,0.28)"
const GRID = "rgba(26,31,46,0.06)"

GlobalFonts.registerFromPath(path.join(fontsDir, "Syne-Bold.ttf"), "Syne")
GlobalFonts.registerFromPath(path.join(fontsDir, "Syne-SemiBold.ttf"), "Syne Semi")
GlobalFonts.registerFromPath(path.join(fontsDir, "IBMPlexMono-Medium.ttf"), "IBM Plex Mono")

/** Bayer 8×8 threshold matrix (0–1) for scientific dither texture */
const BAYER8 = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
].map((row) => row.map((v) => (v + 0.5) / 64))

function paintDitherWash(ctx, w, h, opts = {}) {
  const {
    x0 = 0,
    y0 = 0,
    cell = 3,
    strength = 0.55,
    color = ACCENT,
    fade = "radial",
  } = opts
  // Preserve existing paper pixels; only tint dither dots (putImageData alpha=0 would punch holes → black)
  const img = ctx.getImageData(x0, y0, w, h)
  const data = img.data
  const cx = w * 0.72
  const cy = h * 0.78
  const maxR = Math.hypot(w, h) * 0.85

  const r = parseInt(color.slice(1, 3), 16)
  const g = parseInt(color.slice(3, 5), 16)
  const b = parseInt(color.slice(5, 7), 16)

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const gx = Math.floor(x / cell)
      const gy = Math.floor(y / cell)
      const t = BAYER8[gy % 8][gx % 8]
      let density = strength
      if (fade === "radial") {
        const d = Math.hypot(x - cx, y - cy) / maxR
        density = strength * Math.max(0, 1 - d * 1.15)
      } else if (fade === "bottom") {
        density = strength * (y / h) ** 1.4
      }
      const on = density > t
      if (!on) continue
      const i = (y * w + x) * 4
      const a = (120 * Math.min(1, density / strength)) / 255
      data[i] = Math.round(data[i] * (1 - a) + r * a)
      data[i + 1] = Math.round(data[i + 1] * (1 - a) + g * a)
      data[i + 2] = Math.round(data[i + 2] * (1 - a) + b * a)
      data[i + 3] = 255
    }
  }
  ctx.putImageData(img, x0, y0)
}

function drawGrid(ctx, w, h, step = 64) {
  ctx.save()
  ctx.strokeStyle = GRID
  ctx.lineWidth = 1
  for (let x = 0; x <= w; x += step) {
    ctx.beginPath()
    ctx.moveTo(x + 0.5, 0)
    ctx.lineTo(x + 0.5, h)
    ctx.stroke()
  }
  for (let y = 0; y <= h; y += step) {
    ctx.beginPath()
    ctx.moveTo(0, y + 0.5)
    ctx.lineTo(w, y + 0.5)
    ctx.stroke()
  }
  ctx.restore()
}

function drawAccentRule(ctx, x, y, w) {
  const grad = ctx.createLinearGradient(x, y, x + w, y)
  grad.addColorStop(0, ACCENT_HOT)
  grad.addColorStop(0.55, ACCENT)
  grad.addColorStop(1, "rgba(179,58,43,0)")
  ctx.fillStyle = grad
  ctx.fillRect(x, y, w, 3)
}

async function writePng(canvas, outPath) {
  const buf = canvas.toBuffer("image/png")
  fs.writeFileSync(outPath, buf)
  console.log("wrote", path.relative(root, outPath), `(${buf.length} bytes)`)
}

function generateOg() {
  const W = 1200
  const H = 630
  const canvas = createCanvas(W, H)
  const ctx = canvas.getContext("2d")

  ctx.fillStyle = BG
  ctx.fillRect(0, 0, W, H)

  // soft cool paper wash
  const vig = ctx.createRadialGradient(W * 0.45, H * 0.35, 40, W * 0.5, H * 0.5, W * 0.75)
  vig.addColorStop(0, "rgba(255,255,255,0.55)")
  vig.addColorStop(1, "rgba(26,31,46,0.04)")
  ctx.fillStyle = vig
  ctx.fillRect(0, 0, W, H)

  drawGrid(ctx, W, H, 48)
  paintDitherWash(ctx, W, H, { cell: 3, strength: 0.38, color: ACCENT, fade: "radial" })

  // top / bottom hairlines
  ctx.fillStyle = LINE
  ctx.fillRect(0, 0, W, 1)
  ctx.fillRect(0, H - 1, W, 1)

  const padX = 72
  const padY = 64

  // eyebrow
  ctx.fillStyle = ACCENT
  ctx.font = "500 18px IBM Plex Mono"
  ctx.fillText("AFFIX-2026  ·  RESEARCH INDEX", padX, padY + 18)

  drawAccentRule(ctx, padX, padY + 36, 220)

  // wordmark
  ctx.fillStyle = FG
  ctx.font = "700 148px Syne"
  ctx.fillText("AFFIX", padX - 4, padY + 178)

  // subtitle
  ctx.fillStyle = MUTED
  ctx.font = "600 34px Syne Semi"
  ctx.fillText("Agent Framework Fitness Index", padX, padY + 232)

  // meta line
  ctx.fillStyle = "rgba(26,31,46,0.45)"
  ctx.font = "500 20px IBM Plex Mono"
  ctx.fillText("16 frameworks  ·  2026", padX, padY + 278)

  // leader callout box
  const boxX = padX
  const boxY = H - 148
  const boxW = W - padX * 2
  const boxH = 72

  ctx.fillStyle = "rgba(255,255,255,0.72)"
  ctx.strokeStyle = "rgba(179,58,43,0.35)"
  ctx.lineWidth = 1
  roundRect(ctx, boxX, boxY, boxW, boxH, 4)
  ctx.fill()
  ctx.stroke()

  // left accent bar
  ctx.fillStyle = ACCENT
  ctx.fillRect(boxX, boxY + 12, 3, boxH - 24)

  ctx.fillStyle = MUTED
  ctx.font = "500 15px IBM Plex Mono"
  ctx.fillText("LEADER", boxX + 28, boxY + 28)

  ctx.fillStyle = FG
  ctx.font = "700 28px Syne"
  ctx.fillText("PydanticAI", boxX + 28, boxY + 56)

  const scoreLabel = "87.6"
  ctx.font = "700 36px Syne"
  const scoreW = ctx.measureText(scoreLabel).width
  ctx.fillStyle = ACCENT
  ctx.fillText(scoreLabel, boxX + boxW - scoreW - 28, boxY + 50)

  ctx.fillStyle = MUTED
  ctx.font = "500 13px IBM Plex Mono"
  const affixW = ctx.measureText("AFFIX").width
  ctx.fillText("AFFIX", boxX + boxW - affixW - 28, boxY + 22)

  return canvas
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

/** Minimal “A” monogram on light dithered square */
function generateIcon(size) {
  const canvas = createCanvas(size, size)
  const ctx = canvas.getContext("2d")

  ctx.fillStyle = BG
  ctx.fillRect(0, 0, size, size)

  const inset = Math.round(size * 0.08)
  paintDitherWash(ctx, size, size, {
    cell: Math.max(2, Math.round(size / 128)),
    strength: 0.45,
    color: ACCENT,
    fade: "bottom",
  })

  // lighten center for letter clarity
  const veil = ctx.createRadialGradient(size / 2, size / 2, size * 0.1, size / 2, size / 2, size * 0.55)
  veil.addColorStop(0, "rgba(244,245,247,0.75)")
  veil.addColorStop(1, "rgba(244,245,247,0.05)")
  ctx.fillStyle = veil
  ctx.fillRect(0, 0, size, size)

  // thin border
  ctx.strokeStyle = "rgba(179,58,43,0.4)"
  ctx.lineWidth = Math.max(2, size / 128)
  ctx.strokeRect(inset + 0.5, inset + 0.5, size - inset * 2 - 1, size - inset * 2 - 1)

  // A mark
  ctx.fillStyle = FG
  const fontSize = Math.round(size * 0.52)
  ctx.font = `700 ${fontSize}px Syne`
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText("A", size / 2, size / 2 + size * 0.02)

  // carmine tick under A
  const tickW = size * 0.14
  const grad = ctx.createLinearGradient(size / 2 - tickW, 0, size / 2 + tickW, 0)
  grad.addColorStop(0, ACCENT_HOT)
  grad.addColorStop(1, ACCENT)
  ctx.fillStyle = grad
  ctx.fillRect(size / 2 - tickW / 2, size * 0.78, tickW, Math.max(2, size / 64))

  return canvas
}

async function main() {
  fs.mkdirSync(publicDir, { recursive: true })
  fs.mkdirSync(brandDir, { recursive: true })

  const og = generateOg()
  await writePng(og, path.join(publicDir, "og.png"))

  const icon512 = generateIcon(512)
  await writePng(icon512, path.join(publicDir, "icon.png"))

  const apple = generateIcon(180)
  await writePng(apple, path.join(publicDir, "apple-touch-icon.png"))

  // favicon: multi-size ico from 16/32/48
  const sizes = [16, 32, 48]
  const pngBufs = []
  for (const s of sizes) {
    const c = generateIcon(s)
    pngBufs.push(c.toBuffer("image/png"))
  }
  const ico = await pngToIco(pngBufs)
  const icoPath = path.join(publicDir, "favicon.ico")
  fs.writeFileSync(icoPath, ico)
  console.log("wrote", path.relative(root, icoPath), `(${ico.length} bytes)`)

  // mirror into ../assets/brand/
  const brandCopies = [
    ["og.png", "og.png"],
    ["icon.png", "icon-512.png"],
    ["apple-touch-icon.png", "apple-touch-icon.png"],
    ["favicon.ico", "favicon.ico"],
  ]
  for (const [src, dest] of brandCopies) {
    const from = path.join(publicDir, src)
    const to = path.join(brandDir, dest)
    fs.copyFileSync(from, to)
    console.log("copied", path.relative(root, to))
  }

  // keep shots intact — report presence
  const shotsDir = path.join(publicDir, "shots")
  if (fs.existsSync(shotsDir)) {
    const shots = fs.readdirSync(shotsDir).filter((f) => /\.(png|jpg|webp)$/i.test(f))
    console.log("shots preserved:", shots.join(", ") || "(none)")
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
