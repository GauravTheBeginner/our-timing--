import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera } from 'lucide-react';
import { uploadAvatar } from '@/lib/storage';
import { useNotifications } from '@/lib/notifications';

interface AvatarUploadProps {
  userId: string;
  currentUrl?: string;
  name: string;
  onUploadComplete: (url: string) => void;
}

export function AvatarUpload({ userId, currentUrl, name, onUploadComplete }: AvatarUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addNotification } = useNotifications();

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }

      setUploading(true);
      const file = event.target.files[0];
      const url = await uploadAvatar(userId, file);
      onUploadComplete(url);
      addNotification('success', 'Avatar updated successfully');
    } catch (error) {
      addNotification('error', 'Error uploading avatar');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="relative group">
      <Avatar className="h-24 w-24">
        <AvatarImage src={currentUrl} alt={name} />
        <AvatarFallback className="text-lg">
          {name.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      
      <Button
        variant="secondary"
        size="icon"
        className="absolute bottom-0 right-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
      >
        <Camera className="h-4 w-4" />
      </Button>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleUpload}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}