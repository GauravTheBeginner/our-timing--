import { useNotifications } from '@/lib/notifications';
import { X } from 'lucide-react';

export function Notifications() {
  const { notifications, removeNotification } = useNotifications();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`flex items-center justify-between rounded-lg p-4 text-white ${
            notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'
          }`}
        >
          <span>{notification.message}</span>
          <button
            onClick={() => removeNotification(notification.id)}
            className="ml-4 rounded-full p-1 hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  )}