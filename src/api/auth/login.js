import API_URL from "../api.js";

export const login = async (email, password) => {
    const url = `${API_URL}/auth/signin`
    
    try {
        const controller = new AbortController()
        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password }),
            signal: controller.signal
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message || 'Login failed. Please check your credentials.');
        }

        return responseData;
    } catch (error) {
        console.error("Login API failed:", error);
        throw error;
    }
};
