import { CalendarDays, MessageSquare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { Profile } from '@/lib/profile';

interface ProfileStatsProps {
  profile: Profile;
}

export function ProfileStats({ profile}: ProfileStatsProps) {
  return (
    <div className="grid gap-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Member since</span>
          </div>
          <p className="mt-2 text-2xl font-semibold">
            {new Date(profile.created_at).toLocaleDateString()}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Notes shared</span>
          </div>
          <p className="mt-2 text-2xl font-semibold">{profile?.notesCount}</p>
        </CardContent>
      </Card>
    </div>
  );
}