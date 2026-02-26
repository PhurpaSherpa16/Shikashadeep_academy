import { useState, useEffect, useCallback } from "react";
import { getNotifications } from "../../api/notifications/getNotifications";

export const useNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchNotifications = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getNotifications();
            // Expecting data to be an array or have an array property
            const notificationList = Array.isArray(data) ? data : (data?.data ?? []);
            setNotifications(notificationList);
        } catch (err) {
            setError(err?.message || "Failed to load notifications");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchNotifications();
        
        // Polling every 1 minute for new notifications
        const interval = setInterval(fetchNotifications, 60000);
        return () => clearInterval(interval);
    }, [fetchNotifications]);

    const unreadCount = notifications.filter(n => !n.is_read).length;

    return { 
        notifications, 
        loading, 
        error, 
        unreadCount, 
        refetch: fetchNotifications 
    };
};
