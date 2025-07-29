'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import StravaLogo from './strava-logo';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { X, RefreshCw, ExternalLink } from 'lucide-react';
import axios from 'axios';

interface StravaActivity {
  id: number;
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  type: string;
  sport_type: string;
  start_date: string;
  average_speed: number;
  max_speed: number;
  average_heartrate?: number;
  max_heartrate?: number;
}

const mockActivities: StravaActivity[] = [
  {
    id: 1,
    name: 'Morning Run',
    distance: 5280, // meters
    moving_time: 1800, // seconds
    elapsed_time: 1900,
    total_elevation_gain: 50,
    type: 'Run',
    sport_type: 'Run',
    start_date: new Date(Date.now() - 86400000).toISOString(), // yesterday
    average_speed: 2.93, // meters per second
    max_speed: 3.5,
    average_heartrate: 155,
    max_heartrate: 175
  },
  {
    id: 2,
    name: 'Evening Ride',
    distance: 15000, // meters
    moving_time: 3600, // seconds
    elapsed_time: 3800,
    total_elevation_gain: 120,
    type: 'Ride',
    sport_type: 'Ride',
    start_date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    average_speed: 4.17, // meters per second
    max_speed: 8.2,
    average_heartrate: 145,
    max_heartrate: 165
  },
  {
    id: 3,
    name: 'Trail Run',
    distance: 8000, // meters
    moving_time: 2700, // seconds
    elapsed_time: 3000,
    total_elevation_gain: 200,
    type: 'Run',
    sport_type: 'Trail Run',
    start_date: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    average_speed: 2.96, // meters per second
    max_speed: 3.8,
    average_heartrate: 160,
    max_heartrate: 180
  }
];

const StravaFAB: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activities, setActivities] = useState<StravaActivity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasDataBeenFetched, setHasDataBeenFetched] = useState(false);

  const fetchStravaActivities = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await axios.get('/api/strava/activities');
      
      setActivities(response.data);
      setHasDataBeenFetched(true);
    } catch (err) {
      console.error('Error fetching Strava activities:', err);
      setError('Failed to load activities. Please try again later.');
      // Fallback to mock data if API fails
      setActivities(mockActivities);
      setHasDataBeenFetched(true);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    // Fetch activities only when the card is opened for the first time
    if (isOpen && !hasDataBeenFetched) {
      fetchStravaActivities();
    }
  }, [isOpen, hasDataBeenFetched]);

  const formatDistance = (meters: number): string => {
    const kilometers = meters / 1000;
    return `${kilometers.toFixed(2)} km`;
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${remainingSeconds}s`;
    } else {
      return `${minutes}m ${remainingSeconds}s`;
    }
  };

  const formatPace = (metersPerSecond: number, activityType: string): string => {
    if (activityType.includes('Run')) {
      // For running, convert to min/km
      const secondsPerKm = 1000 / metersPerSecond;
      const minutes = Math.floor(secondsPerKm / 60);
      const seconds = Math.floor(secondsPerKm % 60);
      return `${minutes}:${seconds.toString().padStart(2, '0')} /km`;
    } else {
      // For cycling, convert to km/h
      const kmPerHour = metersPerSecond * 3.6;
      return `${kmPerHour.toFixed(1)} km/h`;
    }
  };

  const getActivityIcon = (type: string): string => {
    if (type.includes('Run')) return '🏃‍♂️';
    if (type.includes('Ride')) return '🚴‍♂️';
    if (type.includes('Swim')) return '🏊‍♂️';
    return '🏋️‍♂️';
  };

  return (
    <div className="fixed bottom-20 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <Card className="mb-4 w-80 max-h-[70vh] bg-zinc-900/90 backdrop-blur-md border-zinc-700/50 text-zinc-100">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <StravaLogo className="h-6 w-6 text-orange-500" />
                <CardTitle className="text-lg">Latest Activities</CardTitle>
              </div>
              <div className="flex gap-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-zinc-400 hover:text-zinc-100"
                  onClick={fetchStravaActivities}
                  disabled={isLoading}
                >
                  <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-zinc-400 hover:text-zinc-100"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardDescription className="text-zinc-400">
              My recent Strava activities
            </CardDescription>
            <div className="flex justify-start mt-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-zinc-800 text-zinc-100 border-zinc-700 hover:bg-zinc-700 text-xs px-2 py-1 h-auto"
                onClick={() => window.open('https://www.strava.com/athletes/164661299', '_blank')}
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Profile
              </Button>
            </div>
          </CardHeader>
          <Separator className="bg-zinc-700/50" />
          <ScrollArea className="h-[calc(70vh-8rem)]">
            <CardContent className="pt-4">
              {error && (
                <div className="p-4 text-center text-red-400 bg-red-950/20 rounded-md mb-4">
                  {error}
                </div>
              )}
              {isLoading && activities.length === 0 ? (
                <div className="flex justify-center items-center h-32">
                  <RefreshCw className="h-6 w-6 text-zinc-400 animate-spin" />
                </div>
              ) : (
                <div className="space-y-4">
                  {activities.length > 0 ? activities.map((activity) => (
                    <div key={activity.id} className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium flex items-center gap-2">
                            <span>{getActivityIcon(activity.type)}</span>
                            {activity.name}
                          </h3>
                          <p className="text-sm text-zinc-400">
                            {formatDistanceToNow(new Date(activity.start_date), { addSuffix: true })}
                          </p>
                        </div>
                        <Badge variant="outline" className="bg-zinc-800 text-zinc-300 border-zinc-700">
                          {activity.sport_type}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-zinc-400">Distance</p>
                          <p className="font-medium">{formatDistance(activity.distance)}</p>
                        </div>
                        <div>
                          <p className="text-zinc-400">Time</p>
                          <p className="font-medium">{formatTime(activity.moving_time)}</p>
                        </div>
                        <div>
                          <p className="text-zinc-400">Pace</p>
                          <p className="font-medium">{formatPace(activity.average_speed, activity.type)}</p>
                        </div>
                        <div>
                          <p className="text-zinc-400">Elevation</p>
                          <p className="font-medium">{activity.total_elevation_gain}m</p>
                        </div>
                        {activity.average_heartrate && (
                          <div>
                            <p className="text-zinc-400">Avg HR</p>
                            <p className="font-medium">{Math.round(activity.average_heartrate)} bpm</p>
                          </div>
                        )}
                      </div>
                      <Separator className="bg-zinc-800/50" />
                    </div>
                  )) : (
                    <div className="text-center py-8 text-zinc-400">
                      <p>No activities found.</p>
                      <p className="text-sm mt-2">Connect your Strava account to see your activities here.</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </ScrollArea>
        </Card>
      )}
      
      <Button 
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className="h-14 w-14 rounded-full shadow-lg bg-orange-500 hover:bg-orange-600 text-white"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <StravaLogo className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
};

export default StravaFAB;