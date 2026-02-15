import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout as logoutApi } from '../../api/auth/logout';

export const useLogout = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const logout = async () => {
        setIsLoading(true);
        setError(null);
        try {
            await logoutApi();
        } catch (err) {
            console.error("Logout error:", err);
            setError(err.message);
        } finally {
            // local storage and redirect regardless of API success
            localStorage.removeItem('user');
            localStorage.removeItem('session');
            setIsLoading(false);
            navigate('/');
        }
    };

    return { logout, isLoading, error };
};
