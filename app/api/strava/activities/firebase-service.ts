import { initializeApp, getApps, cert } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
// Only the activity request needs credentials. Route discovery also imports this module.
function activityDatabase() {
  const app = getApps().find((entry) => entry.name === "[DEFAULT]")
  if (app) return getFirestore(app)

  const { FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL } = process.env
  if (!FIREBASE_PROJECT_ID || !FIREBASE_PRIVATE_KEY || !FIREBASE_CLIENT_EMAIL) {
    throw new Error("Strava activity storage is not configured")
  }

  return getFirestore(
    initializeApp({
      credential: cert({
        projectId: FIREBASE_PROJECT_ID,
        privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        clientEmail: FIREBASE_CLIENT_EMAIL,
      }),
    }),
  )
}

export interface StravaTokenData {
  access_token: string
  refresh_token: string
  expires_at: number
  expires_in: number
  token_type?: string
  scope?: string
  updated_at: Date
}

export async function saveStravaTokens(tokenData: StravaTokenData) {
  try {
    const docRef = activityDatabase().collection("strava_tokens").doc("current")
    await docRef.set({
      ...tokenData,
      updated_at: new Date(),
    })
    console.log("Strava tokens saved to Firestore successfully")
    return true
  } catch (error) {
    console.error("Error saving Strava tokens to Firestore:", error)
    throw error
  }
}

export async function getStravaTokens(): Promise<StravaTokenData | null> {
  try {
    const docRef = activityDatabase().collection("strava_tokens").doc("current")
    const doc = await docRef.get()

    if (doc.exists) {
      return doc.data() as StravaTokenData
    } else {
      console.log("No Strava tokens found in Firestore")
      return null
    }
  } catch (error) {
    console.error("Error getting Strava tokens from Firestore:", error)
    throw error
  }
}
