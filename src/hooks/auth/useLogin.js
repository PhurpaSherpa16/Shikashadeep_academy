import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../../api/auth/login';

export const useLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        if (e) e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const responseData = await loginApi(email, password);

            // Success: Save user info and session
            if (responseData.data && responseData.data.user) {
                localStorage.setItem('user', JSON.stringify(responseData.data.user));
                if (responseData.data.session) {
                    localStorage.setItem('session', JSON.stringify(responseData.data.session));
                }
                navigate('/admin');
            } else {
                throw new Error('User data is missing from the server response.');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        error,
        isLoading,
        handleLogin
    };
};
