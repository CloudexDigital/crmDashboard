import React, { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [hasUnread, setHasUnread] = useState(false);

  const addNotification = (message) => {
    setNotifications(prev => [{ id: Date.now(), message }, ...prev]);
    setHasUnread(true);
  };

  const markAsRead = () => setHasUnread(false);
  const clearNotifications = () => {
    setNotifications([]); 
    setHasUnread(false);
};

  return (
    <NotificationContext.Provider
      value={{ notifications, hasUnread, addNotification, markAsRead, clearNotifications }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationContext };

