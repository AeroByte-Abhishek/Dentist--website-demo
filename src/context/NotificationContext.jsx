import { createContext, useContext, useMemo, useState } from 'react';
import { STATIC_NOTIFICATIONS } from '../utils/constants';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(STATIC_NOTIFICATIONS);
  const [permission, setPermission] = useState(Notification.permission);

  const toggleRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n)),
    );
  };

  const requestPermission = async () => {
    const result = await Notification.requestPermission();
    setPermission(result);

    // REMOVE AFTER BACKEND INTEGRATION: wire this result to server subscription endpoint.
    // POST /api/notifications/subscribe
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const value = useMemo(
    () => ({ notifications, toggleRead, requestPermission, permission, unreadCount }),
    [notifications, permission, unreadCount],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotifications must be used inside NotificationProvider');
  return context;
};
