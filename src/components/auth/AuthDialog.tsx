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
import { useNavigate } from 'react-router-dom';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';
import { useAuth } from '@/lib/auth-context';
import { signOut } from '@/lib/auth';
import { useNotifications } from '@/lib/notifications';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function AuthDialog() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      addNotification('error', 'Failed to sign out. Please try again.');
    } else {
      addNotification('success', 'Signed out successfully');
    }
  };

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          className="rounded-full p-0 w-10 h-10"
          onClick={() => navigate('/profile')}
        >
          <Avatar className="h-10 w-10">
            <AvatarFallback>
              {user.user_metadata?.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
        <Button variant="outline" onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Sign In</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isSignUp ? 'Create Account' : 'Sign In'}</DialogTitle>
          <DialogDescription>
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
  );
}