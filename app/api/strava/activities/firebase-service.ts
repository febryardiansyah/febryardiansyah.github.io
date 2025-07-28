import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as path from 'path';

// Initialize Firebase Admin SDK
if (!getApps().length) {
  // Try to use environment variables first (for production/GitHub)
  if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      }),
    });
  } 
  // else {
  //   // Fallback to JSON file for local development
  //   const serviceAccountPath = path.join(process.cwd(), 'app/api/strava/activities/firebase-service.json');
    
  //   initializeApp({
  //     credential: cert(serviceAccountPath),
  //   });
  // }
}

const db = getFirestore();

export interface StravaTokenData {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  expires_in: number;
  token_type?: string;
  scope?: string;
  updated_at: Date;
}

export async function saveStravaTokens(tokenData: StravaTokenData) {
  try {
    const docRef = db.collection('strava_tokens').doc('current');
    await docRef.set({
      ...tokenData,
      updated_at: new Date(),
    });
    console.log('Strava tokens saved to Firestore successfully');
    return true;
  } catch (error) {
    console.error('Error saving Strava tokens to Firestore:', error);
    throw error;
  }
}

export async function getStravaTokens(): Promise<StravaTokenData | null> {
  try {
    const docRef = db.collection('strava_tokens').doc('current');
    const doc = await docRef.get();
    
    if (doc.exists) {
      return doc.data() as StravaTokenData;
    } else {
      console.log('No Strava tokens found in Firestore');
      return null;
    }
  } catch (error) {
    console.error('Error getting Strava tokens from Firestore:', error);
    throw error;
  }
}

export { db };