import { CalendarDays, Mail, User } from 'lucide-react';
import type { Profile } from '@/lib/profile';

interface ProfileInfoProps {
  profile: Profile;
}

export function ProfileInfo({ profile }: ProfileInfoProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <User className="h-4 w-4 text-muted-foreground" />
          <span>{profile.name}</span>
        </div>
        
        <div className="flex items-center space-x-3">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <span>{profile.email}</span>
        </div>

        <div className="flex items-center space-x-3">
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
          <span>Joined {new Date(profile.created_at).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}