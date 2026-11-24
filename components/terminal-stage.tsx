"use client"

import { useEffect, useRef, useState } from "react"
import { Boxes, Crosshair, DoorOpen, MousePointer2, Pause, Play, RotateCcw, Trees } from "lucide-react"
import type { mountTerminal, PlaybackState, StudioView } from "@/lib/terminal-viewer"

type Viewer = ReturnType<typeof mountTerminal>

export default function TerminalStage() {
  const surface = useRef<HTMLDivElement>(null)
  const viewer = useRef<Viewer | null>(null)
  const drag = useRef<{ id: number; x: number; y: number } | null>(null)
  const currentView = useRef<StudioView>("garden")
  const [view, setView] = useState<StudioView>("garden")
  const atDesk = view === "desk"
  const [ready, setReady] = useState(false)
  const [playback, setPlayback] = useState<PlaybackState>({ playing: false, phase: "Online" })
  const [exploded, setExploded] = useState(false)

  useEffect(() => {
    const host = surface.current
    if (!host) return
    let cancelled = false
    function fallback() {
      setReady(false)
      viewer.current?.dispose()
      viewer.current = null
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        import("@/lib/terminal-viewer")
          .then(({ mountTerminal }) => {
            if (cancelled) return
            viewer.current = mountTerminal(host, fallback, (state) => {
              setPlayback(state)
              setReady(true)
            })
            viewer.current.setView(currentView.current)
          })
          .catch(() => {
            if (!cancelled) fallback()
          })
      },
      { rootMargin: "120px" },
    )
    observer.observe(host)
    return () => {
      cancelled = true
      observer.disconnect()
      viewer.current?.dispose()
      viewer.current = null
    }
  }, [])

  function reset() {
    viewer.current?.reset()
    setExploded(false)
  }

  return (
    <figure
      className="terminal-stage"
      data-view={view}
      data-ready={ready}
      data-playing={ready && playback.playing}
    >
      <div
        className="model-poster"
        role="img"
        aria-hidden={ready}
        aria-label={
          atDesk
            ? "A cream and vermilion terminal beside a flowering cherry tree"
            : "A timber studio with glowing shoji screens, a tiled roof and an indigo noren beside a cherry tree"
        }
      />
      <div
        className="terminal-surface"
        ref={surface}
        tabIndex={ready ? 0 : undefined}
        role={ready ? "group" : undefined}
        aria-label={
          ready
            ? `Interactive ${atDesk ? "sakura terminal" : "spring studio"}. Drag or use the arrow keys to rotate. Press Home to reset.`
            : undefined
        }
        onPointerDown={(e) => {
          if (!ready || !e.isPrimary || e.button !== 0) return
          drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY }
          e.currentTarget.setPointerCapture(e.pointerId)
        }}
        onPointerMove={(e) => {
          const last = drag.current
          if (!last) {
            if (e.pointerType === "mouse" && viewer.current) {
              const bounds = e.currentTarget.getBoundingClientRect()
              viewer.current.look(
                (2 * (e.clientX - bounds.left)) / bounds.width - 1,
                (2 * (e.clientY - bounds.top)) / bounds.height - 1,
              )
            }
            return
          }
          if (last.id !== e.pointerId) return
          viewer.current?.rotate(e.clientX - last.x, e.clientY - last.y)
          drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY }
        }}
        onPointerLeave={() => viewer.current?.look(0, 0)}
        onLostPointerCapture={() => {
          drag.current = null
        }}
        onPointerUp={() => {
          drag.current = null
        }}
        onPointerCancel={() => {
          drag.current = null
        }}
        onKeyDown={(e) => {
          const turns: Record<string, [number, number]> = {
            ArrowLeft: [-22, 0],
            ArrowRight: [22, 0],
            ArrowUp: [0, 16],
            ArrowDown: [0, -16],
          }
          if (turns[e.key]) {
            e.preventDefault()
            viewer.current?.rotate(...turns[e.key])
          }
          if (e.key === "Home") {
            e.preventDefault()
            reset()
          }
        }}
      />
      <figcaption className="stage-tools">
        <button
          type="button"
          className="view-door"
          onClick={() => {
            const next = atDesk ? "garden" : "desk"
            currentView.current = next
            setView(next)
            setExploded(false)
            viewer.current?.setView(next)
          }}
        >
          {atDesk ? <Trees size={17} /> : <DoorOpen size={17} />}
          {atDesk ? "Back to garden" : "Enter studio"}
        </button>
        {ready && (
          <div className="model-actions" role="group" aria-label="Scene controls">
            <button
              type="button"
              aria-label={playback.playing ? "Pause animation" : "Play animation"}
              title={playback.playing ? "Pause animation" : "Play animation"}
              onClick={() => viewer.current?.togglePlayback()}
            >
              {playback.playing ? <Pause size={15} /> : <Play size={15} />}
            </button>
            {atDesk && (
              <>
                <button
                  type="button"
                  aria-label="Replay startup"
                  title="Replay startup"
                  onClick={() => {
                    setExploded(false)
                    viewer.current?.replay()
                  }}
                >
                  <RotateCcw size={15} />
                </button>
                <button
                  type="button"
                  aria-pressed={exploded}
                  onClick={() => {
                    viewer.current?.explode(!exploded)
                    setExploded(!exploded)
                  }}
                >
                  <Boxes size={15} />
                  {exploded ? "Assemble" : "Explode"}
                </button>
              </>
            )}
            <button type="button" onClick={reset} aria-label="Reset model view" title="Reset view">
              <Crosshair size={15} />
            </button>
          </div>
        )}
        {ready &&
          (atDesk ? (
            <span className="terminal-status">{playback.playing ? playback.phase : "Paused"}</span>
          ) : (
            <span className="drag-hint">
              <MousePointer2 size={12} />
              Drag to rotate
            </span>
          ))}
      </figcaption>
    </figure>
  )
}
