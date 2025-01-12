import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNotifications } from '@/lib/notifications';
import { updateProfile, type Profile } from '@/lib/profile';

interface ProfileFormProps {
  profile: Profile;
  onSave: (profile: Profile) => void;
}

export function ProfileForm({ profile, onSave }: ProfileFormProps) {
  const [name, setName] = useState(profile.name);
  const [saving, setSaving] = useState(false);
  const { addNotification } = useNotifications();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      const { data, error } = await updateProfile(profile.id, { name });
      
      if (error) throw error;
      if (data) {
        onSave(data);
        addNotification('success', 'Profile updated successfully');
      }
    } catch (error) {
      console.log(error)
      addNotification('error', 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          value={profile.email}
          disabled
          className="bg-muted"
        />
      </div>

      <Button type="submit" className="w-full" disabled={saving}>
        {saving ? 'Saving...' : 'Save Changes'}
      </Button>
    </form>
  );
}