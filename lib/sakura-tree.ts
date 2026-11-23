import * as THREE from "three"
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js"

type Point = [number, number, number]

function makePetal() {
  const shape = new THREE.Shape()
  shape.moveTo(0, 0)
  shape.bezierCurveTo(-0.11, 0.18, -0.51, 0.56, -0.4, 0.85)
  shape.bezierCurveTo(-0.31, 1.07, -0.11, 1.03, 0, 0.9)
  shape.bezierCurveTo(0.12, 1.04, 0.32, 1.03, 0.4, 0.85)
  shape.bezierCurveTo(0.52, 0.59, 0.14, 0.2, 0, 0)
  const geometry = new THREE.ShapeGeometry(shape, 4)
  const positions = geometry.attributes.position
  const colors = []
  const base = new THREE.Color("#c76e8b")
  const edge = new THREE.Color("#ffdee5")
  const tint = new THREE.Color()
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i),
      y = positions.getY(i)
    positions.setZ(i, 0.28 * y * y + 0.36 * x * x)
    tint.copy(base).lerp(edge, Math.pow(y, 0.68))
    colors.push(tint.r, tint.g, tint.b)
  }
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3))
  geometry.computeVertexNormals()
  return geometry
}

function branchGeometry(curve: THREE.CatmullRomCurve3, base: number, tip: number) {
  const segments = Math.max(3, curve.points.length * 3)
  const geometry = new THREE.TubeGeometry(curve, segments, 1, 7, false)
  const vertices = geometry.attributes.position
  const point = new THREE.Vector3(),
    ring = new THREE.Vector3()
  for (let i = 0; i <= segments; i++) {
    const u = i / segments
    curve.getPointAt(u, point)
    const radius = THREE.MathUtils.lerp(base, tip, u)
    for (let j = 0; j <= 7; j++) {
      const index = i * 8 + j
      ring
        .fromBufferAttribute(vertices, index)
        .sub(point)
        .multiplyScalar(radius * (1 + 0.055 * Math.sin(j * 3 + i * 0.3)))
        .add(point)
      vertices.setXYZ(index, ring.x, ring.y, ring.z)
    }
  }
  geometry.computeVertexNormals()
  return geometry
}

export function buildSakuraTree() {
  const scene = new THREE.Group(),
    tree = new THREE.Group()
  tree.position.set(1.48, -0.06, -0.84)
  scene.add(tree)
  let seed = 38943
  const random = () => {
    seed = (Math.imul(1664525, seed) + 1013904223) >>> 0
    return seed / 4294967296
  }
  const wood: THREE.BufferGeometry[] = []
  const flowerMatrices: THREE.Matrix4[] = [],
    filamentMatrices: THREE.Matrix4[] = [],
    budMatrices: THREE.Matrix4[] = []
  const leafMatrices: THREE.Matrix4[] = []
  const flowerTints: THREE.Color[] = []
  const place = new THREE.Object3D(),
    child = new THREE.Object3D()
  const axis = new THREE.Vector3(0, 0, 1)
  const point = (v: Point) => new THREE.Vector3(...v)
  function twig(points: THREE.Vector3[], base: number, tip: number) {
    const curve = new THREE.CatmullRomCurve3(points)
    wood.push(branchGeometry(curve, base, tip))
    return curve
  }
  function flower(pos: THREE.Vector3) {
    const size = 0.091 + random() * 0.079
    const facing = new THREE.Vector3(
      random() * 1.9 - 0.87,
      random() * 1.3 - 0.1,
      random() * 1.8 - 0.64,
    ).normalize()
    place.position.copy(pos)
    place.quaternion.setFromUnitVectors(axis, facing)
    place.rotateZ(random() * Math.PI * 2)
    place.scale.setScalar(size)
    place.updateMatrix()
    const tint = new THREE.Color().setRGB(
      0.86 + random() * 0.14,
      0.66 + random() * 0.31,
      0.75 + random() * 0.23,
    )
    for (let i = 0; i < 5; i++) {
      child.position.set(0, 0, 0)
      child.rotation.set(0.1 + random() * 0.22, 0, (i * Math.PI * 2) / 5)
      child.scale.set(0.95 + random() * 0.15, 0.93 + random() * 0.14, 1)
      child.updateMatrix()
      flowerMatrices.push(new THREE.Matrix4().multiplyMatrices(place.matrix, child.matrix))
      flowerTints.push(tint)
    }
    for (let i = 0; i < 5; i++) {
      const a = (i * Math.PI * 2) / 5
      child.position.set(Math.cos(a) * 0.14, Math.sin(a) * 0.14, 0.19)
      child.rotation.set(0, 0, 0)
      child.scale.set(0.066, 0.066, 0.13)
      child.updateMatrix()
      filamentMatrices.push(new THREE.Matrix4().multiplyMatrices(place.matrix, child.matrix))
    }
  }
  function bud(pos: THREE.Vector3) {
    child.position.copy(pos)
    child.rotation.set(random() * 0.8, random(), random() - 0.5)
    child.scale.set(0.044, 0.078, 0.045).multiplyScalar(0.7 + random() * 0.5)
    child.updateMatrix()
    budMatrices.push(child.matrix.clone())
  }
  function spray(anchor: THREE.Vector3, spread: number) {
    const offset = new THREE.Vector3(
      (random() - 0.5) * spread,
      0.05 + random() * 0.18,
      (random() - 0.5) * spread,
    )
    const junction = anchor.clone().add(offset)
    twig([anchor, junction], 0.014, 0.007)
    const count = 2 + Math.floor(random() * 3)
    for (let i = 0; i < count; i++) {
      const a = (2 * Math.PI * i) / count + random() * 0.5
      const end = junction
        .clone()
        .add(
          new THREE.Vector3(
            Math.cos(a) * (0.05 + random() * 0.075),
            (random() - 0.46) * 0.13,
            Math.sin(a) * 0.095,
          ),
        )
      twig([junction, end], 0.007, 0.003)
      if (random() < 0.14) bud(end)
      else flower(end)
    }
    if (random() < 0.27) {
      child.position.copy(junction)
      child.rotation.set(-0.3 + random(), random() * 2, random() * 4 - 2)
      child.scale.set(0.066, 0.14, 0.1)
      child.updateMatrix()
      leafMatrices.push(child.matrix.clone())
    }
  }
  // The bent trunk keeps the crown above the terminal and the front controls in reach.
  const fork: Point = [0.05, 1.33, -0.13],
    shoulder: Point = [0.19, 2.13, -0.16],
    elbow: Point = [-0.5, 2.7, -0.28]
  const trunk: Point[] = [
    [0, 0, 0],
    [0.11, 0.26, 0.06],
    [-0.08, 0.69, 0.1],
    fork,
    [0.31, 1.72, -0.1],
    shoulder,
  ]
  twig(trunk.map(point), 0.18, 0.095)
  for (const [dx, dz] of [
    [0.34, 0.12],
    [-0.3, 0.13],
    [0.08, -0.31],
  ]) {
    twig(
      [point([dx, 0.015, dz]), point([dx * 0.45, 0.065, dz * 0.48]), point([0.07, 0.22, 0.02])],
      0.02,
      0.079,
    )
  }
  function bough(coords: Point[], base: number, sprays: number) {
    const curve = twig(coords.map(point), base, 0.007)
    for (let i = 0; i < sprays; i++)
      spray(curve.getPointAt(0.18 + (0.8 * (i + random() * 0.5)) / sprays), 0.4)
    return curve
  }
  bough(
    [shoulder, [-0.08, 2.39, -0.18], elbow, [-0.97, 2.89, -0.43], [-1.55, 3.08, -0.56], [-2.13, 3.01, -0.48]],
    0.096,
    15,
  )
  bough(
    [elbow, [-0.68, 2.92, -0.37], [-0.78, 3.23, -0.24], [-1.23, 3.49, -0.31], [-1.57, 3.53, -0.25]],
    0.061,
    12,
  )
  bough(
    [
      [-0.93, 2.89, -0.42],
      [-1.25, 2.79, -0.52],
      [-1.67, 2.72, -0.58],
      [-1.94, 2.69, -0.55],
    ],
    0.039,
    7,
  )
  bough(
    [shoulder, [0.38, 2.55, -0.4], [0.23, 2.82, -0.52], [0.37, 3.18, -0.67], [0.17, 3.56, -0.75]],
    0.081,
    12,
  )
  bough(
    [
      [0.29, 2.7, -0.45],
      [0.04, 2.95, -0.59],
      [-0.34, 3.12, -0.75],
      [-0.53, 3.39, -0.81],
    ],
    0.052,
    9,
  )
  bough(
    [
      [0.36, 3.13, -0.65],
      [0.67, 3.27, -0.46],
      [0.91, 3.54, -0.43],
    ],
    0.043,
    7,
  )
  bough([fork, [0.5, 1.63, -0.04], [0.78, 1.92, 0.03], [0.86, 2.29, -0.02], [1.17, 2.53, -0.07]], 0.077, 9)
  bough(
    [
      [0.77, 1.91, 0.03],
      [1.04, 1.94, 0.14],
      [1.31, 2.13, 0.21],
      [1.46, 2.19, 0.18],
    ],
    0.043,
    7,
  )
  bough(
    [
      [0.86, 2.24, -0.02],
      [0.75, 2.47, 0.18],
      [0.71, 2.66, 0.27],
    ],
    0.032,
    5,
  )
  bough(
    [
      [-1.55, 3.08, -0.56],
      [-1.89, 3.1, -0.39],
      [-2.28, 2.94, -0.29],
      [-2.65, 2.83, -0.18],
    ],
    0.044,
    10,
  )
  bough(
    [
      [-1.23, 3.49, -0.31],
      [-1.63, 3.56, -0.19],
      [-1.89, 3.47, -0.1],
      [-2.14, 3.39, 0.04],
    ],
    0.032,
    8,
  )
  const timber = mergeGeometries(wood)!
  wood.forEach((g) => g.dispose())
  tree.add(new THREE.Mesh(timber, new THREE.MeshStandardMaterial({ color: 0x493132, roughness: 0.94 })))

  const petal = makePetal()
  const silk = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    vertexColors: true,
    side: THREE.DoubleSide,
    roughness: 0.82,
  })
  function instances(
    parent: THREE.Group,
    geometry: THREE.BufferGeometry,
    material: THREE.Material,
    matrices: THREE.Matrix4[],
  ) {
    const mesh = new THREE.InstancedMesh(geometry, material, matrices.length)
    matrices.forEach((matrix, i) => mesh.setMatrixAt(i, matrix))
    mesh.computeBoundingSphere()
    parent.add(mesh)
    return mesh
  }
  const petals = instances(tree, petal, silk, flowerMatrices)
  flowerTints.forEach((color, i) => petals.setColorAt(i, color))
  const bead = new THREE.SphereGeometry(1, 6, 4)
  instances(
    tree,
    bead,
    new THREE.MeshStandardMaterial({ color: 0xc49652, roughness: 0.75 }),
    filamentMatrices,
  )
  instances(tree, bead, new THREE.MeshStandardMaterial({ color: 0xbb5977, roughness: 0.84 }), budMatrices)
  instances(
    tree,
    petal,
    new THREE.MeshStandardMaterial({ color: 0x81916f, side: THREE.DoubleSide, roughness: 0.86 }),
    leafMatrices,
  )

  // Settled petals share the same cupped geometry as the flowers and the drifting petals.
  const fallen: THREE.Matrix4[] = []
  for (let i = 0; i < 30; i++) {
    const a = random() * Math.PI * 2,
      r = 1.7 + 0.76 * random()
    child.position.set(Math.cos(a) * r, -0.046, 0.26 + Math.sin(a) * r)
    child.rotation.set(-Math.PI / 2 + 0.15 * random(), 0, random() * Math.PI * 2)
    child.scale.setScalar(0.075 + random() * 0.08)
    child.updateMatrix()
    fallen.push(child.matrix.clone())
  }
  const fallenPetals = instances(scene, petal, silk, fallen)
  const pink = new THREE.Color("#f7bdca")
  for (let i = 0; i < fallen.length; i++) fallenPetals.setColorAt(i, pink)
  const seeds = Array.from({ length: 26 }, () => ({
    offset: random(),
    period: 5 + random() * 4,
    x: -1.35 + random() * 4.65,
    z: -1.7 + random() * 3.5,
    size: 0.07 + random() * 0.092,
    sway: 0.23 + random() * 0.44,
    spin: random() * 6.28,
  }))
  const wind = new THREE.InstancedMesh(petal, silk, seeds.length)
  wind.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
  for (let i = 0; i < seeds.length; i++) wind.setColorAt(i, pink)
  wind.frustumCulled = false
  scene.add(wind)
  return {
    group: scene,
    update(time: number) {
      tree.rotation.z = 0.01 * Math.sin(time * 0.83) + 0.004 * Math.sin(time * 1.47)
      seeds.forEach((s, i) => {
        const t = (time / s.period + s.offset) % 1,
          a = t * Math.PI * 2
        child.position.set(
          s.x - 1.0 * t + s.sway * Math.sin(a + s.spin),
          3.75 * (1 - t) - 0.04,
          s.z + 0.31 * Math.cos(a + s.spin),
        )
        child.rotation.set(s.spin + a * 1.6, a + s.spin, 0.5 * Math.sin(a * 2 + s.spin) + a * 0.7)
        const fade = Math.min(1, t * 10, (1 - t) * 13)
        child.scale.setScalar(s.size * fade)
        child.updateMatrix()
        wind.setMatrixAt(i, child.matrix)
      })
      wind.instanceMatrix.needsUpdate = true
    },
  }
}
