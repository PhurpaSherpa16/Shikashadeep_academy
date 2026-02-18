import API_URL from "../api";

export const logout = async () => {
    try {
        const response = await fetch(`${API_URL}/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Logout failed with status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Logout API failed:", error);
        throw new Error("Unable to complete logout on the server. Continuing with local logout.");
    }
}
