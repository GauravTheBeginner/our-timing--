import TimeDisplay from '@/components/TimeDisplay';
import { ThemeProvider } from '@/components/theme-provider';
import { Clock, Globe } from 'lucide-react';
import { timeZones } from '@/lib/time-zones';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary  w-screen">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          {/* Header Section */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center space-x-3 rounded-full bg-primary/10 px-6 py-2 backdrop-blur-sm">
              <Globe className="h-6 w-6 animate-pulse text-primary" />
              <h1 className="text-2xl font-bold sm:text-3xl">Our Timing</h1>
            </div>
            <p className="mt-4 text-muted-foreground">
              Love knows no time zone, we’re always together ❤️
            </p>
          </div>

          {/* Time Displays Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {timeZones.map((zone) => (
              <TimeDisplay key={zone.country} {...zone} />
            ))}
          </div>

          {/* Footer */}
          <footer className="mt-12 text-center text-sm text-muted-foreground">
            <div className="flex items-center justify-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Real-time updates every second</span>
            </div>
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;