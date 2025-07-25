"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Custom splash cursor implementation
export default function SplashCursorContainer() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [splashes, setSplashes] = useState<{ id: number; x: number; y: number }[]>([])
  const lastPositionRef = useRef({ x: 0, y: 0 })
  const lastSplashTimeRef = useRef(0)
  const isMovingRef = useRef(false)
  const requestRef = useRef<number>()

  // Configuration
  const color = "#10b981" // emerald-500
  const splashSize = 40
  const splashOpacity = 0.6
  const cursorSize = 8
  const cursorOpacity = 0.8

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      // Check if mouse has moved significantly
      const dx = e.clientX - lastPositionRef.current.x
      const dy = e.clientY - lastPositionRef.current.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance > 5) {
        isMovingRef.current = true
        lastPositionRef.current = { x: e.clientX, y: e.clientY }
      } else {
        isMovingRef.current = false
      }
    }

    const handleMouseLeave = () => {
      isMovingRef.current = false
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [])

  // Animation loop for creating splashes
  useEffect(() => {
    const createSplashesLoop = () => {
      const now = Date.now()

      // Create splash if mouse is moving and enough time has passed
      if (isMovingRef.current && now - lastSplashTimeRef.current > 100) {
        const newSplash = {
          id: now,
          x: mousePosition.x,
          y: mousePosition.y,
        }

        setSplashes((prev) => [...prev.slice(-10), newSplash]) // Keep only last 10 splashes
        lastSplashTimeRef.current = now

        // Remove splash after animation completes
        setTimeout(() => {
          setSplashes((prev) => prev.filter((splash) => splash.id !== newSplash.id))
        }, 1000)
      }

      requestRef.current = requestAnimationFrame(createSplashesLoop)
    }

    requestRef.current = requestAnimationFrame(createSplashesLoop)

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [mousePosition])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Cursor dot */}
      <motion.div
        className="fixed rounded-full pointer-events-none mix-blend-screen"
        style={{
          width: cursorSize,
          height: cursorSize,
          backgroundColor: color,
          opacity: cursorOpacity,
          x: mousePosition.x - cursorSize / 2,
          y: mousePosition.y - cursorSize / 2,
        }}
        animate={{
          x: mousePosition.x - cursorSize / 2,
          y: mousePosition.y - cursorSize / 2,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      />

      {/* Splashes */}
      <AnimatePresence>
        {splashes.map((splash) => (
          <motion.div
            key={splash.id}
            className="fixed rounded-full mix-blend-screen pointer-events-none"
            style={{
              backgroundColor: color,
              width: splashSize,
              height: splashSize,
              x: splash.x - splashSize / 2,
              y: splash.y - splashSize / 2,
              opacity: splashOpacity,
            }}
            initial={{ scale: 0.2, opacity: splashOpacity }}
            animate={{
              scale: 1,
              opacity: 0,
              x: splash.x - splashSize / 2 + (Math.random() * 20 - 10),
              y: splash.y - splashSize / 2 + (Math.random() * 20 - 10),
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

