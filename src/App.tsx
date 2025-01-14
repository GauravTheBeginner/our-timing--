import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { Notifications } from '@/components/Notifications';
import { timeZones } from '@/lib/time-zones';
import { ProfilePage } from '@/components/profile/ProfilePage';
import TimeDisplay from '@/components/TimeDisplay';
import { Navbar } from '@/components/layout/Navbar';

function App() {
  return (
    <Router>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary w-screen">
          <Navbar />
          <Routes>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/" element={
              <main className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                  <p className="text-center mb-8 text-muted-foreground">
                  TIME ZONES? DON’T CAP – GET IN THE GAME AND DROP A NOTE NOW 💥
                  </p>

                  <div className="grid gap-6 sm:grid-cols-2">
                    {timeZones.map((zone) => (
                      <TimeDisplay key={zone.country} {...zone} />
                    ))}
                  </div>

                  <footer className="mt-12 text-center text-sm text-muted-foreground">
                    <p>Quit frontin’ – you’ve got the time, now drop that note 🕒🔥</p>
                  </footer>
                </div>
              </main>
            } />
          </Routes>
          <Notifications />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;