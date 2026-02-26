import API_URL from "../api";

export const updateProfile = async (id, formData) => {
    const url = `${API_URL}/user/update/${id}`;
    try {
        const profileData = new FormData();
        profileData.append("first_name", formData.first_name);
        profileData.append("last_name", formData.last_name);
        profileData.append("phone", formData.phone ?? "");

        if (formData.image && typeof formData.image !== "string") {
            profileData.append("image_url", formData.image);
        }

        const response = await fetch(url, {
            method: "PUT",
            body: profileData,
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Failed to update profile");
        }
        return data;
    } catch (error) {
        console.log("Error in updateProfile", error);
        throw error;
    }
};
