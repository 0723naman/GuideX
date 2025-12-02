import { useEffect } from 'react';
import { socketService } from '../services/socket.service';
import { useAuth } from './useAuth';

export const useSocket = () => {
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            const token = localStorage.getItem('token');
            socketService.connect(token);
        }

        return () => {
            socketService.disconnect();
        };
    }, [user]);

    return socketService;
};
