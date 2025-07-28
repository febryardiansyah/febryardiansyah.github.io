import { NextResponse } from 'next/server';
import axios from 'axios';

// Strava API endpoints from environment variables
const STRAVA_API_URL = process.env.STRAVA_API_URL;
const TOKEN_URL = process.env.STRAVA_TOKEN_URL;

// Authentication credentials from environment variables
const CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.STRAVA_REFRESH_TOKEN;

// Function to refresh the access token
async function refreshAccessToken() {
  try {
    if (!TOKEN_URL || !CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
      throw new Error('Missing Strava API credentials in environment variables');
    }

    const response = await axios.post(TOKEN_URL, {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN,
    });

    console.log('Refreshed access token:', response.data);

    return response.data.access_token;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
}

// Function to fetch activities from Strava API
async function fetchActivities(accessToken: string) {
  try {
    if (!STRAVA_API_URL) {
      throw new Error('Missing Strava API URL in environment variables');
    }

    const response = await axios.get(`${STRAVA_API_URL}/athlete/activities?per_page=10`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching activities:', error);
    throw error;
  }
}

export async function GET() {
  try {
    // First refresh the access token
    const accessToken = await refreshAccessToken();
    
    // Then fetch activities with the new token
    const activities = await fetchActivities(accessToken);
    
    return NextResponse.json(activities);
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Strava activities' },
      { status: 500 }
    );
  }
}