"use client"

import { useEffect, useRef } from "react"

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const timeRef = useRef(0)
  const particlesRef = useRef<any[]>([])
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const initParticles = () => {
      const particleCount = Math.min(Math.floor(window.innerWidth / 15), 150)
      particlesRef.current = []

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: Math.random() * 1 - 0.5,
          speedY: Math.random() * 1 - 0.5,
          color: `rgba(16, ${150 + Math.random() * 50}, ${120 + Math.random() * 50}, ${0.3 + Math.random() * 0.3})`,
          originalX: Math.random() * canvas.width,
          originalY: Math.random() * canvas.height,
          angle: Math.random() * Math.PI * 2,
          angleSpeed: 0.002 + Math.random() * 0.002,
          amplitude: 30 + Math.random() * 50,
        })
      }
    }

    const drawGradientBackground = (ctx: CanvasRenderingContext2D, time: number) => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)

      // Shift hue slightly over time for subtle color changes
      const hueShift = (Math.sin(time * 0.0005) + 1) * 10

      gradient.addColorStop(0, `hsl(220, 15%, 10%)`)
      gradient.addColorStop(0.5, `hsl(200, 20%, 8%)`)
      gradient.addColorStop(1, `hsl(180, 15%, 5%)`)

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    const animate = (timestamp: number) => {
      if (!canvas || !ctx) return

      timeRef.current = timestamp

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw animated gradient background
      drawGradientBackground(ctx, timestamp)

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Wave motion
        const waveX = Math.sin(timestamp * 0.001 + particle.angle) * particle.amplitude
        const waveY = Math.cos(timestamp * 0.001 + particle.angle) * particle.amplitude

        // Target position combines original position, wave motion, and mouse influence
        const targetX = particle.originalX + waveX
        const targetY = particle.originalY + waveY

        // Mouse influence
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 150

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance
          particle.x -= dx * force * 0.03
          particle.y -= dy * force * 0.03
        } else {
          // Move towards target position
          particle.x += (targetX - particle.x) * 0.02
          particle.y += (targetY - particle.y) * 0.02
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Connect nearby particles
        for (let j = index + 1; j < particlesRef.current.length; j++) {
          const otherParticle = particlesRef.current[j]
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)

            // Pulse the connection opacity based on time
            const opacity = 0.15 * (1 - distance / 100) * (0.5 + Math.sin(timestamp * 0.001) * 0.5)

            ctx.strokeStyle = `rgba(16, 185, 129, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }

        // Update angle for next frame
        particle.angle += particle.angleSpeed
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)

    handleResize()
    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
}

