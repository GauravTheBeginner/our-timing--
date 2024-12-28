import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNotifications } from '@/lib/notifications';
import { getProfile, updateProfile, type Profile } from '@/lib/profile';
import { AvatarUpload } from './AvatarUpload';
import { ProfileForm } from './ProfileForm';
import { ProfileInfo } from './ProfileInfo';

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

  async function handleAvatarUpdate(url: string) {
    if (!profile) return;
    
    const { data, error } = await updateProfile(profile.id, { avatar_url: url });
    if (error) {
      addNotification('error', 'Failed to update profile');
    } else if (data) {
      setProfile(data);
    }
  }

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
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="info">Info</TabsTrigger>
              <TabsTrigger value="edit">Edit</TabsTrigger>
            </TabsList>
            
            <div className="mt-6 flex justify-center">
              <AvatarUpload
                userId={profile.id}
                currentUrl={profile.avatar_url}
                name={profile.name}
                onUploadComplete={handleAvatarUpdate}
              />
            </div>

            <TabsContent value="info" className="mt-4">
              <ProfileInfo profile={profile} />
            </TabsContent>

            <TabsContent value="edit" className="mt-4">
              <ProfileForm 
                profile={profile}
                onSave={setProfile}
              />
            </TabsContent>
          </Tabs>
        ) : (
          <div className="text-center text-muted-foreground">
            Profile not found
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}