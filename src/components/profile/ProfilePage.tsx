import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth-context';
import { getProfile, type Profile } from '@/lib/profile';
import { useNotifications } from '@/lib/notifications';
import { AvatarUpload } from './AvatarUpload';
import { ProfileForm } from './ProfileForm';
import { ProfileStats } from './ProfileStats';
import { ProfileSkeleton } from './ProfileSkeleton';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProfile() {
      if (!user) {
        navigate('/');
        return;
      }
      
      setLoading(true);
      const { data, error, notesCount } = await getProfile(user.id);
      if (error) {
        addNotification('error', 'Failed to load profile');
      } else if (data) {
        setProfile({ ...data, notesCount });
      }
      
      setLoading(false);
    }

    loadProfile();
  }, [user, navigate, addNotification]);

  if (!user) {
    navigate('/');
    return null;
  }

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate('/')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <AvatarUpload
            userId={profile.id}
            currentUrl={profile.avatar_url}
            name={profile.name}
            onUploadComplete={(url) => setProfile({ ...profile, avatar_url: url })}
          />
          <h1 className="text-3xl font-bold">{profile.name}</h1>
          <p className="text-muted-foreground">{profile.email}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Profile Information</h2>
            <ProfileForm profile={profile} onSave={setProfile} />
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Activity</h2>
            <ProfileStats profile={profile} />
          </div>
        </div>
      </div>
    </div>
  );
}