import * as THREE from "three"
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js"

function surfaceTexture(paint: (ctx: CanvasRenderingContext2D) => void) {
  const canvas = document.createElement("canvas")
  canvas.width = canvas.height = 256
  paint(canvas.getContext("2d")!)
  const map = new THREE.CanvasTexture(canvas)
  map.colorSpace = THREE.SRGBColorSpace
  map.wrapS = map.wrapT = THREE.RepeatWrapping
  return map
}

// All of the fixed joinery is batched by finish so the roof and screens can retain their fine detail.
export function buildSpringStudio() {
  const group = new THREE.Group()
  const finish = (color: number, roughness = 0.85) => new THREE.MeshStandardMaterial({ color, roughness })
  const cedar = finish(0x563728),
    endGrain = finish(0x835339),
    darkWood = finish(0x392b2b)
  const plaster = finish(0xd3bfa5),
    slate = finish(0x454650, 0.72),
    tileEdge = finish(0x585660, 0.68)
  const stone = finish(0x746c62),
    moss = finish(0x626342),
    deepMoss = finish(0x3b4633)
  const shoji = new THREE.MeshStandardMaterial({
    color: 0xffdfa9,
    roughness: 0.92,
    emissive: 0xf3a751,
    emissiveIntensity: 0.27,
  })
  const interior = finish(0x302b2b),
    copper = finish(0xac794d, 0.52)
  let seed = 509
  function random() {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
    return seed / 4294967296
  }
  const grain = surfaceTexture((ctx) => {
    ctx.fillStyle = "#e5ccb0"
    ctx.fillRect(0, 0, 256, 256)
    for (let i = 0; i < 520; i++) {
      const y = random() * 256
      const x = random() * 256 - 100
      const drift = random() * 4 - 2
      ctx.strokeStyle = random() > 0.5 ? "rgba(92,57,43,.26)" : "rgba(255,247,230,.27)"
      ctx.lineWidth = 0.3 + random() * 1.1
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.bezierCurveTo(x + 40, y + drift, x + 120, y - drift, x + 160, y)
      ctx.stroke()
    }
  })
  for (const material of [cedar, endGrain, darkWood]) material.map = grain
  const patina = surfaceTexture((ctx) => {
    ctx.fillStyle = "#d6d2ce"
    ctx.fillRect(0, 0, 256, 256)
    for (let i = 0; i < 7200; i++) {
      ctx.fillStyle = i % 3 ? "rgba(51,48,52,.22)" : "rgba(255,255,246,.38)"
      const radius = 0.3 + random() ** 3 * 2.7
      ctx.beginPath()
      ctx.arc(random() * 256, random() * 256, radius, 0, Math.PI * 2)
      ctx.fill()
    }
  })
  for (const material of [slate, tileEdge, stone, moss, deepMoss, plaster]) material.map = patina
  const paper = surfaceTexture((ctx) => {
    const glow = ctx.createRadialGradient(122, 163, 5, 122, 163, 185)
    glow.addColorStop(0, "#fff0bc")
    glow.addColorStop(0.55, "#efd594")
    glow.addColorStop(1, "#927961")
    ctx.fillStyle = glow
    ctx.fillRect(0, 0, 256, 256)
    for (let i = 0; i < 1400; i++) {
      ctx.fillStyle = "rgba(90,65,41,.09)"
      ctx.fillRect(random() * 256, random() * 256, 0.4, 1 + random() * 4)
    }
  })
  shoji.map = paper
  const cube = new THREE.BoxGeometry(),
    pebble = new THREE.IcosahedronGeometry(1, 1)
  const batches = new Map<THREE.Material, THREE.BufferGeometry[]>()
  const transform = new THREE.Object3D()
  function part(
    geo: THREE.BufferGeometry,
    mat: THREE.Material,
    x: number,
    y: number,
    z: number,
    w: number,
    h: number,
    d: number,
    rx = 0,
    ry = 0,
    rz = 0,
  ) {
    transform.position.set(x, y, z)
    transform.rotation.set(rx, ry, rz)
    transform.scale.set(w, h, d)
    transform.updateMatrix()
    const copy = geo.index ? geo.toNonIndexed() : geo.clone()
    copy.applyMatrix4(transform.matrix)
    if (geo === cube && (mat === cedar || mat === darkWood || mat === endGrain)) {
      const uv = copy.attributes.uv
      const vertical = h > w && h > d
      const offset = (x + y + z) * 0.73
      for (let i = 0; i < uv.count; i++) {
        const u = uv.getX(i),
          v = uv.getY(i)
        uv.setXY(i, (vertical ? v : u) * Math.max(w, h, d) * 0.65 + offset, (vertical ? u : v) * 0.54)
      }
    }
    if (!batches.has(mat)) batches.set(mat, [])
    batches.get(mat)!.push(copy)
  }
  function box(
    mat: THREE.Material,
    x: number,
    y: number,
    z: number,
    w: number,
    h: number,
    d: number,
    rx = 0,
    ry = 0,
    rz = 0,
  ) {
    part(cube, mat, x, y, z, w, h, d, rx, ry, rz)
  }

  // The front veranda opens onto an illuminated desk in the central bay.
  box(stone, 0, 0.11, 0.14, 4.6, 0.22, 2.88)
  box(darkWood, 0, 0.25, 0.16, 4.74, 0.16, 3.04)
  for (let i = 0; i < 15; i++)
    box(i % 4 === 0 ? cedar : endGrain, 0, 0.352, -1.26 + i * 0.21, 4.78, 0.048, 0.199)
  for (let i = 0; i < 2; i++) box(stone, 0.28, 0.08 + 0.068 * i, 1.98 - i * 0.17, 1.25, 0.13 + i * 0.03, 0.34)
  box(plaster, 0, 1.15, -1.17, 4.38, 1.6, 0.11)
  for (let i = 0; i < 26; i++)
    box(i % 4 ? cedar : endGrain, -2.12 + i * 0.169, 0.71, -1.239, 0.163, 0.65, 0.055)
  for (const x of [-2.13, -1.08, 0, 1.08, 2.13]) box(darkWood, x, 1.17, -1.25, 0.082, 1.66, 0.09)
  for (const y of [1.03, 1.82]) box(cedar, 0, y, -1.258, 4.4, 0.074, 0.09)
  for (const x of [-0.53, 0.54]) {
    box(shoji, x, 1.44, -1.253, 0.92, 0.58, 0.06)
    for (let i = 0; i < 6; i++) box(cedar, x - 0.46 + i * 0.184, 1.44, -1.29, 0.026, 0.6, 0.028)
    box(cedar, x, 1.44, -1.29, 0.92, 0.029, 0.028)
  }
  box(interior, 0.12, 1.06, -0.87, 1.84, 1.38, 0.13)
  for (const x of [-2.16, 2.16]) {
    box(plaster, x, 1.15, -0.14, 0.1, 1.58, 2.05)
    for (const z of [-1.16, -0.61, 0.04, 0.92, 1.53]) box(cedar, x, 1.16, z, 0.09, 1.65, 0.085)
    for (const y of [0.48, 1.56, 1.87]) box(cedar, x, y, -0.12, 0.136, 0.075, 2.16)
    box(shoji, x * 1.009, 1.07, -0.37, 0.11, 0.82, 1.23)
    for (let i = 0; i < 7; i++) box(cedar, x * 1.037, 1.08, -0.95 + i * 0.19, 0.045, 0.88, 0.028)
    for (const y of [0.64, 0.9, 1.2, 1.51]) box(cedar, x * 1.037, y, -0.37, 0.044, 0.03, 1.3)
  }
  for (const x of [-2.12, -1.39, -0.66, 0.85, 1.5, 2.13]) box(cedar, x, 1.16, 0.91, 0.072, 1.65, 0.1)
  for (const [center, width] of [
    [-1.39, 1.4],
    [1.49, 1.22],
  ]) {
    box(shoji, center, 1.12, 0.89, width, 1.42, 0.046)
    for (let i = 0; i <= 8; i++)
      box(cedar, center - width / 2 + (width * i) / 8, 1.12, 0.932, 0.019, 1.45, 0.027)
    for (let i = 0; i <= 5; i++) box(cedar, center, 0.43 + i * 0.274, 0.935, width, 0.022, 0.026)
    box(endGrain, center, 0.49, 0.94, width, 0.18, 0.06)
  }
  box(cedar, 0, 1.91, 0.94, 4.49, 0.135, 0.14)
  box(endGrain, 0.15, 0.8, -0.02, 1.28, 0.075, 0.53)
  for (const x of [-0.39, 0.68]) box(cedar, x, 0.56, 0, 0.07, 0.48, 0.39)
  box(darkWood, 0.12, 1.1, -0.085, 0.65, 0.4, 0.066)
  const screen = new THREE.MeshBasicMaterial({ color: 0x94ab96 })
  box(screen, 0.12, 1.1, -0.046, 0.58, 0.334, 0.012)
  for (let i = 0; i < 5; i++)
    box(interior, 0.012 + (i % 3) * 0.019, 1.19 - i * 0.04, -0.036, 0.21 + (i % 3) * 0.058, 0.009, 0.014)
  box(darkWood, 0.12, 0.88, -0.09, 0.12, 0.12, 0.09)
  box(interior, 0.09, 0.849, 0.13, 0.46, 0.024, 0.16)

  // Slightly concave tiled planes, stepped courses, and round grey ridge caps.
  const roofWidth = 5.25
  const roofHalf = 1.79
  const roofY = (t: number) => 3.03 - 1.27 * t + 0.24 * t * t
  const tube = new THREE.CylinderGeometry(1, 1, 1, 8)
  for (const side of [-1, 1]) {
    for (let row = 0; row < 9; row++) {
      const a = row / 9,
        b = (row + 1) / 9
      const dy = roofY(b) - roofY(a),
        dz = (b - a) * roofHalf
      const slope = side * Math.atan2(-dy, dz)
      const y = (roofY(a) + roofY(b)) / 2
      const z = -0.11 + ((side * (a + b)) / 2) * roofHalf
      // Each course overhangs the one below. The dark lip remains visible at a shallow viewing angle.
      const run = Math.hypot(dy, dz)
      box(slate, 0, y - 0.03, z, roofWidth, 0.075, run + 0.008, slope)
      for (let col = 0; col < 32; col++) {
        const tileWidth = roofWidth / 32
        const x = -roofWidth / 2 + (col + 0.5) * tileWidth
        const offset = random() * 0.006
        box(
          (row + col * 3) % 7 === 0 ? tileEdge : slate,
          x,
          y + offset + 0.036,
          z,
          tileWidth - 0.004,
          0.046,
          run + 0.004,
          slope - side * 0.064,
        )
        part(tube, slate, x - tileWidth / 2, y + 0.065, z, 0.027, run - 0.012, 0.025, Math.PI / 2 + slope)
        const tipZ = -0.11 + side * (b * roofHalf - 0.012)
        part(
          tube,
          tileEdge,
          x - tileWidth / 2,
          roofY(b) + 0.077,
          tipZ,
          0.031,
          0.034,
          0.029,
          Math.PI / 2 + slope,
        )
      }
    }
    // The plaster gable and exposed truss occupy the triangular ends.
    for (const x of [-2.16, 2.16]) {
      if (side === 1) {
        const gable = new THREE.Shape()
        gable.moveTo(-1.38, 0)
        gable.lineTo(1.38, 0)
        gable.lineTo(0, 0.92)
        gable.closePath()
        const end = new THREE.ShapeGeometry(gable)
        part(end, plaster, x, 1.94, -0.11, 1, 1, 1, 0, x > 0 ? Math.PI / 2 : -Math.PI / 2)
        end.dispose()
        box(cedar, x * 1.025, 2.39, -0.11, 0.13, 0.92, 0.085)
        box(cedar, x * 1.025, 2.25, -0.11, 0.13, 0.064, 1.92)
      }
      box(darkWood, x * 1.14, 2.46, -0.11 + side * 0.85, 0.13, 0.105, 2.03, side * 0.52)
    }
    box(darkWood, 0, 1.947, -0.11 + side * roofHalf, roofWidth + 0.045, 0.12, 0.12)
  }
  for (let i = 0; i < 23; i++)
    part(tube, tileEdge, -2.56 + i * 0.233, 3.074, -0.11, 0.085, 0.239, 0.085, 0, 0, Math.PI / 2)
  for (let i = 0; i < 20; i++) box(endGrain, -2.4 + i * 0.25, 1.94, 1.46, 0.068, 0.08, 0.56, 0.15)
  for (const x of [-2.15, 2.15]) box(cedar, x, 1.12, 1.49, 0.1, 1.6, 0.1)

  // A small paper lantern, with copper hoops and a shade gently swinging in the breeze.
  const lantern = new THREE.Group()
  lantern.position.set(1.85, 1.91, 1.43)
  group.add(lantern)
  const shade = new THREE.Mesh(
    new THREE.SphereGeometry(1, 14, 12),
    new THREE.MeshStandardMaterial({ color: 0xffc083, emissive: 0xf4a255, emissiveIntensity: 0.52 }),
  )
  shade.position.y = -0.32
  shade.scale.set(0.132, 0.185, 0.132)
  lantern.add(shade)
  const wire = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.15, 5), copper)
  wire.position.y = -0.074
  lantern.add(wire)
  for (let i = -3; i <= 3; i++) {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.133 * Math.sqrt(1 - (i * 0.28) ** 2), 0.004, 4, 16),
      cedar,
    )
    ring.rotation.x = Math.PI / 2
    ring.position.y = -0.32 + i * 0.052
    lantern.add(ring)
  }

  // Indigo noren with a vermilion maker's seal painted directly on the textile.
  const clothCanvas = document.createElement("canvas")
  clothCanvas.width = 384
  clothCanvas.height = 256
  const ink = clothCanvas.getContext("2d")!
  ink.fillStyle = "#344951"
  ink.fillRect(0, 0, 384, 256)
  ink.fillStyle = "#d68b6d"
  ink.beginPath()
  ink.arc(194, 112, 41, 0, Math.PI * 2)
  ink.fill()
  ink.fillStyle = "#eee0bf"
  for (let i = 0; i < 3; i++) ink.fillRect(172, 94 + 13 * i, 45 - i * 9, 5)
  const textile = new THREE.CanvasTexture(clothCanvas)
  textile.colorSpace = THREE.SRGBColorSpace
  const curtains: THREE.Mesh[] = []
  for (let i = 0; i < 3; i++) {
    const geometry = new THREE.PlaneGeometry(0.442, 0.37, 4, 6)
    geometry.translate(0, -0.185, 0)
    const uv = geometry.attributes.uv,
      pos = geometry.attributes.position
    for (let j = 0; j < uv.count; j++) {
      const u = uv.getX(j),
        v = uv.getY(j)
      pos.setZ(j, (1 - v) * (0.018 * Math.sin(u * Math.PI * 2 + i) + 0.017))
      uv.setX(j, (i + u) / 3)
    }
    geometry.computeVertexNormals()
    const cloth = new THREE.Mesh(
      geometry,
      new THREE.MeshStandardMaterial({ map: textile, roughness: 1, side: THREE.DoubleSide }),
    )
    cloth.position.set(-0.37 + 0.451 * i, 1.78, 1.22)
    group.add(cloth)
    curtains.push(cloth)
  }
  box(copper, 0.08, 1.8, 1.22, 1.6, 0.035, 0.035)

  // Stepping stones lead past the veranda to a pruned garden pine.
  for (let i = 0; i < 5; i++)
    part(pebble, stone, 0.34 - 0.39 * i, 0.036, 2.22 + i * 0.16, 0.34 - i * 0.017, 0.09, 0.19, 0, i * 1.69)
  function branch(a: number[], b: number[], r: number) {
    const start = new THREE.Vector3(...a),
      end = new THREE.Vector3(...b)
    const axis = end.clone().sub(start)
    const angle = new THREE.Euler().setFromQuaternion(
      new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), axis.clone().normalize()),
    )
    const mid = start.lerp(end, 0.5)
    part(tube, darkWood, mid.x, mid.y, mid.z, r, axis.length(), r, angle.x, angle.y, angle.z)
  }
  branch([-2.84, 0, 0.78], [-2.63, 0.63, 0.67], 0.082)
  branch([-2.63, 0.63, 0.67], [-2.87, 1.23, 0.68], 0.056)
  branch([-2.68, 0.53, 0.69], [-3.2, 0.73, 0.78], 0.046)
  branch([-2.75, 0.83, 0.67], [-2.39, 0.99, 0.72], 0.039)
  for (const [x, y, z, r] of [
    [-2.87, 1.25, 0.68, 0.42],
    [-3.22, 0.72, 0.78, 0.36],
    [-2.4, 0.98, 0.72, 0.31],
  ]) {
    for (let i = 0; i < 15; i++) {
      const a = i * 2.4,
        f = Math.sqrt(i / 15)
      part(
        pebble,
        i % 4 ? deepMoss : moss,
        x + Math.cos(a) * f * r,
        y + (1 - f) * 0.12,
        z + Math.sin(a) * f * r * 0.73,
        r * 0.46,
        0.102 + (1 - f) * 0.075,
        r * 0.43,
        0,
        a,
      )
    }
  }
  for (const [x, z, s] of [
    [-2.94, 1.0, 0.35],
    [-2.64, 1.15, 0.21],
    [2.48, 1.16, 0.27],
    [2.67, 1.05, 0.2],
    [-2.79, -0.65, 0.3],
  ]) {
    part(pebble, stone, x, s * 0.29, z, s, s * 0.57, s * 0.76, 0.09, x)
  }
  // Fine grass and seed heads soften the meeting between the stone plinth and the meadow.
  const blades: number[] = [],
    tints: number[] = []
  const hay = new THREE.Color(),
    green = new THREE.Color(0x665a39),
    gold = new THREE.Color(0xac975b)
  for (const [cx, cz, r] of [
    [-2.82, 0.76, 0.68],
    [2.52, 0.37, 0.63],
    [-2.53, 1.42, 0.42],
    [1.46, 1.67, 0.34],
    [-1.89, 1.82, 0.51],
  ]) {
    for (let i = 0; i < 230; i++) {
      const a = random() * Math.PI * 2,
        dist = Math.sqrt(random()) * r
      const x = cx + Math.cos(a) * dist,
        z = cz + Math.sin(a) * dist * 0.57
      const h = 0.07 + random() ** 2 * 0.21,
        lean = random() * 0.09
      blades.push(x - 0.007, 0.004, z, x + 0.007, 0.004, z + 0.004, x + lean, h, z + 0.03)
      hay.copy(green).lerp(gold, random())
      for (const shade of [0.56, 0.6, 1]) tints.push(hay.r * shade, hay.g * shade, hay.b * shade)
    }
  }
  const grass = new THREE.BufferGeometry()
  grass.setAttribute("position", new THREE.Float32BufferAttribute(blades, 3))
  grass.setAttribute("color", new THREE.Float32BufferAttribute(tints, 3))
  group.add(
    new THREE.Mesh(grass, new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide })),
  )
  for (const [mat, geometries] of batches) {
    const merged = mergeGeometries(geometries)!
    geometries.forEach((g) => g.dispose())
    const mesh = new THREE.Mesh(merged, mat)
    mesh.castShadow = mesh.receiveShadow = true
    group.add(mesh)
  }
  cube.dispose()
  tube.dispose()
  pebble.dispose()
  return {
    group,
    update(time: number) {
      lantern.rotation.z = Math.sin(time * 1.04) * 0.052 + Math.sin(time * 1.67) * 0.016
      curtains.forEach((curtain, i) => {
        curtain.rotation.x = -0.07 + Math.sin(time * 1.17 + i * 0.62) * 0.095
        curtain.rotation.z = Math.sin(time * 1.13 + i * 0.43) * 0.015
      })
    },
  }
}
