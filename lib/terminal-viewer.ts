import * as THREE from "three"
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js"
import { buildSakuraTree } from "./sakura-tree"
import { buildSpringStudio } from "./spring-studio"
import { buildTerminal } from "./field-terminal"
import { startupDuration } from "./terminal-display"

export type StudioView = "garden" | "desk"

export interface PlaybackState {
  playing: boolean
  phase: string
}

function buildTurntable() {
  const deck = new THREE.Group()
  deck.position.set(0, -0.13, 0.26)
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(2.52, 2.47, 0.13, 96),
    new THREE.MeshStandardMaterial({ color: 0x613a38, metalness: 0.23, roughness: 0.47 }),
  )
  deck.add(base)
  const rim = new THREE.Mesh(
    new THREE.CylinderGeometry(2.52, 2.52, 0.025, 96),
    new THREE.MeshStandardMaterial({ color: 0xbfa17b, metalness: 0.48, roughness: 0.58 }),
  )
  rim.position.y = 0.012
  deck.add(rim)
  const top = new THREE.Mesh(
    new THREE.CylinderGeometry(2.48, 2.49, 0.025, 96),
    new THREE.MeshStandardMaterial({ color: 0xdfcfb7, roughness: 0.88 }),
  )
  top.position.y = 0.059
  top.receiveShadow = true
  deck.add(top)
  const dial = new THREE.Group()
  dial.position.y = 0.074
  deck.add(dial)
  const ticks: number[] = []
  for (let i = 0; i < 120; i++) {
    const angle = (i * Math.PI) / 60
    const radius = i % 10 === 0 ? 2.28 : i % 5 === 0 ? 2.34 : 2.4
    ticks.push(
      Math.sin(angle) * radius,
      0,
      Math.cos(angle) * radius,
      Math.sin(angle) * 2.46,
      0,
      Math.cos(angle) * 2.46,
    )
  }
  const marks = new THREE.BufferGeometry()
  marks.setAttribute("position", new THREE.Float32BufferAttribute(ticks, 3))
  dial.add(
    new THREE.LineSegments(
      marks,
      new THREE.LineBasicMaterial({ color: 0x876959, transparent: true, opacity: 0.62 }),
    ),
  )
  const sweep = new THREE.Group()
  dial.add(sweep)
  for (let i = 0; i < 3; i++) {
    const arc = new THREE.Mesh(
      new THREE.RingGeometry(2.464, 2.49, 60, 1, (i * 2 * Math.PI) / 3, 0.79),
      new THREE.MeshBasicMaterial({ color: 0xb86765 }),
    )
    arc.rotation.x = -Math.PI / 2
    sweep.add(arc)
  }
  return { deck, sweep }
}

export function mountTerminal(
  host: HTMLElement,
  onLost: () => void,
  onPlayback: (state: PlaybackState) => void,
) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6))
  renderer.setClearColor(0, 0)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.05
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.shadowMap.autoUpdate = false
  renderer.shadowMap.needsUpdate = true
  const scene = new THREE.Scene()
  const environment = new RoomEnvironment()
  const pmrem = new THREE.PMREMGenerator(renderer)
  const reflection = pmrem.fromScene(environment, 0.035)
  scene.environment = reflection.texture
  scene.environmentIntensity = 0.25
  pmrem.dispose()
  environment.dispose()
  const studio = buildSpringStudio()
  const garden = new THREE.Group()
  garden.add(studio.group)
  scene.add(garden)
  let terminal: ReturnType<typeof buildTerminal> | undefined
  let turntable: ReturnType<typeof buildTurntable> | undefined
  const desk = new THREE.Group()
  desk.visible = false
  scene.add(desk)
  function prepareDesk() {
    if (terminal) return
    terminal = buildTerminal(redraw)
    terminal.model.scale.setScalar(0.84)
    terminal.model.position.set(-0.4, -0.055, 0.14)
    turntable = buildTurntable()
    desk.add(terminal.model, turntable.deck)
  }
  const sakura = buildSakuraTree()
  scene.add(sakura.group)
  sakura.group.position.set(1.43, 0.03, -0.73)
  sakura.group.scale.setScalar(0.85)
  const sky = new THREE.HemisphereLight(0xffecd7, 0x65575f, 0.68)
  scene.add(sky)
  const light = new THREE.DirectionalLight(0xffdfba, 2.1)
  light.position.set(-4, 6, 3)
  light.castShadow = true
  light.shadow.mapSize.set(1024, 1024)
  Object.assign(light.shadow.camera, { left: -4, right: 4, top: 4, bottom: -4, near: 0.1, far: 18 })
  light.shadow.normalBias = 0.018
  light.shadow.bias = -0.0002
  scene.add(light)
  const rim = new THREE.DirectionalLight(0xffd5dc, 1.7)
  rim.position.set(4, 4, -3)
  scene.add(rim)
  const phosphorLight = new THREE.PointLight(0xa8ffc0, 0, 2.3)
  phosphorLight.position.set(-0.61, 1.09, 1.27)
  scene.add(phosphorLight)
  const shadowCanvas = document.createElement("canvas")
  shadowCanvas.width = shadowCanvas.height = 128
  const ctx = shadowCanvas.getContext("2d")!
  const contact = ctx.createRadialGradient(64, 64, 8, 64, 64, 63)
  contact.addColorStop(0, "rgba(67,37,31,.40)")
  contact.addColorStop(0.6, "rgba(64,38,35,.20)")
  contact.addColorStop(1, "rgba(64,38,35,0)")
  ctx.fillStyle = contact
  ctx.fillRect(0, 0, 128, 128)
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(5.3, 5.8),
    new THREE.MeshBasicMaterial({
      map: new THREE.CanvasTexture(shadowCanvas),
      transparent: true,
      depthWrite: false,
    }),
  )
  floor.rotation.x = -Math.PI / 2
  floor.position.set(0.1, -0.04, 0.21)
  desk.add(floor)
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(14, 12),
    new THREE.ShadowMaterial({ opacity: 0.24, depthWrite: false }),
  )
  ground.rotation.x = -Math.PI / 2
  ground.position.y = -0.018
  ground.receiveShadow = true
  const foundation = new THREE.Mesh(new THREE.PlaneGeometry(7.4, 5.2), floor.material)
  foundation.rotation.x = -Math.PI / 2
  foundation.position.set(0, -0.012, 0.27)
  garden.add(ground, foundation)

  const camera = new THREE.OrthographicCamera(-3, 3, 2, -2, 0.1, 60)
  let view: StudioView = "garden"
  const aim = new THREE.Vector3(0, 1.68, 0)
  let homeYaw = -0.4,
    homePitch = 0.18
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
  let playing = !motion.matches
  let elapsed = playing ? 0 : startupDuration
  let yaw = homeYaw,
    pitch = homePitch,
    exploded = 0
  let targetYaw = yaw,
    targetPitch = pitch,
    targetExploded = 0
  let pointerX = 0,
    pointerY = 0
  let lookX = 0,
    lookY = 0
  let manualCamera = false
  let frame = 0,
    visible = false,
    disposed = false
  let previousTime: number | null = null
  let previousDraw = -Infinity
  let reportedPhase = ""
  let reportedPlaying: boolean | undefined
  const frameInterval = 1000 / 30

  function render(time: number) {
    frame = 0
    if (disposed || !visible || document.hidden) return
    if (playing && time - previousDraw < frameInterval - 2) {
      redraw()
      return
    }
    const delta = previousTime === null ? 0 : Math.min((time - previousTime) / 1000, 0.25)
    previousTime = time
    previousDraw = time
    if (playing) elapsed += delta
    const blend = motion.matches || !playing ? 1 : 1 - Math.exp(-Math.max(0.016, delta) * 13)
    const lastExploded = exploded
    yaw += (targetYaw - yaw) * blend
    pitch += (targetPitch - pitch) * blend
    exploded += (targetExploded - exploded) * blend
    lookX += (pointerX - lookX) * blend
    lookY += (pointerY - lookY) * blend

    const atDesk = view === "desk"
    let phase = "Spring evening"
    if (atDesk && terminal && turntable) {
      phase = terminal.update(elapsed, exploded)
      turntable.sweep.rotation.y = -elapsed * 0.16
    } else {
      studio.update(elapsed)
    }
    if (phase !== reportedPhase || playing !== reportedPlaying) {
      reportedPhase = phase
      reportedPlaying = playing
      onPlayback({ playing, phase })
    }
    const approach = 1 - THREE.MathUtils.smootherstep(elapsed, 0, 1.65)
    const idle = Math.max(0, elapsed - startupDuration)
    const orbit = manualCamera ? 0 : Math.sin(idle * (atDesk ? 0.32 : 0.15)) * (atDesk ? 0.17 : 0.052)
    const elevation = manualCamera ? 0 : Math.sin(idle * 0.42) * (atDesk ? 0.029 : 0.009)
    const azimuth = yaw + (manualCamera ? 0 : (atDesk ? 0.42 : -0.055) * approach) + orbit + lookX
    const angle = pitch + (manualCamera ? 0 : (atDesk ? 0.12 : 0.012) * approach) + elevation + lookY
    camera.position.set(
      aim.x + 10 * Math.sin(azimuth) * Math.cos(angle),
      aim.y + 10 * Math.sin(angle),
      aim.z + 10 * Math.cos(azimuth) * Math.cos(angle),
    )
    camera.lookAt(aim)
    const zoom = 1 - (atDesk ? 0.17 : 0.025) * approach - 0.055 * exploded
    if (Math.abs(camera.zoom - zoom) > 0.0001) {
      camera.zoom = zoom
      camera.updateProjectionMatrix()
    }
    sakura.update(elapsed)
    phosphorLight.intensity = Number(atDesk) * 0.46 * THREE.MathUtils.smoothstep(elapsed, 1.02, 1.68)
    rim.intensity = (atDesk ? 1.6 : 0.68) + 0.12 * Math.sin(elapsed * 0.63)
    // The static geometry can reuse its shadow map throughout the idle camera orbit.
    if ((atDesk && elapsed < startupDuration + 0.3) || Math.abs(lastExploded - exploded) > 0.00001)
      renderer.shadowMap.needsUpdate = true
    renderer.render(scene, camera)
    const settling =
      Math.abs(targetYaw - yaw) + Math.abs(targetPitch - pitch) + Math.abs(targetExploded - exploded)
    if (playing || settling > 0.001) redraw()
  }
  function redraw() {
    if (!frame && visible && !disposed && !document.hidden) frame = requestAnimationFrame(render)
  }
  function syncVisibility() {
    cancelAnimationFrame(frame)
    frame = 0
    previousTime = null
    previousDraw = -Infinity
    redraw()
  }
  function resize() {
    const width = host.clientWidth,
      height = host.clientHeight
    if (!width || !height) return
    const aspect = width / height
    const h = view === "desk" ? Math.max(4.95, 6.25 / aspect) : Math.max(4.68, 7.5 / aspect)
    camera.left = (-h * aspect) / 2
    camera.right = (h * aspect) / 2
    camera.top = h / 2
    camera.bottom = -h / 2
    camera.updateProjectionMatrix()
    renderer.setSize(width, height, false)
    redraw()
  }
  function setPlaying(value: boolean) {
    playing = value
    previousTime = null
    previousDraw = -Infinity
    redraw()
  }
  function motionPreferenceChanged() {
    if (motion.matches) {
      elapsed = startupDuration
      lookX = lookY = pointerX = pointerY = 0
      renderer.shadowMap.needsUpdate = true
    }
    setPlaying(!motion.matches)
  }
  function takeCamera() {
    if (manualCamera) return
    // Preserve the current cinematic angle when the visitor grabs the model.
    const offset = camera.position.clone().sub(aim)
    if (offset.lengthSq() > 1) {
      yaw = targetYaw = Math.atan2(offset.x, offset.z)
      pitch = targetPitch = Math.asin(offset.y / offset.length())
    }
    manualCamera = true
    lookX = lookY = pointerX = pointerY = 0
    renderer.shadowMap.needsUpdate = true
  }
  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(host)
  const intersection = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    syncVisibility()
  })
  intersection.observe(host)
  document.addEventListener("visibilitychange", syncVisibility)
  motion.addEventListener("change", motionPreferenceChanged)
  const canvas = renderer.domElement
  canvas.setAttribute("aria-hidden", "true")
  canvas.addEventListener("webglcontextlost", onLost)
  host.appendChild(canvas)
  resize()
  return {
    setView(next: StudioView) {
      if (next === view) return
      view = next
      const atDesk = view === "desk"
      if (atDesk) prepareDesk()
      sky.intensity = atDesk ? 1.22 : 0.68
      scene.environmentIntensity = atDesk ? 0.48 : 0.25
      garden.visible = !atDesk
      desk.visible = atDesk
      sakura.group.position.set(atDesk ? 0 : 1.43, atDesk ? 0 : 0.03, atDesk ? 0 : -0.73)
      sakura.group.scale.setScalar(atDesk ? 1 : 0.85)
      aim.set(atDesk ? 0.12 : 0, atDesk ? 1.61 : 1.68, atDesk ? 0.14 : 0)
      homeYaw = atDesk ? 0.53 : -0.4
      homePitch = atDesk ? 0.31 : 0.18
      targetYaw = yaw = homeYaw
      targetPitch = pitch = homePitch
      targetExploded = exploded = 0
      elapsed = playing ? 0 : startupDuration
      manualCamera = false
      pointerX = pointerY = lookX = lookY = 0
      renderer.shadowMap.needsUpdate = true
      if (!motion.matches && playing) canvas.animate([{ opacity: 0.1 }, { opacity: 1 }], { duration: 420 })
      resize()
      syncVisibility()
    },
    rotate(dx: number, dy: number) {
      takeCamera()
      targetYaw -= dx * 0.008
      targetPitch = THREE.MathUtils.clamp(targetPitch + dy * 0.006, 0.1, 0.87)
      redraw()
    },
    look(x: number, y: number) {
      if (!playing || manualCamera || motion.matches) return
      pointerX = x * 0.09
      pointerY = -y * 0.027
    },
    explode(value: boolean) {
      takeCamera()
      elapsed = Math.max(elapsed, startupDuration)
      renderer.shadowMap.needsUpdate = true
      targetExploded = Number(value)
      redraw()
    },
    reset() {
      takeCamera()
      elapsed = Math.max(elapsed, startupDuration)
      renderer.shadowMap.needsUpdate = true
      targetYaw = yaw + THREE.MathUtils.euclideanModulo(homeYaw - yaw + Math.PI, 2 * Math.PI) - Math.PI
      targetPitch = homePitch
      targetExploded = 0
      redraw()
    },
    togglePlayback() {
      setPlaying(!playing)
    },
    replay() {
      elapsed = 0
      manualCamera = false
      lookX = lookY = pointerX = pointerY = 0
      targetYaw = yaw = homeYaw
      targetPitch = pitch = homePitch
      targetExploded = exploded = 0
      setPlaying(true)
    },
    dispose() {
      disposed = true
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      intersection.disconnect()
      document.removeEventListener("visibilitychange", syncVisibility)
      motion.removeEventListener("change", motionPreferenceChanged)
      terminal?.dispose()
      canvas.removeEventListener("webglcontextlost", onLost)
      const materials = new Set<THREE.Material>()
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.LineSegments) {
          if (obj instanceof THREE.InstancedMesh) obj.dispose()
          obj.geometry.dispose()
          for (const m of Array.isArray(obj.material) ? obj.material : [obj.material]) materials.add(m)
        }
      })
      materials.forEach((mat) => {
        if ("map" in mat && mat.map instanceof THREE.Texture) mat.map.dispose()
        mat.dispose()
      })
      light.shadow.dispose()
      reflection.dispose()
      renderer.dispose()
      renderer.forceContextLoss()
      canvas.remove()
    },
  }
}
