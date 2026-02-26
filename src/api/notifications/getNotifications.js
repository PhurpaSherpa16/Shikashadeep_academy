import API_URL from "../api";

export const getNotifications = async () => {
    try {
        const response = await fetch(`${API_URL}/notifications`);
        if (!response.ok) {
            throw new Error("Failed to fetch notifications");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching notifications:", error);
        throw error;
    }
};
