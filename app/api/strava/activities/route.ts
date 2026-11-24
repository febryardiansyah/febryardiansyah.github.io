import { NextResponse } from "next/server"
import axios from "axios"
import { getStravaTokens, saveStravaTokens, type StravaTokens } from "./firebase-service"

const apiUrl = process.env.STRAVA_API_URL || "https://www.strava.com/api/v3"
const tokenUrl = process.env.STRAVA_TOKEN_URL || "https://www.strava.com/oauth/token"

async function getAccessToken() {
  const stored = await getStravaTokens()
  if (stored?.access_token && stored.expires_at > Date.now() / 1000 + 30) {
    return stored.access_token
  }

  const clientId = process.env.STRAVA_CLIENT_ID
  const clientSecret = process.env.STRAVA_CLIENT_SECRET
  const refreshToken = stored?.refresh_token || process.env.STRAVA_REFRESH_TOKEN
  if (!clientId || !clientSecret || !refreshToken) throw new Error("Missing Strava credentials")

  const { data } = await axios.post<StravaTokens>(tokenUrl, new URLSearchParams({
    grant_type: "refresh_token",
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
  }))
  if (!data.access_token || !data.refresh_token || !Number.isFinite(data.expires_at)) {
    throw new Error("Invalid Strava token response")
  }
  await saveStravaTokens({
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: data.expires_at,
  })
  return data.access_token
}

let pendingToken: Promise<string> | undefined

export async function GET() {
  try {
    pendingToken ??= getAccessToken().finally(() => { pendingToken = undefined })
    const accessToken = await pendingToken
    const { data } = await axios.get(`${apiUrl}/athlete/activities?per_page=10`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    return NextResponse.json(data)
  } catch (error) {
    // Axios errors include credentials in their request configuration.
    console.error("Strava activities failed", axios.isAxiosError(error)
      ? error.response?.status ?? error.code
      : error instanceof Error ? error.name : "Unknown error")
    return NextResponse.json({ error: "Failed to fetch Strava activities" }, { status: 500 })
  }
}
