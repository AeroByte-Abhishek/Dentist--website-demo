import { Bell } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import { useNotifications } from '../context/NotificationContext';

const NotificationsPage = () => {
  const { notifications, toggleRead, requestPermission, permission } = useNotifications();

  return (
    <section className="section-wrapper">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-heading text-4xl">Notifications</h1>
        <button onClick={requestPermission} className="rounded-xl border border-gold/30 px-4 py-2 text-sm text-gold">
          Allow Push ({permission})
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((notification) => (
          <GlassCard key={notification.id} className="flex items-start justify-between gap-4">
            <div className="flex gap-3">
              <Bell className="mt-1 size-4 text-gold" />
              <div>
                <p className="font-medium">{notification.title}</p>
                <p className="text-sm text-zinc-400">{notification.description}</p>
              </div>
            </div>
            <button onClick={() => toggleRead(notification.id)} className="text-xs text-zinc-300">
              Mark as {notification.read ? 'Unread' : 'Read'}
            </button>
          </GlassCard>
        ))}
      </div>
    </section>
  );
};

export default NotificationsPage;
