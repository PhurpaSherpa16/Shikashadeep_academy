import { Navigate } from "react-router-dom"

export const ProtectedRoute = ({ children, role }) => {
    const userString = localStorage.getItem("user")
    let user = null

    try {
        user = (userString && userString !== "undefined") ? JSON.parse(userString) : null
    } catch (e) {
        console.error("Failed to parse user from localStorage", e)
        user = null // Ensure user is null on failure
    }
    if (!user) {
        return <Navigate to="/" replace />
    }
    if (role && user.role?.toLowerCase() !== role.toLowerCase()) {
        return <Navigate to="/" replace />
    }
    return children
}