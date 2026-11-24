import * as THREE from "three"

export const bootKeys = ["H", "E", "L", "L", "O", ",", "↵", "W", "O", "R", "L", "D"] as const
const strikes = [1.72, 1.91, 2.08, 2.24, 2.43, 2.6, 2.81, 3.08, 3.25, 3.42, 3.62, 3.84]
export const startupDuration = 4.2

const glyphs: Record<string, string[]> = {
  H: ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
  e: ["00000", "00000", "01110", "10001", "11111", "10000", "01111"],
  l: ["01100", "00100", "00100", "00100", "00100", "00100", "01110"],
  o: ["00000", "00000", "01110", "10001", "10001", "10001", "01110"],
  ",": ["00000", "00000", "00000", "00000", "00000", "00100", "01000"],
  w: ["00000", "00000", "10001", "10001", "10101", "10101", "01010"],
  r: ["00000", "00000", "10110", "11001", "10000", "10000", "10000"],
  d: ["00001", "00001", "01111", "10001", "10001", "10001", "01111"],
}

function surface() {
  const canvas = document.createElement("canvas")
  canvas.width = 768
  canvas.height = 576
  return canvas.getContext("2d")!
}

function texture(ctx: CanvasRenderingContext2D) {
  const result = new THREE.CanvasTexture(ctx.canvas)
  result.colorSpace = THREE.SRGBColorSpace
  result.anisotropy = 4
  return result
}

// These layers are uploaded once. The shader advances the beam and reveals the ink.
export function makeDisplay(redraw: () => void) {
  const background = surface()
  const glow = background.createRadialGradient(320, 255, 10, 380, 290, 495)
  glow.addColorStop(0, "#2c4334")
  glow.addColorStop(0.72, "#10271f")
  glow.addColorStop(1, "#061510")
  background.fillStyle = glow
  background.fillRect(0, 0, 768, 576)
  background.fillStyle = "#9bc3a1"
  background.font = "22px monospace"
  background.fillText("FA.OS  /  SAKURA", 55, 65)
  background.fillRect(55, 84, 656, 2)

  background.save()
  background.translate(688, 51)
  for (let i = 0; i < 5; i++) {
    background.rotate((Math.PI * 2) / 5)
    background.beginPath()
    background.moveTo(0, 0)
    background.bezierCurveTo(-11, -6, -8, -17, -3, -17)
    background.lineTo(0, -15)
    background.bezierCurveTo(9, -23, 11, -6, 0, 0)
    background.fill()
  }
  background.restore()

  const greeting = surface()
  greeting.fillStyle = "#bdfbc4"
  greeting.shadowColor = "#a0ffaf"
  greeting.shadowBlur = 7
  function print(line: string, y: number) {
    Array.from(line).forEach((letter, col) => {
      glyphs[letter].forEach((row, r) =>
        Array.from(row).forEach((pixel, c) => {
          if (pixel === "1") greeting.fillRect(58 + col * 99 + c * 16, y + r * 16, 15.5, 15.5)
        }),
      )
    })
  }
  print("Hello,", 139)
  print("world", 284)
  greeting.shadowBlur = 0
  greeting.fillStyle = "#91ba97"
  greeting.font = "23px monospace"
  greeting.fillText("> SYSTEM READY", 58, 509)

  const profile = surface()
  const profileTexture = texture(profile)
  let portraitReady = false
  const image = new Image()
  image.onload = () => {
    // Quantize a small luminance image before enlarging it into phosphor pixels.
    const sample = document.createElement("canvas")
    sample.width = sample.height = 72
    const ctx = sample.getContext("2d")!
    ctx.drawImage(image, 0, 0, 72, 72)
    const pixels = ctx.getImageData(0, 0, 72, 72).data
    const bayer = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5]
    const greens = ["#0c2018", "#21432e", "#44694b", "#6d9871", "#9dc49a", "#cef0bf"]
    for (let y = 0; y < 72; y++)
      for (let x = 0; x < 72; x++) {
        const i = (y * 72 + x) * 4
        const luminance = (pixels[i] * 0.299 + pixels[i + 1] * 0.587 + pixels[i + 2] * 0.114) / 255
        const dither = (bayer[(y % 4) * 4 + (x % 4)] / 16 - 0.5) * 0.15
        profile.fillStyle = greens[THREE.MathUtils.clamp(Math.round((luminance + dither) * 5.5), 0, 5)]
        profile.fillRect(56 + x * 5, 110 + y * 5, 5, 5)
      }
    profile.strokeStyle = "#699b78"
    profile.strokeRect(54, 108, 364, 364)
    profile.fillStyle = "#91bb96"
    profile.font = "22px monospace"
    profile.fillText("OPERATOR", 448, 172)
    profile.fillStyle = "#c4f3bc"
    profile.font = "bold 61px monospace"
    profile.fillText("FEBRY", 445, 241)
    profile.font = "bold 35px monospace"
    profile.fillText("ARDIANSYAH", 446, 290, 260)
    profile.fillStyle = "#91bb96"
    profile.fillRect(449, 323, 225, 2)
    profile.font = "23px monospace"
    profile.fillText("MOBILE + WEB", 448, 370)
    profile.fillText("> PROFILE LOADED", 56, 513)
    profileTexture.needsUpdate = true
    portraitReady = true
    redraw()
  }
  image.src = "/portfolio/portrait.webp"

  const uniforms = {
    backdrop: { value: texture(background) },
    greeting: { value: texture(greeting) },
    profile: { value: profileTexture },
    power: { value: 1 },
    characters: { value: 11 },
    secondLine: { value: 1 },
    scan: { value: 0 },
    phase: { value: 0 },
  }
  const material = new THREE.ShaderMaterial({
    uniforms,
    toneMapped: false,
    vertexShader: `
      varying vec2 screenUv;
      void main() {
        screenUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
      }`,
    fragmentShader: `
      varying vec2 screenUv;
      uniform sampler2D backdrop, greeting, profile;
      uniform float power, characters, secondLine, scan, phase;
      void main() {
        vec2 pixel = vec2(screenUv.x, 1. - screenUv.y) * vec2(768., 576.);
        vec3 base = texture2D(backdrop, screenUv).rgb;
        vec4 ink = texture2D(greeting, screenUv);
        float row = step(270., pixel.y);
        float column = max(0., floor((pixel.x - 57.) / 99.));
        float visibleInk = step(column + row * 6. + 1., characters);
        if (pixel.y > 456.) visibleInk = step(11., characters);
        vec3 text = mix(base, ink.rgb, ink.a * visibleInk);
        float cursorCol = secondLine > .5 ? characters - 6. : characters;
        float cursorY = secondLine > .5 ? 381. : 236.;
        vec2 cursor = pixel - vec2(58. + cursorCol * 99., cursorY);
        float caret = step(0.,cursor.x)*step(cursor.x,72.)*step(0.,cursor.y)*step(cursor.y,12.);
        text += caret * (.60+.40*cos(phase*4.3)) * vec3(.31,.65,.38);
        vec4 avatar = texture2D(profile, screenUv);
        float wipe = smoothstep(-.013,.013,scan*1.08 - .04 - (1.-screenUv.y));
        vec3 color = mix(text, mix(base,avatar.rgb,avatar.a), wipe);
        float beam = max(0.,1.-abs(scan*1.08-.04-(1.-screenUv.y))/.015);
        color += beam * vec3(.18,.46,.26);
        float raster = pixel.y*1.22;
        color *= .96 + .04*cos(raster)*clamp(1.-fwidth(raster)/6.28,0.,1.);
        float band = (1.-screenUv.y) - fract(phase*.14);
        color += exp(-band*band*870.) * vec3(.004,.014,.007);
        float aperture = smoothstep(-.017,.017,power*.56-abs(screenUv.y-.5));
        float ignition = (1.-smoothstep(.04,.98,power))*exp(-abs(screenUv.y-.5)*260.)*smoothstep(0.,.05,power);
        color = mix(vec3(.003,.009,.006),color,aperture*smoothstep(0.,.24,power));
        color += ignition*vec3(.36,.79,.45);
        gl_FragColor=vec4(color,1.);
        #include <colorspace_fragment>
      }`,
  })

  return {
    material,
    update(t: number) {
      let count = 0
      while (count < strikes.length && strikes[count] <= t) count++
      uniforms.power.value = THREE.MathUtils.smoothstep(t, 1.02, 1.68)
      uniforms.characters.value = count - (count > 6 ? 1 : 0)
      uniforms.secondLine.value = Number(count >= 7)
      uniforms.phase.value = t
      const cycle = Math.max(0, t - startupDuration) % 14
      const scan = portraitReady
        ? THREE.MathUtils.smoothstep(cycle, 2.6, 3.65) * (1 - THREE.MathUtils.smoothstep(cycle, 9, 10.05))
        : 0
      uniforms.scan.value = scan
      return {
        key: count ? bootKeys[count - 1] : undefined,
        depression: count ? Math.max(0, 1 - (t - strikes[count - 1]) / 0.15) : 0,
        power: uniforms.power.value,
        state:
          t < 1.02
            ? "Assembling"
            : t < 1.72
              ? "Powering on"
              : t < startupDuration
                ? "Typing"
                : scan > 0.99
                  ? "Operator portrait"
                  : scan > 0.01
                    ? "Scanning"
                    : "Online",
      }
    },
    dispose() {
      image.onload = null
      uniforms.backdrop.value.dispose()
      uniforms.greeting.value.dispose()
      profileTexture.dispose()
    },
  }
}
