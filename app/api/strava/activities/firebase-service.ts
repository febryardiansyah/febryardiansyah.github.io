import { randomUUID } from "node:crypto"
import { mkdir, readFile, rename, unlink, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { cert, getApps, initializeApp } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"

export interface StravaTokens {
  access_token: string
  refresh_token: string
  expires_at: number
}

function tokenDocument() {
  const { FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL } = process.env
  const app = getApps().find((entry) => entry.name === "[DEFAULT]")
  if (app) return getFirestore(app).collection("strava_tokens").doc("current")
  if (!FIREBASE_PROJECT_ID && !FIREBASE_PRIVATE_KEY && !FIREBASE_CLIENT_EMAIL) return null
  if (!FIREBASE_PROJECT_ID || !FIREBASE_PRIVATE_KEY || !FIREBASE_CLIENT_EMAIL) {
    throw new Error("Incomplete Strava Firestore configuration")
  }
  const database = getFirestore(initializeApp({
    credential: cert({
      projectId: FIREBASE_PROJECT_ID,
      privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      clientEmail: FIREBASE_CLIENT_EMAIL,
    }),
  }))
  return database.collection("strava_tokens").doc("current")
}

export async function getStravaTokens(): Promise<StravaTokens | undefined> {
  const doc = tokenDocument()
  if (doc) return (await doc.get()).data() as StravaTokens | undefined

  await mkdir(".strava", { recursive: true, mode: 0o700 })
  try {
    return JSON.parse(await readFile(join(".strava", "tokens.json"), "utf8"))
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return undefined
    throw error
  }
}

export async function saveStravaTokens(tokens: StravaTokens) {
  const doc = tokenDocument()
  if (doc) {
    await doc.set({ ...tokens, updated_at: new Date() }, { merge: true })
    return
  }
  const temp = join(".strava", randomUUID())
  try {
    await writeFile(temp, JSON.stringify(tokens), { mode: 0o600, flag: "wx" })
    await rename(temp, join(".strava", "tokens.json"))
  } finally {
    await unlink(temp).catch((error) => {
      if (error.code !== "ENOENT") throw error
    })
  }
}
