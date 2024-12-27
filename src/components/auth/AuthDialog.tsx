import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';
import { useAuth } from '@/lib/auth-context';
import { signOut } from '@/lib/auth';
import { useNotifications } from '@/lib/notifications';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function AuthDialog() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { addNotification } = useNotifications();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      addNotification('error', 'Failed to sign out. Please try again.');
    } else {
      addNotification('success', 'Signed out successfully');
    }
  };
  console.log(user)

  return (
    <>
      {user ? (
        <div className="flex items-center">
          <Avatar className="mr-2 w-10 h-10 bg-gray-500 rounded-full">
                <AvatarImage src={''} alt={`${user?.email}'s avatar`} />
                <AvatarFallback>
                  {user?.email?.charAt(0)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
          <Button variant="outline" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" >Sign In</Button>
          </DialogTrigger>
          <DialogContent >
            <DialogHeader>
              <DialogTitle>{isSignUp ? 'Create Account' : 'Sign In'}</DialogTitle>
              <DialogDescription className="text-gray-400">
                {isSignUp
                  ? 'Create an account to start sharing notes'
                  : 'Sign in to your account to continue'}
              </DialogDescription>
            </DialogHeader>
            {isSignUp ? (
              <SignUpForm
                onSuccess={() => setOpen(false)}
                onToggleMode={() => setIsSignUp(false)}
              />
            ) : (
              <SignInForm
                onSuccess={() => setOpen(false)}
                onToggleMode={() => setIsSignUp(true)}
              />
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}