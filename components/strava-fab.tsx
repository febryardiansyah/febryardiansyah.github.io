"use client"

import { useState } from "react"
import { Activity, RefreshCw } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface StravaActivity {
  id: number
  name: string
  distance: number
  moving_time: number
  total_elevation_gain: number
  sport_type: string
  type: string
  start_date: string
  average_speed: number
  average_heartrate?: number
}

export default function StravaFAB() {
  const [activities, setActivities] = useState<StravaActivity[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  async function fetchActivities() {
    setError(false)
    setLoading(true)
    try {
      const res = await fetch("/api/strava/activities")
      if (!res.ok) throw new Error("Activity feed unavailable")
      const feed = await res.json()
      if (!Array.isArray(feed)) throw new Error("Invalid activity feed")
      setActivities(feed)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Dialog
      onOpenChange={(open) => {
        if (open && !loading && !activities) void fetchActivities()
      }}
    >
      <DialogTrigger asChild>
        <button className="activity-button">
          <Activity size={16} />
          Latest Strava activities
        </button>
      </DialogTrigger>
      <DialogContent className="activity-dialog">
        <DialogTitle>Latest activities</DialogTitle>
        <DialogDescription>Recent workouts from my Strava feed.</DialogDescription>
        <div aria-live="polite" aria-busy={loading}>
          {loading && <p>Loading activities…</p>}
          {error && <p>The activity feed is currently unavailable.</p>}
          {activities?.length === 0 && <p>No recent activities.</p>}
          <ul>
            {activities?.map((a) => {
              const minutes = Math.floor(a.moving_time / 60),
                seconds = a.moving_time % 60
              const pace = a.average_speed > 0 ? Math.round(1000 / a.average_speed) : 0
              return (
                <li key={a.id}>
                  <h3>{a.name}</h3>
                  <small>
                    {a.sport_type} · {new Date(a.start_date).toLocaleDateString()}
                  </small>
                  <p>
                    {(a.distance / 1000).toFixed(2)} km · {minutes}m {seconds}s · {a.total_elevation_gain} m
                    elevation
                  </p>
                  {a.average_speed > 0 && (
                    <small>
                      {a.type.includes("Run")
                        ? `${Math.floor(pace / 60)}:${String(pace % 60).padStart(2, "0")} /km`
                        : `${(a.average_speed * 3.6).toFixed(1)} km/h`}
                      {a.average_heartrate ? ` · ${Math.round(a.average_heartrate)} bpm` : ""}
                    </small>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
        <button type="button" className="activity-button" disabled={loading} onClick={fetchActivities}>
          <RefreshCw size={15} />
          Refresh activities
        </button>
      </DialogContent>
    </Dialog>
  )
}
