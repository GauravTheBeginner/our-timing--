import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNotifications } from '@/lib/notifications';
import { getProfile } from '@/lib/auth';

interface Profile {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

interface ProfileDialogProps {
  userId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfileDialog({ userId, open, onOpenChange }: ProfileDialogProps) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotifications();

  useEffect(() => {
    async function loadProfile() {
      if (!open) return;
      
      setLoading(true);
      const { data, error } = await getProfile(userId);
      
      if (error) {
        addNotification('error', 'Failed to load profile');
      } else if (data) {
        setProfile(data);
      }
      
      setLoading(false);
    }

    loadProfile();
  }, [userId, open, addNotification]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Profile</DialogTitle>
        </DialogHeader>
        
        {loading ? (
          <div className="flex justify-center p-4">
            <div className="animate-pulse">Loading...</div>
          </div>
        ) : profile ? (
          <div className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src="" alt={profile.name} />
                <AvatarFallback className="text-lg">
                  {profile.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-2xl font-bold">{profile.name}</h2>
                <p className="text-sm text-muted-foreground">{profile.email}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Member since</span>
                <span>{new Date(profile.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            Profile not found
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}