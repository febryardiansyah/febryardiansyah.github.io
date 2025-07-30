import { NextResponse } from "next/server";
import axios from "axios";
import { saveStravaTokens, getStravaTokens, StravaTokenData } from "./firebase-service";

// Strava API endpoints from environment variables
const STRAVA_API_URL = process.env.STRAVA_API_URL;
const TOKEN_URL = process.env.STRAVA_TOKEN_URL;

// Authentication credentials from environment variables
const CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.STRAVA_REFRESH_TOKEN;
const CODE = process.env.STRAVA_CODE;

// Function to check if token is expired
function isTokenExpired(expiresAt: number): boolean {
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  return currentTime >= expiresAt;
}

// Function to get valid access token (refresh if needed)
async function getValidAccessToken(): Promise<string> {
  try {
    // Get stored tokens from Firestore
    const storedTokens = await getStravaTokens();
    
    // If we have stored tokens and they're not expired, use them
    if (storedTokens && !isTokenExpired(storedTokens.expires_at)) {
      console.log("Using existing valid access token from Firestore");
      return storedTokens.access_token;
    }
    
    // Token is expired or doesn't exist, refresh it
    console.log("Token expired or not found, refreshing...");
    return await refreshAccessToken(storedTokens?.refresh_token);
  } catch (error) {
    console.error("Error getting valid access token:", error);
    throw error;
  }
}

// Function to refresh the access token
async function refreshAccessToken(refreshToken?: string) {
  try {
    if (!CLIENT_ID || !CLIENT_SECRET) {
      throw new Error(
        "Missing Strava API credentials in environment variables"
      );
    }

    // Use refresh token from Firestore if available, otherwise fallback to env variable
    const tokenToUse = refreshToken || REFRESH_TOKEN;
    
    if (!tokenToUse) {
      throw new Error("No refresh token available");
    }

    const response = await axios.post(
      "https://www.strava.com/oauth/token",
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: tokenToUse,
      }
    );

    const data = response.data;

    console.log("Refreshed access token:", data);

    // Save token data to Firestore
    const tokenData: StravaTokenData = {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_at: data.expires_at,
      expires_in: data.expires_in,
      token_type: data.token_type,
      // scope: data.scope,
      updated_at: new Date(),
    };
    
    await saveStravaTokens(tokenData);

    return data.access_token;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw error;
  }
}

// Function to fetch activities from Strava API
async function fetchActivities(accessToken: string) {
  try {
    if (!STRAVA_API_URL) {
      throw new Error("Missing Strava API URL in environment variables");
    }

    const response = await axios.get(
      `${STRAVA_API_URL}/athlete/activities?per_page=10`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching activities:", error);
    throw error;
  }
}

export async function GET() {
  try {
    // Get a valid access token (will refresh if needed)
    const accessToken = await getValidAccessToken();

    // Then fetch activities with the token
    const activities = await fetchActivities(accessToken);

    return NextResponse.json(activities);
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Failed to fetch Strava activities" },
      { status: 500 }
    );
  }
}