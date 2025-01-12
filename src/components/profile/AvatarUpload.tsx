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
  const [imageUrl, setImageUrl] = useState(currentUrl);
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
      
      // Update local state and notify parent
      setImageUrl(url);
      onUploadComplete(url);
      addNotification('success', 'Avatar updated successfully');
    } catch (error) {
      console.error('Upload error:', error);
      const message = error instanceof Error 
        ? error.message 
        : 'Error uploading avatar. Please try again.';
      addNotification('error', message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }

  return (
    <div className="relative group">
      <Avatar className="h-24 w-24 border-2 border-primary/10">
        <AvatarImage 
          src={imageUrl} 
          alt={name} 
          className="object-cover"
        />
        <AvatarFallback className="text-lg bg-primary/5">
          {name[0]?.toUpperCase()}
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

      {uploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 rounded-full">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" />
        </div>
      )}
    </div>
  );
}