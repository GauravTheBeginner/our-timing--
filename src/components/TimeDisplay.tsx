import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Clock, MapPin } from 'lucide-react';

interface TimeZoneProps {
  country: string;
  timezone: string;
  flag: string;
  location?: string;
}

const TimeDisplay = ({ country, timezone, flag, location }: TimeZoneProps) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(time);

  const [dateStr, timeStr] = formattedTime.split('at');

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <CardHeader className="relative space-y-0 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{flag}</span>
            <h2 className="text-xl font-bold">{country}</h2>
          </div>
          <MapPin className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>

      <CardContent className="relative space-y-4">
        <div className="rounded-lg bg-secondary/50 p-4 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5 text-primary animate-pulse" />
            <span className="text-3xl font-bold tracking-tight">{timeStr}</span>
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{dateStr}</p>
          {location && (
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>{location}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeDisplay;