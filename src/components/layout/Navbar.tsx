// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
import { AuthDialog } from '@/components/auth/AuthDialog';
import { Globe } from 'lucide-react';
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

export function Navbar() {
  // const [isOpen, setIsOpen] = useState(false);

  const NavContent = ({ className }: { className?: string }) => (
    <div className={cn('flex items-center gap-4', className)}>
      <div className="flex items-center gap-2">
        <Globe className="h-6 w-6 animate-pulse text-primary" />
        <span className="text-xl font-bold">Our Timing</span>
      </div>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 md:px-8">
        {/* Left: Logo and Branding */}
        <NavContent />

        {/* Right: Actions (Auth + Menu) */}
        <div className="flex items-center gap-4">
          <AuthDialog />

          {/* Mobile Menu */}
          {/* <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-4">
                <Link
                  to="/"
                  className="text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/profile"
                  className="text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
              </nav>
            </SheetContent>
          </Sheet> */}

        </div>
      </div>
    </header>
  );
}
