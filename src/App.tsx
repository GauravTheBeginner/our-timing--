import TimeDisplay from '@/components/TimeDisplay';
import { ThemeProvider } from '@/components/theme-provider';
import { Globe } from 'lucide-react';
import { timeZones } from '@/lib/time-zones';
import { AuthDialog } from '@/components/auth/AuthDialog';
import { Notifications } from '@/components/Notifications';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary w-screen">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-8">
            {/* Globe Icon and Title */}
            <div className="flex items-center space-x-2">
              <Globe className="h-6 w-6 animate-pulse text-primary" />
              <h1 className="text-xl font-bold sm:text-3xl">Our Timing</h1>
            </div>

            {/* Auth Dialog - Sign In or Sign Out */}
            <AuthDialog />
          </div>
          
          <p className="text-center mb-8 text-muted-foreground">
            Love Knows no time zone, we're always together ❤️
          </p>

          {/* Time Displays Grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            {timeZones.map((zone) => (
              <TimeDisplay key={zone.country} {...zone} />
            ))}
          </div>

          {/* Footer */}
          <footer className="mt-12 text-center text-sm text-muted-foreground">
            <p>Real-time updates, you’ll have no excuse not to call me now 😏📲</p>
          </footer>
        </div>
      </div>
      <Notifications />
    </ThemeProvider>
  );
}
export default App