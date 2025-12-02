import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth.service';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const userData = await authService.getCurrentUser();
                    setUser(userData);
                }
            } catch (error) {
                console.error('Auth initialization failed', error);
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    const login = async (credentials) => {
        const data = await authService.login(credentials);
        localStorage.setItem('token', data.token);
        setUser(data.user);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
