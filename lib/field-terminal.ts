import * as THREE from "three"
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js"
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js"

import { bootKeys, makeDisplay } from "./terminal-display"

function canvasTexture(width: number, height: number, draw: (ctx: CanvasRenderingContext2D) => void) {
  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext("2d")!
  draw(context)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 4
  return texture
}

// Batch fixed parts by material, keeping the moving assemblies independent.
function batch(group: THREE.Group) {
  const buckets = new Map<THREE.Material, THREE.BufferGeometry[]>()
  for (const mesh of [...group.children] as THREE.Mesh<THREE.BufferGeometry, THREE.Material>[]) {
    mesh.updateMatrix()
    let geometry = mesh.geometry
    if (geometry.index) {
      geometry = geometry.toNonIndexed()
      mesh.geometry.dispose()
    }
    geometry.applyMatrix4(mesh.matrix)
    const list = buckets.get(mesh.material) ?? []
    list.push(geometry)
    buckets.set(mesh.material, list)
    group.remove(mesh)
  }
  for (const [material, parts] of buckets) {
    const geometry = mergeGeometries(parts)!
    parts.forEach((part) => part.dispose())
    const mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true
    mesh.receiveShadow = true
    group.add(mesh)
  }
}

export function buildTerminal(redraw: () => void) {
  const model = new THREE.Group()
  const shell = new THREE.Group()
  const face = new THREE.Group()
  const keyboard = new THREE.Group()
  const cable = new THREE.Group()
  const board = new THREE.Group()
  model.add(shell, face, keyboard, cable, board)

  const paint = (color: string, roughness = 0.52, metalness = 0.11) =>
    new THREE.MeshStandardMaterial({ color, roughness, metalness })
  const lacquer = paint("#9b3948", 0.32, 0.18)
  const enamel = paint("#e5d5b8", 0.47)
  const trim = paint("#74343f", 0.43)
  const graphite = paint("#30303a")
  const rubber = paint("#121511", 0.8)
  const key = paint("#44404b")
  const ivory = paint("#e9c2be")
  const steel = paint("#8f9083", 0.35, 0.68)

  function box(
    group: THREE.Group,
    w: number,
    h: number,
    d: number,
    x: number,
    y: number,
    z: number,
    material: THREE.Material,
    r = 0.035,
  ) {
    const mesh = new THREE.Mesh(
      new RoundedBoxGeometry(w, h, d, 2, Math.min(r, w / 2, h / 2, d / 2)),
      material,
    )
    mesh.position.set(x, y, z)
    group.add(mesh)
    return mesh
  }
  function cylinder(
    group: THREE.Group,
    radius: number,
    depth: number,
    x: number,
    y: number,
    z: number,
    mat: THREE.Material,
  ) {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, depth, 24), mat)
    mesh.rotation.x = Math.PI / 2
    mesh.position.set(x, y, z)
    group.add(mesh)
  }
  function decal(
    group: THREE.Group,
    text: string,
    w: number,
    h: number,
    x: number,
    y: number,
    z: number,
    color = "#78333e",
    bg = "#e5d5b8",
  ) {
    const texture = canvasTexture(512, 96, (ctx) => {
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, 512, 96)
      ctx.fillStyle = color
      ctx.font = "bold 65px monospace"
      ctx.textBaseline = "middle"
      ctx.fillText(text, 10, 52, 490)
    })
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshStandardMaterial({ map: texture, roughness: 0.6 }),
    )
    mesh.position.set(x, y, z)
    group.add(mesh)
  }

  // Split-shell enclosure, recessed side panels and molded ventilation ribs.
  box(shell, 3.05, 2.27, 1.63, 0, 1.49, -0.36, lacquer, 0.16)
  box(shell, 2.93, 2.15, 0.21, 0, 1.48, -1.18, trim, 0.1)
  box(shell, 2.75, 1.98, 0.17, 0, 1.48, -1.28, graphite, 0.09)
  box(shell, 3.07, 2.26, 0.055, 0, 1.49, 0.355, rubber, 0.02)
  for (const side of [-1, 1]) {
    box(shell, 0.055, 1.38, 1.12, side * 1.524, 1.39, -0.45, trim, 0.024)
    for (let i = 0; i < 10; i++) {
      box(shell, 0.075, 0.059, 1.0, side * 1.552, 0.88 + i * 0.112, -0.47, graphite, 0.023)
    }
    box(shell, 0.08, 0.15, 0.36, side * 1.55, 2.29, -0.46, rubber)
    for (const z of [-0.86, 0.28]) box(shell, 0.46, 0.41, 0.42, side * 1.13, 0.2, z, rubber, 0.07)
  }
  for (let i = 0; i < 15; i++) box(shell, 0.095, 0.027, 0.58, -0.99 + i * 0.142, 2.626, -0.62, rubber, 0.012)
  // Carry handle with distinct metal pivots and a ribbed grip.
  for (const x of [-0.9, 0.9]) {
    box(shell, 0.34, 0.07, 0.39, x, 2.64, -0.14, graphite)
    box(shell, 0.18, 0.36, 0.22, x, 2.76, -0.14, graphite, 0.07)
  }
  box(shell, 1.97, 0.19, 0.24, 0, 2.92, -0.14, rubber, 0.08)
  for (let i = 0; i < 11; i++) box(shell, 0.04, 0.202, 0.252, -0.55 + i * 0.11, 2.92, -0.14, graphite, 0.022)
  for (let i = 0; i < 12; i++) box(shell, 0.115, 0.62, 0.07, -1.03 + i * 0.18, 1.57, -1.38, rubber)

  // Front fascia, CRT gasket and curved phosphor glass.
  box(face, 3.1, 2.3, 0.4, 0, 1.5, 0.55, enamel, 0.145)
  box(face, 2.34, 1.81, 0.15, -0.232, 1.59, 0.756, trim, 0.13)
  box(face, 2.27, 1.74, 0.18, -0.232, 1.59, 0.823, graphite, 0.14)
  box(face, 2.12, 1.58, 0.16, -0.232, 1.59, 0.885, rubber, 0.13)
  const display = makeDisplay(redraw)
  const screenGeo = new THREE.PlaneGeometry(1.97, 1.43, 32, 28)
  const pos = screenGeo.attributes.position
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i),
      y = pos.getY(i)
    const u = x / 0.985,
      v = y / 0.715
    pos.setXYZ(
      i,
      x * (1 - 0.038 * Math.pow(v, 8)),
      y * (1 - 0.042 * Math.pow(u, 8)),
      0.071 * (1 - u * u) * (1 - v * v),
    )
  }
  screenGeo.computeVertexNormals()
  const screen = new THREE.Mesh(screenGeo, display.material)
  screen.position.set(-0.232, 1.59, 0.968)
  face.add(screen)
  box(face, 0.36, 1.73, 0.085, 1.17, 1.59, 0.762, graphite, 0.055)
  for (let i = 0; i < 7; i++) box(face, 0.224, 0.037, 0.035, 1.17, 2.26 - i * 0.071, 0.818, rubber, 0.014)
  for (const y of [1.52, 1.16]) {
    cylinder(face, 0.119, 0.072, 1.17, y, 0.839, steel)
    cylinder(face, 0.105, 0.08, 1.17, y, 0.885, graphite)
    box(face, 0.018, 0.079, 0.012, 1.17, y + 0.045, 0.93, ivory, 0.004)
  }
  const lamp = new THREE.MeshBasicMaterial({ color: "#c1fb96" })
  cylinder(face, 0.036, 0.035, 1.17, 0.864, 0.82, lamp)
  decal(face, "SAKURA / FA–01", 1.19, 0.115, -0.6, 0.558, 0.752)
  box(face, 0.42, 0.085, 0.018, 0.77, 0.558, 0.754, graphite, 0.009)
  for (let i = 0; i < 12; i++)
    box(face, 0.012 + (i % 3) * 0.006, 0.049, 0.012, 0.598 + i * 0.03, 0.558, 0.767, ivory, 0.002)
  for (const x of [-1.37, 1.37])
    for (const y of [0.53, 2.46]) {
      cylinder(face, 0.039, 0.025, x, y, 0.748, steel)
      box(face, 0.046, 0.009, 0.008, x, y, 0.766, rubber, 0.002).rotation.z = 0.6
    }

  // Shielding and the CRT neck sit behind the removable faceplate.
  box(face, 2.12, 1.65, 0.19, -0.23, 1.59, 0.29, graphite, 0.1)
  box(face, 1.63, 1.16, 0.16, -0.23, 1.59, 0.15, rubber, 0.075)
  cylinder(face, 0.21, 0.15, -0.23, 1.59, 0.04, steel)

  // The exploded view exposes both printed faces of the circuit board.
  box(board, 2.8, 1.94, 0.055, 0, 1.49, 0.43, paint("#216b54"))
  const traces = canvasTexture(448, 310, (ctx) => {
    ctx.fillStyle = "#215141"
    ctx.fillRect(0, 0, 448, 310)
    for (let bank = 0; bank < 4; bank++) {
      const x = 22 + bank * 104
      for (let lane = 0; lane < 9; lane++) {
        const y = 45 + lane * 8,
          offset = lane * 4
        ctx.strokeStyle = lane % 3 === 0 ? "#ae9c64" : "#679576"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x + 12 + offset, y)
        ctx.lineTo(x + 52 + offset, y + 40)
        ctx.lineTo(x + 52 + offset, 194 + offset)
        ctx.lineTo(x + 30 + offset, 216 + offset)
        ctx.lineTo(x + 30 + offset, 260)
        ctx.stroke()
        ctx.fillStyle = "#c1ae79"
        ctx.fillRect(x - 2, y - 2, 4, 4)
        ctx.fillRect(x + 27 + offset, 259, 6, 15)
      }
    }
    ctx.strokeStyle = "#aec2a0"
    ctx.strokeRect(9, 9, 430, 292)
    ctx.fillStyle = "#d3d8b9"
    ctx.font = "13px monospace"
    ctx.fillText("FA–01  /  LOGIC BOARD", 20, 293)
  })
  const boardInk = new THREE.MeshStandardMaterial({ map: traces, roughness: 0.66, metalness: 0.2 })
  for (const side of [-1, 1]) {
    const copper = new THREE.Mesh(new THREE.PlaneGeometry(2.74, 1.88), boardInk)
    copper.position.set(0, 1.49, 0.43 + side * 0.0285)
    copper.rotation.y = side === 1 ? 0 : Math.PI
    board.add(copper)
  }
  for (const x of [-0.88, -0.28, 0.55, 0.98]) {
    box(board, 0.3, 0.55, 0.105, x, 1.69, 0.52, graphite, 0.012)
    for (let pin = 0; pin < 7; pin++) {
      for (const side of [-1, 1])
        box(board, 0.062, 0.029, 0.025, x + side * 0.17, 1.48 + pin * 0.065, 0.49, steel, 0.003)
    }
  }
  for (let i = 0; i < 9; i++) box(board, 0.19, 0.48, 0.14, -0.93 + i * 0.23, 0.91, 0.51, graphite, 0.015)
  for (const x of [-1.28, 1.28]) {
    for (const y of [0.65, 2.34]) cylinder(board, 0.047, 0.058, x, y, 0.46, steel)
  }

  // Detachable mechanical keyboard, individual legends printed on the keycaps.
  box(keyboard, 3.05, 0.24, 1.33, 0, 0.12, 1.55, rubber, 0.085)
  box(keyboard, 3.12, 0.24, 1.34, 0, 0.25, 1.55, enamel, 0.095)
  box(keyboard, 2.89, 0.08, 1.09, 0, 0.376, 1.55, graphite, 0.05)
  const rows = ["1234567890-=", "QWERTYUIOP[]", "ASDFGHJKL;'↵", "⇧ZXCVBNM,./⇧"]
  const legendTexture = canvasTexture(1024, 256, (ctx) => {
    ctx.font = "bold 38px monospace"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillStyle = "#e2e1ce"
    rows.forEach((row, r) => Array.from(row).forEach((c, col) => ctx.fillText(c, col * 80 + 40, r * 54 + 27)))
  })
  const legends = new THREE.MeshBasicMaterial({ map: legendTexture, transparent: true, depthWrite: false })
  const movingKeys = new Map<string, THREE.Group>()
  const activeLetters = new Set<string>(bootKeys)
  rows.forEach((row, r) =>
    Array.from(row).forEach((letter, c) => {
      const parent = activeLetters.has(letter) ? new THREE.Group() : keyboard
      if (parent !== keyboard) movingKeys.set(letter, parent)
      const x = -1.224 + c * 0.222,
        z = 1.174 + r * 0.219
      const capMat = c === 11 && r === 2 ? lacquer : key
      box(parent, 0.195, 0.115, 0.18, x, 0.464, z, capMat, 0.025)
      const tile = new THREE.PlaneGeometry(0.152, 0.108)
      const uv = tile.attributes.uv
      for (let i = 0; i < uv.count; i++) {
        uv.setXY(i, ((c + uv.getX(i)) * 80) / 1024, 1 - ((r + 1 - uv.getY(i)) * 54) / 256)
      }
      const legend = new THREE.Mesh(tile, legends)
      legend.rotation.x = -Math.PI / 2
      legend.position.set(x, 0.524, z)
      parent.add(legend)
    }),
  )
  for (const [x, width, material] of [
    [-0.98, 0.57, key],
    [0, 1.28, ivory],
    [0.97, 0.56, lacquer],
  ] as const) {
    box(keyboard, width, 0.095, 0.14, x, 0.453, 2.033, material, 0.025)
  }
  // A coiled cable connects the two housings.
  const lead: THREE.Vector3[] = [new THREE.Vector3(-1.28, 0.46, 0.18), new THREE.Vector3(-1.62, 0.25, 0.31)]
  for (let i = 0; i <= 192; i++) {
    const t = i / 192,
      a = t * 2 * Math.PI * 12
    lead.push(
      new THREE.Vector3(
        -1.66 - 0.21 * Math.sin(t * Math.PI) + 0.086 * Math.cos(a),
        0.19 + 0.087 * Math.sin(a),
        0.4 + 0.84 * t,
      ),
    )
  }
  lead.push(new THREE.Vector3(-1.62, 0.18, 1.41), new THREE.Vector3(-1.45, 0.23, 1.43))
  cable.add(
    new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(lead), 264, 0.036, 7, false), rubber),
  )

  for (const part of [shell, face, keyboard, cable, board]) batch(part)
  // Leave the typewriter keys movable after batching the stationary keyboard.
  for (const group of movingKeys.values()) {
    batch(group)
    keyboard.add(group)
  }
  return {
    model,
    update(time: number, exploded: number) {
      const frame = display.update(time)
      for (const [letter, group] of movingKeys) {
        group.position.y = letter === frame.key ? -0.052 * frame.depression : 0
      }
      const chassis = 1 - THREE.MathUtils.smootherstep(time, 0.03, 1.12)
      const fascia = 1 - THREE.MathUtils.smootherstep(time, 0.15, 1.36)
      const keys = 1 - THREE.MathUtils.smootherstep(time, 0.36, 1.53)
      const separation = Math.max(fascia, exploded)
      board.visible = separation > 0.02
      board.position.set(0, 0.24 * chassis, 0.13 * separation)
      face.position.set(-0.29 * fascia, 0.43 * fascia, 1.14 * fascia + 0.77 * exploded)
      face.rotation.y = -0.18 * fascia
      shell.position.set(0.18 * chassis, 0.35 * chassis + 0.16 * exploded, -0.57 * chassis - 0.27 * exploded)
      shell.rotation.z = -0.065 * chassis
      keyboard.position.set(-0.23 * keys, 0.25 * keys - 0.13 * exploded, 0.78 * keys + 0.43 * exploded)
      keyboard.rotation.z = 0.07 * keys
      cable.visible = separation < 0.5 && keys < 0.4
      lamp.color.setRGB(0.12 + 0.42 * frame.power, 0.14 + 0.8 * frame.power, 0.08 + 0.25 * frame.power)
      return frame.state
    },
    dispose: display.dispose,
  }
}
